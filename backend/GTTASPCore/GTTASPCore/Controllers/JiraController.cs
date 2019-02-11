using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GTTASPCore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

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
        }
    // GET: api/Jira
    [Authorize]
    [HttpGet]
    public ActionResult<List<Jira>> GetAllJira()
    {
         return this._context.Jiras.ToList();
    }

    // GET: api/Jira/5
    [Authorize]
    [HttpGet("{id}", Name = "GetJira")]
        public ActionResult<Jira> GetJira(long id)
        {
          try
          {
            Jira jiraDel = this._context.Jiras.Where(jira => jira.idUser == id).First();
            return jiraDel;
          }
          catch (Exception ex)
          {
            return NotFound("Error 404");
          }
        }

    // POST: api/Jira
    [Authorize]
    [HttpPost]
        public ActionResult<ErrorApi> PostJira([FromBody] Jira value)
        {
          ErrorApi errApi;
          try
          {
            Jira jiraDel = this._context.Jiras.Where(jira => jira.username == value.username).First();
            errApi = new ErrorApi(405, "Ese usuario Jira ya esta enlazado a otro usuario.");
          }
          catch (Exception ex)
          {
            this._context.Jiras.Add(value);
            this._context.SaveChanges();
            errApi = new ErrorApi(200, "Usuario de Jira enlazado al usuario.");
          }
          return errApi;
        }

    // PUT: api/Jira/5
    [Authorize]
    [HttpPut("{id}")]
        public ActionResult<ErrorApi> PutJira(long id, [FromBody] Jira value)
        {
          
      ErrorApi errApi;
      try
      {
        Jira jiraUpdate = this._context.Jiras.Where(jira => jira.username == value.username).First();
        if (jiraUpdate != null)
        {
          // Si no se modifica el username, deberia encontrarlo, pero con el idUser pasado
          if (jiraUpdate.idUser != id)
          {
            errApi = new ErrorApi(404, "Ese usuario Jira ya esta enlazado a otro usuario.");
          }
          else
          {
            jiraUpdate.username = value.username;
            jiraUpdate.password = value.password;
            jiraUpdate.url = value.url;
            jiraUpdate.proyect = value.proyect;
            jiraUpdate.component = value.component;
            jiraUpdate.descripcion = value.descripcion;
            jiraUpdate.issue_type = Issue.explotacion;
            this._context.SaveChanges();
            errApi = new ErrorApi(200, "Usuario Jira modificado.");
          }
        }
        else
        {
          errApi = new ErrorApi(400, "Error del servidodr.");
        }
      }
      catch (Exception ex)
      {
        Jira jiraUpdate = this._context.Jiras.Where(jira => jira.idUser == id).First(); ;
        jiraUpdate.username = value.username;
        jiraUpdate.password = value.password;
        jiraUpdate.url = value.url;
        jiraUpdate.proyect = value.proyect;
        jiraUpdate.component = value.component;
        this._context.SaveChanges();
        errApi = new ErrorApi(200, "Usuario Jira modificado.");
      }
      return errApi;
    }

    // DELETE: api/ApiWithActions/5
    [Authorize]
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
