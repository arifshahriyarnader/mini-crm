export interface SignupData {
    name: string;
    email: string;
    password: string;
  }


export interface LoginData {
    type: "email" | "refresh";
    email?: string;
    password?: string;
    refreshToken?: string;
  }

  export interface AuthUser {
    user: {
      _id: string;
      name: string;
      email: string;
      role: string;
    };
    accessToken: string;
    refreshToken: string;
  }