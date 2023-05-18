import { Drawer } from 'antd';
import React from 'react';
import { useTranslation } from 'next-i18next';

type DocsProps = {
  docs: string;
  isOpen: boolean;
  onClose: () => void;
};

const Docs = ({ isOpen, onClose, docs }: DocsProps) => {
  const { t } = useTranslation('common');

  console.log(docs);

  return (
    <Drawer
      title={t('docs')}
      style={{ color: 'black' }}
      placement="right"
      onClose={onClose}
      open={isOpen}
    >
      <pre>{docs}</pre>
    </Drawer>
  );
};

export default Docs;
