using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GTTASPCore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Certificate
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Certificate/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
