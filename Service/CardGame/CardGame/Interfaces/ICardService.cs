using System.Collections.Generic;

namespace CardGame
{
    public interface ICardService
    {
        List<string> GetCards();
        List<string> SortCards(CardCollection cards);
    }
}