using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace backend.Models.Entities
{
    [Index(nameof(UserId))]
    [Index(nameof(Credential))]
    [Index(nameof(Type))]
    [Index(nameof(Token))]
    [Index(nameof(Status))]
    [Index(nameof(CreatedAt))]
    [Index(nameof(UpdatedAt))]
    public class Authentication
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [DisplayName("User")]
        public long UserId { get; set; }
        public required virtual User User { get; set; }

        [Column(TypeName = "varchar(150)")]
        public string? Type { get; set; } = null;

        [Column(TypeName = "varchar(180)")]
        public string? Credential { get; set; } = null;

        [Column(TypeName = "varchar(36)")]
        public string? Token { get; set; } = null;

        [Required]
        [Column(TypeName = "smallint")]
        public int Status { get; set; } = 1;

        public Nullable<System.DateTime> ExpiredAt { get; set; } = null;
        public Nullable<System.DateTime> CreatedAt { get; set; } = DateTime.UtcNow;
        public Nullable<System.DateTime> UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
