﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using backend.Models;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("backend.Models.Entities.Activity", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Event")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<short>("Status")
                        .HasColumnType("smallint");

                    b.Property<string>("Subject")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("CreatedAt");

                    b.HasIndex("Event");

                    b.HasIndex("Status");

                    b.HasIndex("UpdatedAt");

                    b.HasIndex("UserId");

                    b.ToTable("Activity");
                });

            modelBuilder.Entity("backend.Models.Entities.Authentication", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Credential")
                        .HasColumnType("varchar(180)");

                    b.Property<DateTime?>("ExpiredAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<short>("Status")
                        .HasColumnType("smallint");

                    b.Property<string>("Token")
                        .HasColumnType("varchar(36)");

                    b.Property<string>("Type")
                        .HasColumnType("varchar(150)");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("CreatedAt");

                    b.HasIndex("Credential");

                    b.HasIndex("Status");

                    b.HasIndex("Token");

                    b.HasIndex("Type");

                    b.HasIndex("UpdatedAt");

                    b.HasIndex("UserId");

                    b.ToTable("Authentication");
                });

            modelBuilder.Entity("backend.Models.Entities.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("Address")
                        .HasColumnType("text");

                    b.Property<string>("City")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Country")
                        .HasColumnType("varchar(191)");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("varchar(180)");

                    b.Property<string>("FirstName")
                        .HasColumnType("varchar(191)");

                    b.Property<string>("Gender")
                        .HasColumnType("varchar(2)");

                    b.Property<string>("Image")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("LastName")
                        .HasColumnType("varchar(191)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Phone")
                        .HasColumnType("varchar(64)");

                    b.Property<short>("Status")
                        .HasColumnType("smallint");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("ZipCode")
                        .HasColumnType("varchar(20)");

                    b.HasKey("Id");

                    b.HasIndex("City");

                    b.HasIndex("Country");

                    b.HasIndex("CreatedAt");

                    b.HasIndex("Email");

                    b.HasIndex("FirstName");

                    b.HasIndex("Gender");

                    b.HasIndex("Image");

                    b.HasIndex("LastName");

                    b.HasIndex("Password");

                    b.HasIndex("Phone");

                    b.HasIndex("Status");

                    b.HasIndex("UpdatedAt");

                    b.HasIndex("ZipCode");

                    b.ToTable("User");
                });

            modelBuilder.Entity("backend.Models.Entities.Activity", b =>
                {
                    b.HasOne("backend.Models.Entities.User", "User")
                        .WithMany("Activities")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Models.Entities.Authentication", b =>
                {
                    b.HasOne("backend.Models.Entities.User", "User")
                        .WithMany("Authentications")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Models.Entities.User", b =>
                {
                    b.Navigation("Activities");

                    b.Navigation("Authentications");
                });
#pragma warning restore 612, 618
        }
    }
}
