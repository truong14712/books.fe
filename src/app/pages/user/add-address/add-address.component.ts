/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { addressTypeData } from '@core/constants/addressTypeData';
import { AuthService } from '@core/services/auth/auth.service';
import { Country, State, City, ICountry, IState, ICity } from 'country-state-city';
@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css'],
})
export class AddAddressComponent implements OnInit {
  user!: any;

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
    address1: ['', [Validators.required]],
    address2: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.user = this.auth.isAuthenticated();
  }
  onCountrySelection(Country: any) {
    this.selectedCountry = Country.isoCode;
    this.countryName = Country.name;

    if (this.selectedCountry) {
      this.states = State.getStatesOfCountry(this.selectedCountry);
    }
  }
  onStateSelection(State: any) {
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
        zipCode: this.myForm.value.zipCode,
        address1: this.myForm.value.address1,
        address2: this.myForm.value.address2,
        addressType: this.addressType,
      };
      this.auth.updateAddress(address).subscribe(
        (data: any) => {
          this.auth.setUser(data.data);
          this._snackBar.open(`${data.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        },
        (error) => {
          this._snackBar.open(`${error.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        },
      );
    }
  }
}
