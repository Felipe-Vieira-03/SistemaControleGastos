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
        public string GerarToken(int id, string email, DateTime dataCadastro)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("ch4v3S3cr3t4**JWT-2026&%##");

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                new Claim(nameof(TokenDto.Id), id.ToString()),
                new Claim(nameof(TokenDto.Email), email),
                new Claim(nameof(TokenDto.DataCadastro), dataCadastro.ToString("o")),
            }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
