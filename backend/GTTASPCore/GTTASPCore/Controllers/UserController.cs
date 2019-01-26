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
        [HttpPost]
        public ActionResult<User> Post([FromBody] User value)
        {
            this._context.Users.Add(value);
            this._context.SaveChanges();
            return value;
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public void Put(long id, [FromBody] User value)
        {
            User userUpdate = this._context.Users.Find(id);
            userUpdate.username = value.username;
            userUpdate.password = value.password;
            this._context.SaveChanges();
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
