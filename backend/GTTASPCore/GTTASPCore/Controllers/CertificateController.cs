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
    private string ruta2 = "C:\\Users\\eduna\\Downloads\\20170419-ja-kit-de-certificados-de-prueba-v9.1.2\\20170419-JA-Kit-de-Certificados-de-Prueba-v9.1.2\\ACA\\SCD-colegiado-Ministerio.p12";
    private string contraseña = "111111";
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
          newCertificate.repositorio = "Repositorio" + i;
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
        public ActionResult<ErrorApi> Post([FromBody] Certificate value)
        {
          // Obtenemos el string en base64 y se convierte a byte []
          byte[] arrayBytes = System.Convert.FromBase64String(value.fichero64);
          // Lo cargamos en certificate
          X509Certificate2 certificate = new X509Certificate2(arrayBytes, this.contraseña);
          string token = certificate.ToString(true);
          // Por ahora solo devuelve todos los datos
          return new ErrorApi(200, token);

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
