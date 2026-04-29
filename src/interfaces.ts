export interface UserAddress {
  address: string;
  city: string;
  state: string;
  country: string;
}

export interface UserCompany {
  name: string;
  department: string;
  title: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  image: string;
  birthDate: string;
  university: string;
  role: string;
  address: UserAddress;
  company: UserCompany;
}
