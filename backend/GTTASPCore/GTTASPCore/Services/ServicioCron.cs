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
      _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromSeconds(10)); // TimeSpan.FromHours(12)

      return Task.CompletedTask;
    }

    public void DoWork(object state)
    {
        var optionsBuild = new DbContextOptionsBuilder<GTTContext>();
        optionsBuild.UseNpgsql("Host=192.168.99.100;Port=5432;Username=postgres;Password=example;Database=ApiGtt;");

        using (var context = new GTTContext(optionsBuild.Options))
        {
          long Id = 1;
          context.Certificates.Load();
          foreach (var cert in context.Certificates.Local)
          {
            _logger.LogInformation(cert.alias);
          }
        }
      //foreach(Certificate cer in this._context.Certificates)
      //{
      //  _logger.LogInformation(cer.alias);
      //}
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
      _logger.LogInformation("Parando el servicio");
      _timer?.Change(Timeout.Infinite, 0);
      return Task.CompletedTask;
    }
  }
}
