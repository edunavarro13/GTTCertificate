using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GTTASPCore.Models;
using GTTASPCore.Helpers;

namespace GTTASPCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly GTTContext _context;

        public UserController(GTTContext context)
        {
            this._context = context;
            if(this._context.Users.Count() == 0)
            {
                Console.WriteLine("No existe ningun usuario");
                User newUser = new User();
                newUser.username = "edunavarro13";
                newUser.password = Encrypt.Hash("1234");
                newUser.role = Role.admin;
                newUser.user_jira = null;
                this._context.Users.Add(newUser);
                this._context.SaveChanges();
            }
        }

        // GET: api/User
        [HttpGet]
        public ActionResult<List<User>> GetAll()
        {
            return this._context.Users.ToList();
        }

        // GET: api/User/5
        [HttpGet("{id}", Name = "Get")]
        public ActionResult<User> GetUser(long id)
        {
            User userGet = this._context.Users.Find(id);
            if(userGet == null)
            {
                return NotFound("Error 404");
            }
            return userGet;
        }

        // POST: api/User
        // Es el Register
        [HttpPost]
        public ActionResult<ErrorApi> Post([FromBody] User value)
        {
            ErrorApi valueReturn;
            try
            {
              User userEx = this._context.Users.Where(user => user.username == value.username).First();
              if(userEx != null)
              {
                valueReturn = new ErrorApi(405, "El usuario ya existe.");
                return valueReturn;
              }
            }
      // Si lo pilla es que Users esta vacia, ergo no existe
            catch (Exception ex) { }
            value.password = Encrypt.Hash(value.password);
            value.role = Role.user;
            this._context.Users.Add(value);
            this._context.SaveChanges();
            valueReturn = new ErrorApi(200, "Usuario creado con éxito.");
            return valueReturn;
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public ActionResult<ErrorApi> Put(long id, [FromBody] User value)
        {
            User userUpdate = this._context.Users.Find(id);
            userUpdate.password = value.password;
            userUpdate.role = value.role;
      Jira jiraUpdate = new Jira();
      jiraUpdate.username = value.user_jira.username;
      jiraUpdate.password = value.user_jira.password;
      jiraUpdate.url = value.user_jira.url;
      jiraUpdate.component = value.user_jira.component;
      jiraUpdate.proyect = value.user_jira.proyect;
      userUpdate.user_jira = jiraUpdate;

      this._context.SaveChanges();
            return new ErrorApi(200, "Usuario modificado correctamente.");
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ActionResult<string> Delete(long id)
        {
            // Se podria tambien hacer con Find
            try
            {
                User userDel = this._context.Users.Where(user => user.id == id).First();
                this._context.Remove(userDel);
                this._context.SaveChanges();
                return "200";
            } catch(Exception ex)
            {
                return NotFound("Error 404");
            }
        }
    }
}
