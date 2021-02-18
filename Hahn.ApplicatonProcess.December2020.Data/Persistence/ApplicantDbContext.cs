using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.December2020.Data.Persistence
{
    public class ApplicantDbContext : DbContext
    {
        public string connectionString_ { get; set; }
        public ApplicantDbContext(DbContextOptions<ApplicantDbContext> options)
            : base(options)
        {
        }
        
        //public ApplicantDbContext()
        //{
        //    connectionString_ = ConfigurationManager.AppSettings["connectionstring"];
        //}

        public DbSet<Applicant> Applicants { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            //optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=ApplicantDB;MultipleActiveResultSets=True;Integrated Security=SSPI;");

        }
    }
}
