using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using GTTASPCore.Models;

namespace GTTASPCore.Controllers
{
  [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
    private readonly GTTContext _context;

    public ValuesController(GTTContext context)
    {
      this._context = context;
    }
    // GET api/values
    [Authorize]
    [HttpGet]
        public ActionResult<ErrorApi> Get()
        {
          int cantidad = 0;
          foreach (var element in this._context.Certificates)
          {
            if (element.estado == Estado.alertado || element.estado == Estado.caducado)
              cantidad++;
          }
          return new ErrorApi(200, "" + cantidad);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(long id)
        {
      return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
