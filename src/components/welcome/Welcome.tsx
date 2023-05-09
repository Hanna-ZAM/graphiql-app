import React from 'react';
import GraphqlLogo from '../../assets/graphql_logo.svg';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const Welcome = () => {
  const { t } = useTranslation('welcome');
  return (
    <section className="welcome">
      <h2 className="welcome-header">{t('welcome_header')}</h2>
      <hr />
      <div className="welcome-main container">
        <GraphqlLogo className="welcome-logo" />
        <p className="welcome-text">
          <Link href={'https://graphql.org/'} target="_blank">
            <i>GraphQL</i>
          </Link>
          {t('welcome_text')}
        </p>
      </div>
    </section>
  );
};

export default Welcome;
