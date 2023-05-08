import React, { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import RootLayout from '@/layouts/RootLayout';
import './global.scss';
import { config } from '@fortawesome/fontawesome-svg-core';
import { appWithTranslation } from 'next-i18next';
config.autoAddCss = false;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <RootLayout>{getLayout(<Component {...pageProps} />)}</RootLayout>;
}

export default appWithTranslation(MyApp);
