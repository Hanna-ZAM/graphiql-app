import React from 'react';
import Link from 'next/link';
import {
  faRightToBracket,
  faHouse,
  faLanguage
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Space, Tooltip } from 'antd';
import { useState } from 'react';
import ModalLogin from './ModalLogin';
import { i18n, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const Navigate = () => {
  const { t } = useTranslation('header');
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const locale = i18n?.language === 'en' ? 'RU' : 'EN';
  const showModal = (item: boolean) => {
    setOpen(item);
  };
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
          <Tooltip placement="bottomRight" title={t('login')}>
            <FontAwesomeIcon
              icon={faRightToBracket}
              className="header__nav_icon"
              onClick={() => showModal(true)}
            />
          </Tooltip>
        </Space>
      </nav>
      <ModalLogin modalOpen={open} showModal={showModal} />
    </>
  );
};

export default Navigate;
