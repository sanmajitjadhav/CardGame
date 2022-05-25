import { Component, OnInit } from '@angular/core';
import { CardServiceService } from 'src/app/card-service.service';
import { HttpService } from 'src/app/http-service.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public cards: CardRow[] = [];
  private serviceSubscription: any;

  constructor(private cardService: CardServiceService, private httpService : HttpService) {

    this.serviceSubscription = this.cardService.onSelect.subscribe({
      next: (card: string) => {
          this.addNewCard(card);
      }
  })

   }

  ngOnInit(): void {

  }

  performSorting()
  {
    var cards : string[] = [];

    for (let index = 0; index < this.cards.length; index++) {
      const element = this.cards[index];

      if(element.card1 != undefined)
      {
          cards.push(element.card1);
      }
      if(element.card2 != undefined)
      {
          cards.push(element.card2);
      }
      if(element.card3 != undefined)
      {
          cards.push(element.card3);
      }
      if(element.card4 != undefined)
      {
          cards.push(element.card4);
      }
    }

    this.httpService.sortCards(cards).subscribe(result => this.updateBoard(result),  error => console.error(error));

  }

  reset(){
    this.cards = [];
    this.cardService.reset();
  }

  private updateBoard(result: string[]): void {
    this.cards = [];
    for (let index = 0; index < result.length; index++) {
      const element = result[index];
      this.addNewCard(element);
    }
  }

  private addNewCard(card: string) {

    if(this.cards.length == 0)
    {
      this.cards.push({card1 : card});
      return;
    }

     const item  = this.cards[this.cards.length - 1];

     if(item.card2 === undefined)
     {
      item.card2 = card;
     }
     else if(item.card3 === undefined)
     {
      item.card3 = card;
     }
     else if(item.card4 === undefined)
     {
      item.card4 = card;
     }
     else
     {
      this.cards.push({card1 : card});
     }
  }

}

interface CardRow {
  card1?: string;
  card2?: string;
  card3?: string;
  card4?: string;
}

