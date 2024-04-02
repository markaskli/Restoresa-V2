using API.Entities;

namespace API.Services.TokenService
{
    public interface ITokenService
    {
        Task<string> CreateToken(User user);
    }
}