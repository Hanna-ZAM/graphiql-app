import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useTranslation } from 'next-i18next';

type FormLoginProps = {
  setLogin: (item: boolean) => void;
  setModal: (item: boolean) => void;
};

const FormLogin = ({ setLogin, setModal }: FormLoginProps) => {
  const { t } = useTranslation('header');
  const onFinish = (values: any) => {
    setModal(false);
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: t('email_error') ?? '' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder={t('email') ?? ''}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: t('password_error') ?? '' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder={t('password') ?? ''}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          {t('login')}
        </Button>
        {t('or')}
        <span className="form__link" onClick={() => setLogin(false)}>
          {t('register_now')}
        </span>
      </Form.Item>
    </Form>
  );
};

export default FormLogin;
