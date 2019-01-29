using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GTTASPCore.Models
{
  public class ErrorApi
  {
    public int status { get; set; }
    public string message { get; set; }
    public string jwt { get; set; }
    public long idUser { get; set; }

    public ErrorApi(int status, string message)
    {
      this.status = status;
      this.message = message;
      this.jwt = "";
      this.idUser = -1;
    }
    public ErrorApi(int status, string jwt, long idUser)
    {
      this.status = status;
      this.message = "";
      this.jwt = jwt;
      this.idUser = idUser;
    }
  }
}
