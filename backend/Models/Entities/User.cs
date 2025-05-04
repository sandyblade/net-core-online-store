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

using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Entities
{
    [Index(nameof(Email))]
    [Index(nameof(Phone))]
    [Index(nameof(Password))]
    [Index(nameof(Status))]
    [Index(nameof(ZipCode))]
    [Index(nameof(City))]
    [Index(nameof(Image))]
    [Index(nameof(FirstName))]
    [Index(nameof(LastName))]
    [Index(nameof(Gender))]
    [Index(nameof(Country))]
    [Index(nameof(CreatedAt))]
    [Index(nameof(UpdatedAt))]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Required]
        [Column(TypeName = "varchar(180)")]
        public required string Email { get; set; }


        [Column(TypeName = "varchar(64)")]
        public string ?Phone { get; set; } = null;

        [Required]
        [Column(TypeName = "varchar(255)")]
        [JsonIgnore]
        public required string Password { get; set; }

        [Column(TypeName = "varchar(255)")]
        public string? Image { get; set; } = null;

        [Column(TypeName = "varchar(191)")]
        public string? FirstName { get; set; } = null;

        [Column(TypeName = "varchar(191)")]
        public string? LastName { get; set; } = null;

        [Column(TypeName = "varchar(2)")]
        public string? Gender { get; set; } = null;

        [Column(TypeName = "varchar(191)")]
        public string? Country { get; set; } = null;

        [Column(TypeName = "varchar(255)")]
        public string? City { get; set; } = null;

        [Column(TypeName = "varchar(20)")]
        public string? ZipCode { get; set; } = null;


        [Column(TypeName = "text")]
        public string? Address { get; set; } = null;

        [Required]
        [Column(TypeName = "smallint")]
        public int Status { get; set; } = 0;

        public Nullable<System.DateTime> CreatedAt { get; set; } = DateTime.UtcNow;
        public Nullable<System.DateTime> UpdatedAt { get; set; } = DateTime.UtcNow;
        public virtual ICollection<Activity> Activities { get; set; } = new List<Activity>();
        public virtual ICollection<Authentication> Authentications { get; set; } = new List<Authentication>();
    }
}
