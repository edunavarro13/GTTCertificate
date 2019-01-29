using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GTTASPCore.Helpers;
using GTTASPCore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GTTASPCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

    private readonly GTTContext _context;

    public AuthController(GTTContext context)
    {
      this._context = context;
    }
        // GET: api/Auth
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Auth/5
        [HttpGet("{id}", Name = "GetAuth")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Auth
        [HttpPost]
        public ActionResult<ErrorApi> Post([FromBody] User value)
        {
          ErrorApi mess;
          try
          {
            User userLog = this._context.Users.Where(user => user.username == value.username).First();
            if (userLog.password == Encrypt.Hash(value.password))
            {
              mess = new ErrorApi(200, Encrypt.Hash(userLog.username), userLog.id);
            }
            else
            {
              mess = new ErrorApi(401, "Password incorrecta");
            }
          }
          catch (Exception ex)
          {
            mess = new ErrorApi(404, "No existe ningun usuario con ese nombre");
          }
          return mess;
        }

        // PUT: api/Auth/5
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
