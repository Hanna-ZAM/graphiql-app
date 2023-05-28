import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Welcome from '../components/welcome/Welcome';

export default function HomePage(/*{ props }: { props: GetServerSideProps }*/) {
  return <Welcome />;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const locale = ctx.locale;
  const translations = await serverSideTranslations(locale ?? 'en', [
    'header',
    'welcome'
  ]);
  return {
    props: {
      ...translations
    }
  };
};
