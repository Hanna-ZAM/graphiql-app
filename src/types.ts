export interface ILogin {
  email: string;
  password: string;
}
export type FormView = 'register' | 'login';

export type AuthContextType = {
  isLogin: boolean;
  setIsLogin: (value: React.SetStateAction<boolean>) => void;
};

export type NavigateContextType = {
  isModalOpen: boolean;
  setIsModalOpen: (value: React.SetStateAction<boolean>) => void;
};
