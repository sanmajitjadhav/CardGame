import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly baseURL = "https://cardgamesample.azurewebsites.net/Card";

  constructor(private httpClient: HttpClient)
  {

   }

   public getCards()
   {
     return this.httpClient.get<string[]>(this.baseURL);
   }

   public sortCards(cards: string[])
   {
     var cardCollection : CardCollection = {cards: cards};
     return this.httpClient.post<string[]>(this.baseURL + "/sort", cardCollection);
   }

}

interface CardCollection {
  cards: string[];
}
