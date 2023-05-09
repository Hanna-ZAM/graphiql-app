import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';

type ModalLoginProps = {
  isModalOpen: boolean;
  setIsLogin: (isLogin: boolean) => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
};

const ModalLogin = ({
  isModalOpen,
  setIsModalOpen,
  setIsLogin
}: ModalLoginProps) => {
  const [isForm, setIsForm] = useState(true);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleForm = (isForm: boolean) => {
    setIsForm(isForm);
  };

  return (
    <>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <div className="modal__logo_wrapper">
          <div className="modal__logo_image"></div>
        </div>
        {isForm ? (
          <FormLogin
            setIsLogin={setIsLogin}
            setForm={handleForm}
            setIsModalOpen={setIsModalOpen}
          />
        ) : (
          <FormRegister
            setIsLogin={setIsLogin}
            setForm={handleForm}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </Modal>
    </>
  );
};

export default ModalLogin;
