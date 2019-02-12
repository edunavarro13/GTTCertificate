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
    public class ServicioCronController : ControllerBase
    {

    private readonly GTTContext _context;

    public ServicioCronController(GTTContext context)
    {
      this._context = context;
    }
    // GET: api/ServicioCron
    [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/ServicioCron/5
        [HttpGet("{id}", Name = "GetServicio")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ServicioCron
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/ServicioCron/5
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
