import React from 'react';
import Header from '@/components/Header';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default RootLayout;
