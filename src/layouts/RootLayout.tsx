import React, { createContext, useEffect, useMemo, useState } from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { AuthContextType } from '@/types';
import { useRouter } from 'next/router';

export const AuthContext = createContext<AuthContextType | null>(null);

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const router = useRouter();
  const AuthMemo = useMemo(() => ({ isLogin, setIsLogin }), [isLogin]);
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      setIsLogin(true);
    }
  }, []);
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn) return;
    router.replace('/');
  }, [router, isLogin]);
  return (
    <AuthContext.Provider value={AuthMemo}>
      <Header />
      <main className="main container">{children}</main>
      <Footer />
    </AuthContext.Provider>
  );
};

export default RootLayout;
