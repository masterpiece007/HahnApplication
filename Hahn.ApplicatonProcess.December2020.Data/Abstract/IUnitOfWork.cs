using Hahn.ApplicatonProcess.December2020.Data.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.December2020.Data.Abstract
{
    public interface IUnitOfWork : IDisposable
    {
        ApplicantDbContext Context { get; }
        int Commit();
        Task<int> Commit_();

    }
}
