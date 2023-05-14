import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Editor from '@/components/editor/Editor';

export default function MainPage() {
  return (
    <div>
      <Editor />
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  const lang = locale ?? 'en';
  return {
    props: {
      ...(await serverSideTranslations(lang, ['common', 'header']))
    }
  };
}
