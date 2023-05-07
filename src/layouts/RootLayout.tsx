import React from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
};

export default RootLayout;
