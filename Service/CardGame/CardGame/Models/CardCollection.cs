using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CardGame
{
    public class CardCollection
    {
        [Required]
        public List<string> Cards { get; set; }
    }
}