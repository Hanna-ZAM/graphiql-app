import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  faRightToBracket,
  faRightFromBracket,
  faHouse,
  faLanguage
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Space, Tooltip, Modal } from 'antd';
import { useState } from 'react';
import ModalLogin from './ModalLogin';
import { i18n, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const { confirm } = Modal;

const Navigate = () => {
  const [languageTooltip, setLanguageTooltip] = useState('RU');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { t } = useTranslation('header');
  const router = useRouter();
  const locale = i18n?.language === 'en' ? 'RU' : 'EN';

  const handleClickLanguage = () => {
    setLanguageTooltip(languageTooltip === 'EN' ? 'RU' : 'EN');
  };

  const handleClickModal = () => {
    setIsModalOpen(true);
  };

  const showConfirm = () => {
    confirm({
      title: 'Do you want to log out?',
      onOk() {
        sessionStorage.setItem('isLoggedIn', '');
        setIsLogin(false);
      }
    });
  };

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      setIsLogin(true);
    }
  }, []);

  return (
    <>
      <nav>
        <Space size="middle">
          <Link href={'/main'}>
            <Tooltip placement="bottomLeft" title={t('home')}>
              <FontAwesomeIcon icon={faHouse} className="header__nav_icon" />
            </Tooltip>
          </Link>

          <Tooltip placement="bottom" title={locale}>
            <Link href={router.asPath} locale={locale.toLowerCase()}>
              <FontAwesomeIcon icon={faLanguage} className="header__nav_icon" />
            </Link>
          </Tooltip>
          {isLogin ? (
            <Tooltip placement="bottomRight" title={t('logout')}>
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className="header__nav_icon"
                onClick={showConfirm}
              />
            </Tooltip>
          ) : (
            <Tooltip placement="bottomRight" title={t('login')}>
              <FontAwesomeIcon
                icon={faRightToBracket}
                className="header__nav_icon"
                onClick={handleClickModal}
              />
            </Tooltip>
          )}
        </Space>
      </nav>
      <ModalLogin
        setIsLogin={setIsLogin}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
    </>
  );
};

export default Navigate;
