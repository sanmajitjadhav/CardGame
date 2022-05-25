using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CardGame.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CardController : ControllerBase
    {

        private readonly ILogger<CardController> logger;
        private readonly ICardService cardService;

        public CardController(ILogger<CardController> logger, ICardService cardService)
        {
            logger = logger;
            this.cardService = cardService;
        }

        [HttpGet]
        public IEnumerable<string> GetCards()
        {
            List<string> cards = cardService.GetCards();
            return cards;
        }

        [HttpPost("sort")]
        public ActionResult<IEnumerable<String>> SortCards([FromBody]CardCollection cards)
        {
            if (ModelState.IsValid)
            {
                List<string> sortedCards = cardService.SortCards(cards);
                return sortedCards;
            }
            return BadRequest(ModelState);
        }
    }
}
