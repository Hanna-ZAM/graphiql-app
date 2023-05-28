import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'antd';

const Login = () => {
  const { t } = useTranslation('header');
  return (
    <Link href={'/login'}>
      <Tooltip placement="bottomRight" title={t('login')}>
        <FontAwesomeIcon icon={faUser} className="header__nav_icon" />
      </Tooltip>
    </Link>
  );
};

export default Login;
