using Hahn.ApplicatonProcess.December2020.Domain.Dto;
using Hahn.ApplicatonProcess.December2020.Data.Persistence;
using Hahn.ApplicatonProcess.December2020.Domain.Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Hahn.ApplicatonProcess.December2020.Data.Abstract;
using AutoMapper;

namespace Hahn.ApplicatonProcess.December2020.Domain.Services.Concrete
{
    public class ApplicantService : IApplicantService
    {
        private readonly IUnitOfWork _uow;
        private readonly IRepository<Applicant> _repo;
        private readonly IMapper mapper;

        public ApplicantService(IUnitOfWork unitOfWork, IRepository<Applicant> repo,IMapper mapper)
        {
            _uow = unitOfWork;
            _repo = repo;
            this.mapper = mapper;
        }
        public async Task<ApplicantDto> CreateApplicant(ApplicantDto applicant)
        {
            if (applicant != null)
            {
              var newApplicant = mapper.Map<Applicant>(applicant);
                _repo.Add(newApplicant);
                var rowsAffected = await _uow.Commit_();
                if (rowsAffected > 0)
                {
                    return mapper.Map<ApplicantDto>(newApplicant);
                }
                return null;
            }
            return null;
        }

        public bool DeleteApplicant(int applicantId)
        {
            if (applicantId > 0)
            {
                var applicant = _repo.Get(a => a.ID == applicantId).FirstOrDefault();
                if (applicant != null)
                {
                    _repo.Delete(applicantId);
                    var rowsAffected = _uow.Commit();
                    if (rowsAffected > 0)
                    {
                        return true;
                    }
                    return false;
                }
                return false;
            }
            return false;
            
            //throw new NotImplementedException();
        }

        public List<ApplicantDto> GetAll()
        {
            var all = _repo.Get();
            var result = mapper.Map<List<ApplicantDto>>(all);

            return result;
            //throw new NotImplementedException();
        }

        public ApplicantDto GetApplicant(int applicantId)
        {
            var applicant = _repo.Get(a => a.ID == applicantId).FirstOrDefault();
            var result = mapper.Map<ApplicantDto>(applicant);

            return result;
            //throw new NotImplementedException();
        }

        public bool UpdateApplicant(int id, ApplicantDto applicant)
        {
            var applicantDetail = _repo.Get(a => a.ID == id).FirstOrDefault();
            if (_repo != null)
            {
               var updatedValue =  mapper.Map(applicant, applicantDetail);
               var rowsAffected = _uow.Commit();
                if (rowsAffected > 0) { 
                    return true; 
                }
                return false;
            }
            return false;
            //throw new NotImplementedException();
        }
    }
}
