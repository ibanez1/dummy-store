export interface Login {
    username: string,
    password: string
  }

  export interface LoginReponse {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    token: string;
  }