using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.December2020.Domain.Dto
{
 
    public class CountryDto
    {
        public List<CountryDetail> Details { get; set; }
       
    }
    public class CountryDetail {
        public string name { get; set; }
        public string capital { get; set; }
        public string region { get; set; }
    }


    public class CountryFail
    {
        public int status { get; set; }
        public string message { get; set; }
    }
}
