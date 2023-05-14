import React from 'react';
import RssLogo from '../../assets/rs_school.svg';
import FooterLink from './FooterLink';
import Link from 'next/link';

const Footer = () => {
  const TEAMMATES_GITHUB = [
    {
      id: 1,
      link: 'https://github.com/kanoplich'
    },
    {
      id: 2,
      link: 'https://github.com/hanna-zam'
    },
    {
      id: 3,
      link: 'https://github.com/chizhovmn'
    }
  ];
  return (
    <footer className="footer">
      <div className="container">
        <div className="team">
          {TEAMMATES_GITHUB.map((person) => (
            <FooterLink link={person.link} key={person.id} />
          ))}
        </div>
        2023
        <Link
          className={'footer-icon rss-school'}
          href="https://rs.school/"
          target={'_blank'}
        >
          <RssLogo />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
