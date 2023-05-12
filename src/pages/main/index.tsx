import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function MainPage() {
  return <>Main page</>;
}

export async function getStaticProps({ locale }: { locale: string }) {
  const lang = locale ?? 'en';
  return {
    props: {
      ...(await serverSideTranslations(lang, ['common', 'header']))
    }
  };
}
