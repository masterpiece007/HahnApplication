﻿// <auto-generated />
using Hahn.ApplicatonProcess.December2020.Data.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Hahn.ApplicatonProcess.December2020.Data.Migrations
{
    [DbContext(typeof(ApplicantDbContext))]
    [Migration("20210206214215_intialDbcreation")]
    partial class intialDbcreation
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.2");

            modelBuilder.Entity("Hahn.ApplicatonProcess.December2020.Data.Persistence.Applicant", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<string>("CountryOfOrigin")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EMailAdress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FamilyName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Hired")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Applicants");
                });
#pragma warning restore 612, 618
        }
    }
}
