using Hahn.ApplicatonProcess.December2020.Domain.Dto;
using Swashbuckle.AspNetCore.Filters;
using Swashbuckle.Examples;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.December2020.Web.SwashbuckleExample
{
    public class ApplicantExample : IExamplesProvider
    {
        public object GetExamples()
        {
            return new ApplicantDto
            {
                Address = "My example Address",
                Age = 29,
                CountryOfOrigin = "Nigeria",
                EMailAdress = "example@gmail.com",
                FamilyName = "Ajagbe",
                Hired = false,
                Name = "Quadri"

            };
        }
    }
}
