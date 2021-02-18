using Hahn.ApplicatonProcess.December2020.Domain.Dto;
using Hahn.ApplicatonProcess.December2020.Data.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.December2020.Domain.Services.Abstract
{
    public interface IApplicantService
    {
        List<ApplicantDto> GetAll();
        ApplicantDto GetApplicant(int applicantId);
        Task<ApplicantDto> CreateApplicant(ApplicantDto applicant);
        bool UpdateApplicant(int id, ApplicantDto applicant);
        bool DeleteApplicant(int applicantId);
    }
}
