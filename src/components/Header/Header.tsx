import Link from 'next/link';
import Logo from './Logo';
import Navigate from './Navigate';

const Header = () => {
  return (
    <header className="header container">
      <div className="header__wrapper">
        <Link href={'/'}>
          <Logo />
        </Link>
        <Navigate />
      </div>
    </header>
  );
};

export default Header;
