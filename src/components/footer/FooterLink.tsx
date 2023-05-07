import React from 'react';
import Link from 'next/link';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FooterLink = ({ link }: { link: string }) => {
  return (
    <Link href={link} target={'_blank'}>
      <FontAwesomeIcon icon={faGithubAlt} className="footer-icon github" />
    </Link>
  );
};

export default FooterLink;
