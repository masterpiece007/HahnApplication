using Hahn.ApplicatonProcess.December2020.Data.Abstract;
using Hahn.ApplicatonProcess.December2020.Data.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.December2020.Data.Concrete
{
    public class UnitOfWork : IUnitOfWork
    {
        public ApplicantDbContext Context { get; }

        public UnitOfWork(ApplicantDbContext context)
        {
            Context = context;
        }
        public int Commit()
        {
            var rowsAffected = Context.SaveChanges();
            return rowsAffected;
        }
        public async Task<int> Commit_()
        {
            var rowsAffected = await Context.SaveChangesAsync();
            return rowsAffected;
        }

        public void Dispose()
        {
            Context.Dispose();

        }
    }
}
