/**
 * This file is part of the Sandy Andryanto Blog Application.
 *
 * @author     Sandy Andryanto <sandy.andryanto.blade@gmail.com>
 * @copyright  2025
 *
 * For the full copyright and license information,
 * please view the LICENSE.md file that was distributed
 * with this source code.
 */

using backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class AppDbContext : DbContext
    {
        public DbSet<Activity> Activity { get; set; }
       
        public DbSet<User> User { get; set; }

        public DbSet<Authentication> Authentication { get; set; }


        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Activity>().HasOne(c => c.User).WithMany(n => n.Activities).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Authentication>().HasOne(c => c.User).WithMany(n => n.Authentications).OnDelete(DeleteBehavior.Restrict);
        }

    }
}
