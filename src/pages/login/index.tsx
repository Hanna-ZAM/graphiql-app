import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import FormLogin from '../../components/auth/FormLogin';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { tokenName } from '../../helpers/const';

export default function LoginPage() {
  return (
    <div>
      <div className="auth-wrapper">
        <div className="auth-image"></div>
        <FormLogin />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { req, locale } = ctx;
  const token = req.cookies[tokenName];
  const translations = await serverSideTranslations(locale ?? 'en', [
    'header',
    'common'
  ]);
  if (token) {
    return {
      redirect: {
        permanent: false,
        destination: '/main'
      }
    };
  }
  return {
    props: {
      ...translations
    }
  };
};
