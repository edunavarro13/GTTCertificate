﻿// <auto-generated />
using System;
using GTTASPCore.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace GTTASPCore.Migrations
{
    [DbContext(typeof(GTTContext))]
    partial class GTTContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("GTTASPCore.Models.Certificate", b =>
                {
                    b.Property<long>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("alias");

                    b.Property<DateTime>("caducidad");

                    b.Property<string>("cliente");

                    b.Property<bool>("eliminado");

                    b.Property<string>("entidad_emisora");

                    b.Property<int>("estado");

                    b.Property<string>("fichero64");

                    b.Property<long>("id_orga");

                    b.Property<string>("itegraciones_institucion");

                    b.Property<string>("nombreArchivo");

                    b.Property<string>("observaciones");

                    b.Property<string>("password");

                    b.Property<string>("persona_contacto");

                    b.Property<string>("repositorio");

                    b.Property<string>("serie");

                    b.Property<string>("subject");

                    b.HasKey("id");

                    b.ToTable("Certificates");
                });

            modelBuilder.Entity("GTTASPCore.Models.Jira", b =>
                {
                    b.Property<long>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("component");

                    b.Property<string>("descripcion");

                    b.Property<long>("idUser");

                    b.Property<int>("issue_type");

                    b.Property<string>("password");

                    b.Property<string>("proyect");

                    b.Property<string>("url");

                    b.Property<string>("username");

                    b.HasKey("id");

                    b.ToTable("Jiras");
                });

            modelBuilder.Entity("GTTASPCore.Models.User", b =>
                {
                    b.Property<long>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("password");

                    b.Property<int>("role");

                    b.Property<string>("username");

                    b.HasKey("id");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
