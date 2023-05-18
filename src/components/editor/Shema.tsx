import { Drawer } from 'antd';
import React from 'react';
import { useTranslation } from 'next-i18next';

type SchemaProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Schema = ({ isOpen, onClose }: SchemaProps) => {
  const { t } = useTranslation('common');

  return (
    <Drawer
      title={t('schema')}
      placement="right"
      onClose={onClose}
      open={isOpen}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};

export default Schema;
