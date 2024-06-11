import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit{
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService
  ){}

  public country?: Country;

  ngOnInit(): void {
    //* Obtener el parametro de la URL (El :id del país)
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.countriesService.searchCountryByAlphaCode(id))
      )
      .subscribe( country => {
        if (!country) {
          return this.router.navigateByUrl('');
        }

        // console.log('Tenemos un País');
        return this.country = country;
      });
  }
}
