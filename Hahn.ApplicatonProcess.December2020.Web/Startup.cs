using FluentValidation;
using FluentValidation.AspNetCore;
using Hahn.ApplicatonProcess.December2020.Data.Abstract;
using Hahn.ApplicatonProcess.December2020.Data.Concrete;
using Hahn.ApplicatonProcess.December2020.Data.Persistence;
using Hahn.ApplicatonProcess.December2020.Domain.Dto;
using Hahn.ApplicatonProcess.December2020.Domain.Services.Abstract;
using Hahn.ApplicatonProcess.December2020.Domain.Services.Concrete;
using Hahn.ApplicatonProcess.December2020.Domain.Validators;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.Examples;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.December2020.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        
        //public void ConfigureServices<TEntity>(IServiceCollection services) where TEntity : class
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Startup));
            services.AddDbContext<ApplicantDbContext>(opt => opt.UseInMemoryDatabase("ApplicantMemory"));
            //services.AddDbContext<ApplicantDbContext>();
            services.AddMvc(options => { 
                options.EnableEndpointRouting = false;
                options.Filters.Add(typeof(ValidateModelStateAttribute));
               
            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_1).AddFluentValidation(opt =>
            {
                opt.RegisterValidatorsFromAssemblyContaining(typeof(ApplicantValidator));
            });
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });
            services.AddScoped<IApplicantService, ApplicantService>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddCors();
            services.AddTransient<IValidator<ApplicantDto>, ApplicantValidator>();
            services.AddSwaggerGen(c =>
            {
                //c.SchemaFilter<SchemaFilter>();
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Hahn Application",
                    Description = "Development"
                });
                //c.OperationFilter<IOperationFilter>();

            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors(builder => 
            builder
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();
            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("v1/swagger.json", "HahnApplication");
            });

            //app.usemapper()
        }
    }
}
