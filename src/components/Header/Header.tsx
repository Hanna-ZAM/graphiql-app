import Link from 'next/link';
import Logo from './Logo';

const Header = () => {
  return (
    <header className="header container">
      <Link href={'/welcome'}>
        <Logo />
      </Link>
      <nav>
        <Link href={'/main'}>go to main</Link>
      </nav>
    </header>
  );
};

export default Header;
