import { useTranslation } from 'next-i18next';
import { faDoorClosed, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'antd';
import React, { useState } from 'react';

const Logout = ({ showConfirm }: { showConfirm: () => void }) => {
  const { t } = useTranslation('header');
  const [isHover, setIsHover] = useState<boolean>(false);
  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);
  const icon = isHover ? faDoorOpen : faDoorClosed;
  return (
    <Tooltip placement="bottomRight" title={t('logout')}>
      <FontAwesomeIcon
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        icon={icon}
        className="header__nav_icon"
        onClick={showConfirm}
      />
    </Tooltip>
  );
};

export default Logout;
