import { useContext } from 'react';
import { AuthContext } from '../layouts/RootLayout';
import { AuthContextType } from '../types';

const useAuth = () => {
  const { isLogin, setIsLogin } = useContext(AuthContext) as AuthContextType;
  return { isLogin, setIsLogin };
};

export default useAuth;
