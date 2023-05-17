import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Editor from '@/components/editor/Editor';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { tokenName } from '@/helpers/const';

export default function MainPage() {
  return (
    <div>
      <Editor />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { req, locale } = ctx;
  const translations = await serverSideTranslations(locale ?? 'en', [
    'header',
    'common'
  ]);
  const token = req.cookies[tokenName];
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    };
  }
  return {
    props: {
      ...translations
    }
  };
};
