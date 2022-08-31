using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogLab.Models.Account
{
    public class ApplicationUserCreate: ApplicationUserLogin
    {
        [MinLength(10, ErrorMessage = "Full name Must be at least 10 characters")]
        [MaxLength(30, ErrorMessage = "Full name Must be less than 30 characters")]
        public string Fullname { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [MaxLength(30, ErrorMessage = "Email Must be less than 30 characters")]
        [EmailAddress(ErrorMessage = "Email Invalid")]
        public string Email { get; set; }
    }
}
