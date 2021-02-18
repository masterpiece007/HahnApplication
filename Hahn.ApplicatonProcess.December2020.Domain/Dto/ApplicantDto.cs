using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.December2020.Domain.Dto
{
    public class ApplicantDto
    {
        public int Id { get; set; }
        [DefaultValue("Quadri")]
        public string Name { get; set; }
        [DefaultValue("Ajagbe")]
        public string FamilyName { get; set; }
        [DefaultValue("My new Address 1")]
        public string Address { get; set; }
        [DefaultValue("Nigeria")]
        public string CountryOfOrigin { get; set; }
        [DefaultValue("q.ajagbe@gmail.com")]
        public string EMailAdress { get; set; }
        [DefaultValue("28")]
        public int Age { get; set; }
        public bool Hired { get; set; } = false;
    }
}
