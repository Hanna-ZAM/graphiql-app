import React, { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import RootLayout from '@/layouts/RootLayout';
import './global.scss';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <RootLayout>{getLayout(<Component {...pageProps} />)}</RootLayout>;
}
