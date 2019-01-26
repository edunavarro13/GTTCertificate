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

    public ErrorApi(int status, string message, string jwt)
    {
      this.status = status;
      this.message = message;
      this.jwt = jwt;
    }
  }
}
