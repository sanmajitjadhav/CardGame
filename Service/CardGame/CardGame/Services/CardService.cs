using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CardGame
{
    public class CardService : ICardService
    {
        public readonly List<string> cards = new List<string>();
        public readonly Dictionary<char, short> suits = new Dictionary<char, short>();
        public readonly Dictionary<string, short> preStrs = new Dictionary<string, short>();
        public readonly Dictionary<string, short> specialCards = new Dictionary<string, short>();

        public CardService()
        {
            //Create suit list, also add priority to corresponding suit.
            suits.Add('D', 1);
            suits.Add('S', 2);
            suits.Add('C', 3);
            suits.Add('H', 4);

            //Create pre string list
            short count = 0;
            for (int i = 2; i <= 10; i++)
            {
                preStrs.Add(i.ToString(), count++);
            }
            preStrs.Add("J", count++);
            preStrs.Add("Q", count++);
            preStrs.Add("K", count++);
            preStrs.Add("A", count++);

            //Create card list
            foreach(var suit in suits)
            {
                foreach (var preStr in preStrs)
                {
                    cards.Add(preStr.Key + suit.Key);
                }
            }

            //Add special suit
            suits.Add('T', 0);
            specialCards.Add("4T", 0);
            specialCards.Add("2T", 1);
            specialCards.Add("ST", 2);
            specialCards.Add("PT", 3);
            specialCards.Add("RT", 4);

            foreach (var card in specialCards)
            {
                cards.Add(card.Key);
            }
        }

        public List<string> GetCards()
        {
            return cards;
        }

        public List<string> SortCards(CardCollection cardCollection)
        {
            cardCollection.Cards.Sort(Comparer);

            return cardCollection.Cards;
        }

        private int Comparer(string x, string y)
        {
           int xPriority = suits[x.Last()];
           int yPriority = suits[y.Last()];

            //If both cards are not from same suit.
            if (xPriority != yPriority)
            {
                return xPriority - yPriority;
            }

            //If both cards are from same suit(special cards).
            if (x.Last() == 'T')
            {
                return specialCards[x] - specialCards[y];
            }

            int xPreStrPrior = preStrs[x.Remove(x.Length - 1)];
            int yPreStrPrior = preStrs[y.Remove(y.Length - 1)];

            return xPreStrPrior - yPreStrPrior;
  
        }
    }
}
