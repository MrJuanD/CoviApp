import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../Models/Result';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  private covidApiUrl = 'https://api.covid19api.com/';

  private countryFlagsPrefixUrl = 'https://www.countryflags.io/';
  private countryFlagsSuffixUrl = '/flat/64.png';
   
  constructor(public httpClient: HttpClient) { }

  getCountryList(): Observable<Result>{
    return this.httpClient.get(this.covidApiUrl + 'summary') as Observable<Result>;
   // return this.httpClient.get('../../assets/countryListResult.json');
  }
}
