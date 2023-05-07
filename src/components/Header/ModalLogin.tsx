import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';

type ModalLoginProps = {
  modalOpen: boolean;
  showModal: (item: boolean) => void;
};

const ModalLogin = ({ modalOpen, showModal }: ModalLoginProps) => {
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    setOpen(modalOpen);
  }, [modalOpen]);

  const handleLogin = (item: boolean) => {
    setLogin(item);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      showModal(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    showModal(false);
    setTimeout(() => {
      setLogin(true);
    }, 500);
  };

  return (
    <>
      <Modal
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="modal__logo_wrapper">
          <div className="modal__logo_image"></div>
        </div>
        {login ? (
          <FormLogin setLogin={handleLogin} setModal={showModal} />
        ) : (
          <FormRegister setLogin={handleLogin} setModal={showModal} />
        )}
      </Modal>
    </>
  );
};

export default ModalLogin;
