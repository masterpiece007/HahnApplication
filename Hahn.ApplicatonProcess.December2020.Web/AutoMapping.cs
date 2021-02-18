using AutoMapper;
using Hahn.ApplicatonProcess.December2020.Data.Persistence;
using Hahn.ApplicatonProcess.December2020.Domain.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.December2020.Web
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<Applicant, ApplicantDto>();
            CreateMap<ApplicantDto, Applicant>();

        }
    }
}

