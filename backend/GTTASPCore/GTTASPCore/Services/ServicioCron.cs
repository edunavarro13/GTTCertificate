using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace GTTASPCore.Services
{
  internal class ServicioCron: IHostedService, IDisposable
  {
    private readonly ILogger _logger;
    private Timer _timer;

    public ServicioCron(ILogger<ServicioCron> logger)
    {
      this._logger = logger;
    }

    public void Dispose()
    {
      _timer?.Dispose();
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
      _logger.LogInformation("Iniciando el servicio");
      _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromSeconds(60)); // TimeSpan.FromHours(12)
      return Task.CompletedTask;
    }

    public void DoWork(object state)
    {
      _logger.LogInformation("Ejecutando tarea");
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
      _logger.LogInformation("Parando el servicio");
      _timer?.Change(Timeout.Infinite, 0);
      return Task.CompletedTask;
    }
  }
}
