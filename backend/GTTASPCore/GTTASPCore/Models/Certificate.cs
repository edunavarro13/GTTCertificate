using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GTTASPCore.Models
{
  public class Certificate
  {
    public long id { get; set; }
    public string alias { get; set; }
    public string entidad_emisora { get; set; }
    public string serie { get; set; }
    public string subject { get; set; }
    public DateTime caducidad { get; set; }
    public string password { get; set; }
    public long id_orga { get; set; }
    public string cliente { get; set; }
    public string itegraciones_institucion {get; set;}
    public string persona_contacto { get; set; }
    public string reporsitorio { get; set; }
    public string observaciones { get; set; }
    public bool eliminado { get; set; }
  }
}
