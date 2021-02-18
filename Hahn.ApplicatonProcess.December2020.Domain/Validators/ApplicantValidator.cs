using FluentValidation;
using Hahn.ApplicatonProcess.December2020.Domain.Dto;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;

namespace Hahn.ApplicatonProcess.December2020.Domain.Validators
{
    public class ApplicantValidator : AbstractValidator<ApplicantDto>
    {
        public ApplicantValidator()
        {
            var httpClient = new HttpClient();

            RuleFor(x => x.Name).NotEmpty().MinimumLength(5).WithMessage("minimum length for {PropertyName} is 5");
            RuleFor(x => x.FamilyName).NotEmpty().MinimumLength(5).WithMessage("minimum length for {PropertyName} is 5");
            RuleFor(x => x.Address).NotEmpty().MinimumLength(10).WithMessage("minimum length for {PropertyName} is 10");
            RuleFor(x => x.EMailAdress).NotEmpty().WithMessage("{PropertyName} cannot be empty").EmailAddress().WithMessage("{PropertyName} is not in the right format");
            RuleFor(x => x.Age).NotEmpty().ExclusiveBetween(20,60).WithMessage("{PropertyName} must be between 20 and 60");
            RuleFor(x => x.Hired).NotNull().WithMessage("{PropertyName} cannot be null");
            RuleFor(x => x.CountryOfOrigin).MustAsync(async (country, cancellation) =>
            {
                var uri = $"https://restcountries.eu/rest/v2/name/{country}?fullText=true";
                var response = await httpClient.GetAsync(uri);
                var stringResponse = await response.Content.ReadAsStringAsync();
                try
                {
                    var deserializedResult = JsonConvert.DeserializeObject<List<CountryDetail>>(stringResponse);
                    if (string.IsNullOrEmpty(deserializedResult.First().name))
                    {
                        return false;
                    }
                    return true;
                }
                catch (System.Exception e)
                {
                    if (e.Message.Contains("Cannot deserialize the current JSON object"))
                    {
                        return false;
                    }
                    return false;
                }
                
            }).WithMessage("invalid country name supplied").NotNull().WithMessage("country cannot be null");

        }
   
    }
}
