import React from 'react';
export interface ILogin {
  email: string;
  password: string;
}
export type FormView = 'register' | 'login';
type fn = (value: React.SetStateAction<boolean>) => void;

export type AuthContextType = {
  isLogin: boolean;
  setIsLogin: fn;
};
export interface IError {
  response: {
    errors: Array<string>;
    status: number;
  };
}
