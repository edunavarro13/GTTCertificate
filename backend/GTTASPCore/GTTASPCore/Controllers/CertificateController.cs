using System;
using System.Collections.Generic;
using System.Linq;
using GTTASPCore.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Authorization;

namespace GTTASPCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CertificateController : ControllerBase
    {
    private readonly GTTContext _context;

    public CertificateController(GTTContext context)
    {
      this._context = context;
    }

    // GET: api/Certificate
    [Authorize]
    [HttpGet]
        public IEnumerable<Certificate> Get()
        {
      return this._context.Certificates.ToList();
    }

    // GET: api/Certificate/5
    [Authorize]
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
    [Authorize]
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
    [Authorize]
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
