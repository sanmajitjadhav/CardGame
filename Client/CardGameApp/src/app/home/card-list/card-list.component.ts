import { Component, OnInit } from '@angular/core';
import { CardServiceService as CardService } from 'src/app/card-service.service';
import { HttpService } from 'src/app/http-service.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  public cards: Card[];
  serviceSubscription: any;

  constructor(private cardService: CardService, private httpService : HttpService ) {

    this.serviceSubscription = this.cardService.onReset.subscribe({
      next: () => {
          this.reset();
      }
  })

   }

  ngOnInit(): void {

    this.getCards();

  }

  onSelect(cardNum : string) {

    this.cardService.select(cardNum);
    this.cards = this.cards.filter(card => card.name != cardNum);

  }

  private getCards() {
    this.httpService.getCards().subscribe(result => this.addCards(result), error => console.error(error));
  }

  private reset() {
    this.getCards();
  }

  private addCards(cardsNames : string[]){
    this.cards = [];
    for (let index = 0; index < cardsNames.length; index++) {
      const element = cardsNames[index];
      console.log(element);
      this.cards.push({name: element});
    }
  }

}

interface Card {
  name: string;
}
