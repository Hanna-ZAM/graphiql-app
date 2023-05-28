import { Drawer } from 'antd';
import React from 'react';
import { useTranslation } from 'next-i18next';

type AsideProps = {
  isOpen: boolean;
  title: string;
  data: string;
  onClose: () => void;
};

const Aside = ({ isOpen, onClose, title, data }: AsideProps) => {
  const { t } = useTranslation('common');

  return (
    <Drawer
      className="drawer"
      drawerStyle={{
        background: '#2f2fa2'
      }}
      title={t(`${title}`)}
      placement="right"
      onClose={onClose}
      open={isOpen}
    >
      <pre>{data}</pre>
    </Drawer>
  );
};

export default Aside;
