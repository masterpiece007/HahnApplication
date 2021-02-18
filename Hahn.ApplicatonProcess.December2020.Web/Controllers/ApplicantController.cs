using AutoMapper;
using Hahn.ApplicatonProcess.December2020.Data.Persistence;
using Hahn.ApplicatonProcess.December2020.Domain.Dto;
using Hahn.ApplicatonProcess.December2020.Domain.Services.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Serilog;
using Swashbuckle.AspNetCore.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.December2020.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicantController : ControllerBase
    {
        private readonly IApplicantService applicantService;
        private readonly IMapper mapper;

        public ApplicantController(IApplicantService applicantService, IMapper mapper)
        {
            this.applicantService = applicantService;
            this.mapper = mapper;
        }

        [HttpGet("GetApplicant/{id}")]
        public IActionResult GetApplicant(int id)
        {
            var applicant = applicantService.GetApplicant(id);
            var serialized = JsonConvert.SerializeObject(applicant);
            Log.Information("getapplicant: "+serialized );
            return Ok(applicant);
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var all = applicantService.GetAll();
            return Ok(all);
        }

        [SwaggerRequestExample(typeof(ApplicantDto), typeof(ApplicantDto))]
        [HttpPost("Create")]
        public async Task<IActionResult> CreateApplicant([FromBody]ApplicantDto model)
        {
            Log.Information("CreateApplicant: " + JsonConvert.SerializeObject(model));

            if (!ModelState.IsValid)
            { // re-render the view when validation failed.
                return BadRequest("validation failed");
            }
            else
            {
                var createdApplicant = await applicantService.CreateApplicant(model);
                if (createdApplicant != null)
                {
                    return CreatedAtAction(nameof(GetApplicant), new { id = createdApplicant.Id }, createdApplicant);
                }
                return BadRequest("unable to create applicant");
            }
        
        }
        [HttpPut("Update/{id}")]
        public IActionResult UpdateApplicant(int id, ApplicantDto model)
        {
            var isUpdated = applicantService.UpdateApplicant(id, model);
            return Ok(isUpdated);
        }

        [HttpDelete("Delete/{applicantId}")]
        public IActionResult DeleteApplicant(int applicantId)
        {
            var isDeleted =  applicantService.DeleteApplicant(applicantId);
            return Ok(isDeleted);
        }

        //Todo: Swagger implementation
        //Todo: CountryOfOrigin clarification
        //Todo: logging and Serilog


    }
}
