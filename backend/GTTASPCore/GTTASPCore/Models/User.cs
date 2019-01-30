using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GTTASPCore.Models
{
  public enum Role { admin, user };
  public class User
  {
    public long id { get; set; }
    public string username { get; set; }
    public string password { get; set; }
    public Role role { get; set;}
    }
}
