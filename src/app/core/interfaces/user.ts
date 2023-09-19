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
}
