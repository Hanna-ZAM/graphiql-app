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

const Navigate = () => {
  const [languageTooltip, setLanguageTooltip] = useState('RU');
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setLanguageTooltip(languageTooltip === 'EN' ? 'RU' : 'EN');
  };

  const showModal = (item: boolean) => {
    setOpen(item);
  };

  return (
    <>
      <nav>
        <Space size="middle">
          <Link href={'/main'}>
            <Tooltip placement="bottomLeft" title="Home">
              <FontAwesomeIcon icon={faHouse} className="header__nav_icon" />
            </Tooltip>
          </Link>
          <Tooltip placement="bottom" title={languageTooltip}>
            <FontAwesomeIcon
              icon={faLanguage}
              className="header__nav_icon"
              onClick={handleClick}
            />
          </Tooltip>
          <Tooltip placement="bottomRight" title="Log In">
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
