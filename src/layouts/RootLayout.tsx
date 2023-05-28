import React, { createContext, useEffect, useMemo, useState } from 'react';
import Header from '../components/header/Header';
import Footer from '@components/footer/Footer';
import { AuthContextType } from '../types';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebaseConfig';
import Cookies from 'js-cookie';
import { tokenName } from '../helpers/const';

export const AuthContext = createContext<AuthContextType | null>(null);
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const router = useRouter();
  const AuthMemo = useMemo(() => ({ isLogin, setIsLogin }), [isLogin]);
  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        Cookies.set(tokenName, token, { expires: 1, path: 'path=/' });
        setIsLogin(true);
        router.replace('/main');
      } else {
        Cookies.remove(tokenName);
        setIsLogin(false);
      }
      return () => unsubscribe();
    });
  }, [auth, router]);
  return (
    <AuthContext.Provider value={AuthMemo}>
      <Header />
      <main className="main container">{children}</main>
      <Footer />
    </AuthContext.Provider>
  );
};

export default RootLayout;
