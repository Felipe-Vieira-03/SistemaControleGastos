namespace SistemaControleGastos.API.Errors
{
    public class ExceptionsErrors
    {
        public ExceptionsErrors(string codigoRetorno, string mensagem, string informacoesErro)
        {
            CodigoRetorno = codigoRetorno;
            Mensagem = mensagem;
            InformacoesErro = informacoesErro;
        }
        public string CodigoRetorno { get; set; }
        public string Mensagem { get; set; }
        public string InformacoesErro { get; set; }
    }
}
