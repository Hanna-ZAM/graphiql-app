import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/footer/Footer';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="main container">{children}</main>
      <Footer />
    </>
  );
};

export default RootLayout;
