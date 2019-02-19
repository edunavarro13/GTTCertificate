using System;
using System.Threading;
using System.Threading.Tasks;
using GTTASPCore.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace GTTASPCore.Services
{
  internal class ServicioCron: IHostedService, IDisposable
  {
    private readonly ILogger _logger;
    private Timer _timer;
    private readonly GTTContext _context;

    public ServicioCron(ILogger<ServicioCron> logger)
    {
      this._logger = logger;
    }

    public void setContext(GTTContext _context)
    {
      _logger.LogInformation("Ejecutando tarea");
    }

    public void Dispose()
    {
      _timer?.Dispose();
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
      _logger.LogInformation("Iniciando el servicio");
      _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromSeconds(5)); // TimeSpan.FromHours(12)

      return Task.CompletedTask;
    }

    public void DoWork(object state)
    {
        var optionsBuild = new DbContextOptionsBuilder<GTTContext>();
      optionsBuild.UseNpgsql("Host=192.168.99.100;Port=5432;Username=postgres;Password=example;Database=ApiGtt;");// Host =ec2-54-247-113-90.eu-west-1.compute.amazonaws.com;Port=5432;Username=dxrfnsywqjvdeq;Password=d0dc61b17af9ffe0b1cc18e87089fa07898d66123b92b6514afdea0281c2fe83;Database=dcm55dbn35qm7c;");

        using (var context = new GTTContext(optionsBuild.Options))
        {
          context.Certificates.Load();
          foreach (var cert in context.Certificates.Local)
          {
          DateTime today = DateTime.Today;
          DateTime maxdate = DateTime.Today.AddMonths(1);
          //DateTime maxdateAux = new DateTime(2018, 01, 29);
          // Primero los que ya han caducado (los eliminados ya no cuentan)
          // Puede pasar a Caducado un correcto, un alertado o un jira
          if(!cert.eliminado && cert.caducidad < today && cert.estado != Estado.caducado)
          {
            Certificate c2 = context.Certificates.Find(cert.id);
            c2.estado = Estado.caducado;
            context.SaveChanges();
            _logger.LogInformation("El certificado " + c2.alias + " ha pasado a Caducado.");
          }
          // Luego los que van a caducar en 1 mes (los eliminados ya no cuentan)
          else if (!cert.eliminado && cert.caducidad < maxdate && cert.estado == Estado.correcto)
          {
            Certificate c2 = context.Certificates.Find(cert.id);
            c2.estado = Estado.alertado;
            context.SaveChanges();
            _logger.LogInformation("El certificado " + c2.alias + " ha pasado a Alertado.");
          }
          }
        }
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
      _logger.LogInformation("Parando el servicio");
      _timer?.Change(Timeout.Infinite, 0);
      return Task.CompletedTask;
    }
  }
}
