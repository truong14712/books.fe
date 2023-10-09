/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { addressTypeData } from '@core/constants/addressTypeData';
import { User } from '@core/interfaces/user';
import { AuthService } from '@core/services/auth/auth.service';
import { Country, State, City, ICountry, IState, ICity } from 'country-state-city';
@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css'],
})
export class AddAddressComponent implements OnInit {
  user!: User;

  countries: ICountry[] = Country.getAllCountries();
  states: IState[] = [];
  cities: ICity[] = [];
  addressTypeData = addressTypeData;

  selectedState!: string;
  selectedCity!: string;
  selectedCountry!: string;

  countryName!: string;
  stateName!: string;
  cityName!: string;
  addressType!: string;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  myForm = this.formBuilder.group({
    zipCode: ['', [Validators.required]],
    address: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private _snackBar: MatSnackBar,
    private route: Router,
  ) {}

  ngOnInit() {
    this.user = this.auth.isAuthenticated();
  }
  onCountrySelection(Country: { isoCode: string; name: string }) {
    this.selectedCountry = Country.isoCode;
    this.countryName = Country.name;

    if (this.selectedCountry) {
      this.states = State.getStatesOfCountry(this.selectedCountry);
    }
  }
  onStateSelection(State: { isoCode: string; name: string }) {
    this.selectedState = State.isoCode;
    this.stateName = State.name;

    if (this.selectedState && this.selectedCountry) {
      this.cities = City.getCitiesOfState(this.selectedCountry, this.selectedState);
    }
  }
  onCitySelection(City: string) {
    this.selectedCity = City;
    this.cityName = City;
  }
  onTypeAddress(type: string) {
    this.addressType = type;
  }
  onSubmit() {
    if (this.myForm.valid) {
      const address = {
        country: this.countryName,
        state: this.stateName,
        city: this.cityName,
        zipCode: this.myForm.value.zipCode as string,
        address: this.myForm.value.address as string,
        addressType: this.addressType,
      };
      this.auth.addAddress(address).subscribe(
        (data: any) => {
          this.auth.setUser(data.data);
          this.route.navigate(['/user/profile/myAddress']);
          this._snackBar.open(`${data.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        },
        ({ error }) => {
          this._snackBar.open(`${error.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        },
      );
    }
  }
}
