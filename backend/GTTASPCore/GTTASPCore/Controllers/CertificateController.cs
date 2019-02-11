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
      try
      {
        // Obtenemos el string en base64 y se convierte a byte []
        byte[] arrayBytes = Convert.FromBase64String(value.fichero64);
        // Lo cargamos en certificate
        X509Certificate2 certificate = new X509Certificate2(arrayBytes, value.password);
        string token = certificate.ToString(true);
        value.serie = certificate.GetSerialNumberString();
        value.subject = certificate.Subject;
        value.entidad_emisora = certificate.Issuer;
        value.caducidad = certificate.NotAfter;

        this._context.Certificates.Add(value);
        this._context.SaveChanges();
        // Por ahora solo devuelve todos los datos
        return new ErrorApi(200, "Certificado agregado");
      } catch (Exception ex)
      {
        return NotFound(new ErrorApi(404, "Contraseña incorrecta"));
      }

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
