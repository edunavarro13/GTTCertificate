using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GTTASPCore.Models
{
  public class GTTContext : DbContext
  {
    public GTTContext(DbContextOptions<GTTContext> options) : base(options)
    {

    }
    public DbSet<Jira> Jiras { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Certificate> Certificates { get; set; }
  }
}
