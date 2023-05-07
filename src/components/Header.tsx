import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <Link href={'/main'}>go to main</Link>
      </nav>
    </header>
  );
};

export default Header;
