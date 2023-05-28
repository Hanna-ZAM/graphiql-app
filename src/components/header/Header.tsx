import Link from 'next/link';
import Logo from './Logo';
import Navigate from './Navigate';
import { useEffect, useRef } from 'react';

const Header = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const checkHeaderPosition = () => {
      const currentScroll = window.pageYOffset;
      const headerHeight = getComputedStyle(
        headerRef.current as HTMLElement
      ).height;
      currentScroll > parseInt(headerHeight)
        ? headerRef.current?.classList.add('sticky')
        : headerRef.current?.classList.remove('sticky');
    };
    window.addEventListener('scroll', checkHeaderPosition);
    return () => window.removeEventListener('scroll', checkHeaderPosition);
  });
  return (
    <header className="header" ref={headerRef}>
      <div className="header__wrapper container">
        <Link href={'/'}>
          <Logo />
        </Link>
        <Navigate />
      </div>
    </header>
  );
};

export default Header;
