import React, { useContext, useState } from 'react';
import { Modal } from 'antd';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';
import { FormView } from '@/types';
import { NavigateContext } from './Navigate';
const ModalLogin = () => {
  const [formType, setFormType] = useState<FormView>('login');
  const modalContext = useContext(NavigateContext);
  const handleCancel = () => {
    modalContext?.setIsModalOpen(false);
    setFormType('login');
  };

  const handleForm = (isForm: FormView) => {
    setFormType(isForm);
  };
  const FORM_VIEW = {
    login: FormLogin,
    register: FormRegister
  };
  const FormElement = FORM_VIEW[formType];
  return (
    <>
      <Modal
        open={modalContext?.isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="modal__logo_wrapper">
          <div className="modal__logo_image"></div>
        </div>
        <FormElement setForm={handleForm} />
      </Modal>
    </>
  );
};

export default ModalLogin;
