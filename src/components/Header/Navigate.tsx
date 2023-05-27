import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  faHouse,
  faLanguage,
  faUserPen
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Space, Tooltip, Modal } from 'antd';
import { i18n, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';
import { getAuth, signOut } from 'firebase/auth';
import app from '@/firebaseConfig';
import Logout from './Logout';
import Login from './Login';
import { getCookie } from 'cookies-next';
import { tokenName } from '@/helpers/const';

const { confirm } = Modal;
const auth = getAuth(app);

const Navigate = () => {
  const { isLogin, setIsLogin } = useAuth();
  const { t } = useTranslation('header');
  const router = useRouter();
  const locale = i18n?.language === 'en' ? 'RU' : 'EN';
  const showConfirm = () => {
    confirm({
      title: t('logout_msg'),
      onOk() {
        setIsLogin(false);
        signOut(auth);
        router.replace('/');
      }
    });
  };

  useEffect(() => {
    const token = getCookie(tokenName) ? true : false;
    setIsLogin(token);
  }, [isLogin, setIsLogin]);

  return (
    <nav>
      <Space size="middle">
        <Tooltip placement="bottom" title={locale}>
          <Link href={router.asPath} locale={locale.toLowerCase()}>
            <FontAwesomeIcon icon={faLanguage} className="header__nav_icon" />
          </Link>
        </Tooltip>
        {isLogin ? (
          <>
            <Link href={'/main'}>
              <Tooltip placement="bottomLeft" title={t('home')}>
                <FontAwesomeIcon icon={faHouse} className="header__nav_icon" />
              </Tooltip>
            </Link>
            <Logout showConfirm={showConfirm} />
          </>
        ) : (
          <>
            <Login />
            <Link href={'/register'}>
              <Tooltip placement="bottomRight" title={t('register')}>
                <FontAwesomeIcon
                  icon={faUserPen}
                  className="header__nav_icon"
                />
              </Tooltip>
            </Link>
          </>
        )}
      </Space>
    </nav>
  );
};

export default Navigate;
