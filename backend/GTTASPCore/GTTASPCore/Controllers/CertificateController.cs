using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GTTASPCore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.IO;

namespace GTTASPCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CertificateController : ControllerBase
    {
    private readonly GTTContext _context;
    private string ruta = "C:\\Users\\eduna\\Desktop\\todo\\GTTCertificate\\backend\\Certificados\\prueba.pfx";
    private string contraseña = "1234";
    public CertificateController(GTTContext context)
    {
      this._context = context;
      if(this._context.Certificates.Count() == 0)
      {
        for (int i = 1; i <= 8; i++)
        {
          Certificate newCertificate = new Certificate();
          newCertificate.alias = "Alias" + i;
          newCertificate.entidad_emisora = "Entidad_Emisora" + i;
          newCertificate.serie = "Serie" + i;
          newCertificate.subject = "Subject" + i;
          DateTime da = new DateTime();
          newCertificate.caducidad = da;
          newCertificate.password = "Password" + i;
          newCertificate.id_orga = 1;
          newCertificate.cliente = "Cliente" + i;
          newCertificate.itegraciones_institucion = "Integraciones" + i;
          newCertificate.persona_contacto = "Persona_contacto" + i;
          newCertificate.reporsitorio = "Repositorio" + i;
          newCertificate.observaciones = "Observaciones" + i;
          newCertificate.eliminado = false;
          this._context.Certificates.Add(newCertificate);
        }
        this._context.SaveChanges();
      }
    }

    // GET: api/Certificate
    [HttpGet]
        public IEnumerable<Certificate> Get()
        {
      return this._context.Certificates.ToList();
    }

        // GET: api/Certificate/5
        [HttpGet("{id}", Name = "GetCertificate")]
        public ActionResult<Certificate> Get(long id)
        {
      Certificate certGet = this._context.Certificates.Find(id);
      if (certGet == null)
      {
        return NotFound("Error 404");
      }
      return certGet;
    }

        // POST: api/Certificate
        [HttpPost]
        public string Post(string value)
        {
      X509Certificate2 certificate = new X509Certificate2(this.ruta, this.contraseña);
      string expirationDate = certificate.GetExpirationDateString();
      string issuer = certificate.Issuer;
      string effectiveDateString = certificate.GetEffectiveDateString();
      string nameInfo = certificate.GetNameInfo(X509NameType.SimpleName, true);
      bool hasPrivateKey = certificate.HasPrivateKey;

      //string token = "{\n expirationDate:" + expirationDate + ",\n" +
      //  "issuer: " + issuer + ",\n" +
      //  "effectiveDateString: " + effectiveDateString + ",\n" +
      //  "nameInfo: " + nameInfo + ",\n" +
      //  "hasPrivateKey: " + hasPrivateKey + "\n}";
      string token = certificate.ToString(true);
      return token;

    }

        // PUT: api/Certificate/5
        [HttpPut("{id}")]
        public ActionResult<ErrorApi> Put(long id, [FromBody] Certificate newCert)
        {
      Certificate certUpdate = this._context.Certificates.Find(id);
      certUpdate.eliminado = newCert.eliminado;
      this._context.SaveChanges();
      return new ErrorApi(200, "Certificado modificado correctamente.");
    }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
