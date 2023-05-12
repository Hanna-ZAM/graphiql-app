import React, { createContext, useEffect, useMemo, useState } from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { AuthContextType } from '@/types';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '@/firebaseConfig';

const auth = getAuth(app);

export const AuthContext = createContext<AuthContextType | null>(null);
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const router = useRouter();
  const AuthMemo = useMemo(() => ({ isLogin, setIsLogin }), [isLogin]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
        router.replace('/main');
      } else {
        setIsLogin(false);
        router.replace('/');
      }
      return () => unsubscribe();
    });
  }, []);
  return (
    <AuthContext.Provider value={AuthMemo}>
      <Header />
      <main className="main container">{children}</main>
      <Footer />
    </AuthContext.Provider>
  );
};

export default RootLayout;
