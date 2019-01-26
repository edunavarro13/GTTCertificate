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
    public class JiraController : ControllerBase
    {
        private readonly GTTContext _context;
        public JiraController(GTTContext context)
        {
          this._context = context;
          if (this._context.Jiras.Count() == 0)
          {
            Console.WriteLine("No existe ningun usuario Jira");
            Jira newUser = new Jira();
            newUser.username = "edunavarro13Jira";
            newUser.password = "1234";
            this._context.Jiras.Add(newUser);
            this._context.SaveChanges();
          }
        }
    // GET: api/Jira
    [HttpGet]
    public ActionResult<List<Jira>> GetAllJira()
    {
         return this._context.Jiras.ToList();
    }

        // GET: api/Jira/5
        [HttpGet("{id}", Name = "GetJira")]
        public ActionResult<Jira> GetJira(long id)
        {
          Jira jiraGet = this._context.Jiras.Find(id);
          if (jiraGet == null)
          {
            return NotFound("Error 404");
          }
          return jiraGet;
        }

        // POST: api/Jira
        [HttpPost]
        public ActionResult<Jira> PostJira([FromBody] Jira value)
        {
          this._context.Jiras.Add(value);
          this._context.SaveChanges();
          return value;
        }

        // PUT: api/Jira/5
        [HttpPut("{id}")]
        public void PutJira(long id, [FromBody] Jira value)
        {
          Jira jiraUpdate = this._context.Jiras.Find(id);
          jiraUpdate.username = value.username;
          jiraUpdate.password = value.password;
          this._context.SaveChanges();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ActionResult<string> DeleteJira(long id)
        {
          try
          {
            Jira jiraDel = this._context.Jiras.Where(jira => jira.id == id).First();
            this._context.Remove(jiraDel);
            this._context.SaveChanges();
            return "200";
          }
          catch (Exception ex)
          {
            return NotFound("Error 404");
          }
        }
    }
}
