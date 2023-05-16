import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import FormRegister from '@/components/auth/FormRegister';
import { getAuth } from 'firebase/auth';
import app from '@/firebaseConfig';

export default function RegisterPage() {
  return (
    <div>
      <div className="auth-wrapper">
        <div className="auth-image"></div>
        <FormRegister />
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  const lang = locale ?? 'en';
  const auth = getAuth(app).currentUser;
  if (auth) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(lang, ['common', 'header']))
    }
  };
}
