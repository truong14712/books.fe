export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: number | string;
  confirmPassword: string;
  avatar: {
    url: string;
    public_id: string;
  };
  addresses: Addresses[];
  role: string;
}

export interface changePassword {
  password: string;
  newPassword: string;
  confirmPassword: string;
}
export interface changeInformation {
  firstName: string;
  lastName: string;
  phoneNumber: number | string;
}

export interface Addresses {
  address: string;
  addressType: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  status?: boolean;
}
