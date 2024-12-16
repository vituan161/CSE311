using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RealEstateBackEnd.Models
{
    public class News
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;
        public IList<string> Imageurl { get; set; } = new List<string>();
        [Required]
        public IList<string> Content { get; set; } = new List<string>();
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        [ForeignKey(nameof(Company))]
        public int CompanyId { get; set; }
        public Company Company { get; set; } = null!;
    }
}
