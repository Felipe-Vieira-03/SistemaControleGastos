using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SistemaControleGastos.Domain.DTOs;
using SistemaControleGastos.Domain.Interfaces.Service;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SistemaControleGastos.Infrastructure.Services
{
    public class TokenService : ITokenService
    {
        private readonly JwtConfig _configJwt;
        public TokenService(IOptions<JwtConfig> configJwt)
        {
            _configJwt = configJwt.Value;
        }

        public string GerarToken(int id, string email, DateTime dataCadastro)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configJwt.ChaveToken);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                new Claim(nameof(TokenDto.Id), id.ToString()),
                new Claim(nameof(TokenDto.Email), email),
                new Claim(nameof(TokenDto.DataCadastro), dataCadastro.ToString("o")),
            }),
                Expires = DateTime.UtcNow.AddHours(_configJwt.ExpiracaoHoras),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
