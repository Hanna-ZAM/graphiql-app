import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Welcome from '@/components/welcome/Welcome';

export default function HomePage() {
  return <Welcome />;
}

export async function getStaticProps({ locale }: { locale: string }) {
  const lang = locale ?? 'en';
  return {
    props: {
      ...(await serverSideTranslations(lang, ['common', 'welcome']))
    }
  };
}
