export interface IForm {
  name: string;
  age: number;
  gender: 'male' | 'female';
  country: string;
  picture?: unknown;
  email: string;
  password: string;
  confirmPassword: string;
  accept?: boolean;
}

// export type FormField =
//   | 'name'
//   | 'age'
//   | 'gender'
//   | 'country'
//   | 'picture'
//   | 'email'
//   | 'password'
//   | 'confirmPassword'
//   | 'accept';
