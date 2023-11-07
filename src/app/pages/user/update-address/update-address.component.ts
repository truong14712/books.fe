import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { addressTypeData } from '@core/constants/addressTypeData';
import { User } from '@core/interfaces/user';
import { AuthService } from '@core/services/auth/auth.service';
import { City, Country, ICity, ICountry, IState, State } from 'country-state-city';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css'],
})
export class UpdateAddressComponent implements OnInit {
  user!: User;

  countries: ICountry[] = Country.getAllCountries();
  states: IState[] = [];
  cities: ICity[] = [];
  addressTypeData = addressTypeData;
  address: any;
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
    country: ['', [Validators.required]],
    state: ['', [Validators.required]],
    city: ['', [Validators.required]],
    addressType: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private _snackBar: MatSnackBar,
    private route: Router,
    private ActivatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.user = this.auth.isAuthenticated();
    this.ActivatedRoute.paramMap.subscribe((params) => {
      const id = String(params.get('id'));
      const address: any = this.user.addresses.find((value) => {
        return value._id === id;
      });
      this.address = address;
      this.myForm.patchValue({
        address: address.address,
        zipCode: address.zipCode,
        country: address.country,
        state: address.state,
        city: address.city,
        addressType: address.addressType,
      });
      this.stateName = address.state;
      this.cityName = address.city;
      this.countryName = address.country;
      this.addressType = address.addressType;
    });
    console.log(this.user.addresses);
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
        addressId: this.address._id,
        updatedAddressData: {
          country: this.countryName,
          state: this.stateName,
          city: this.cityName,
          zipCode: this.myForm.value.zipCode as string,
          address: this.myForm.value.address as string,
          addressType: this.addressType,
        },
      };
      this.auth.updateAddress(address).subscribe(
        (data: any) => {
          this.auth.setUser(data.data);
          this.route.navigate(['/user/profile/myAddress']);
          this._snackBar.open(`${data.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000,
          });
        },
        ({ error }) => {
          this._snackBar.open(`${error.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000,
          });
        },
      );
    }
  }
}
