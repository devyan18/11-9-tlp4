declare namespace Express {
  export interface Request {
    user: {
      id: string;
      username: string;
      email: string;
      password: string;
    };
  }
  export interface Response {
    user: {
      id: string;
      username: string;
      email: string;
      password: string;
    };
  }
}
