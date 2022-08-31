using BlogLab.Models.Account;
using Microsoft.AspNetCore.Identity;

namespace BlogLab.Repository
{
    public interface AccountRepository
    {
        public Task<IdentityResult> CreateAsync(ApplicationUserIdentity user, CancellationToken cancellationToken);
        public Task <ApplicationUserIdentity> GetByUsernameAsync (string NormalizedUsername, CancellationToken cancellationToken);

    }
}