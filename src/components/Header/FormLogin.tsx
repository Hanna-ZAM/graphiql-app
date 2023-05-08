import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ILogin } from '@/types';
import { useTranslation } from 'next-i18next';

type FormLoginProps = {
  setForm: (item: boolean) => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
  setIsLogin: (item: boolean) => void;
};

const FormLogin = ({ setIsLogin, setForm, setIsModalOpen }: FormLoginProps) => {
  const { t } = useTranslation('header');
  const [form] = Form.useForm();

  const onFinish = async ({ email, password }: ILogin) => {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsLogin(true);
        sessionStorage.setItem('isLoggedIn', 'true');
        setIsModalOpen(false);
        setTimeout(() => {
          setForm(true);
        }, 500);
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          form.setFields([
            {
              name: 'email',
              errors: ['User not found']
            }
          ]);
        } else if (error.code === 'auth/wrong-password') {
          form.setFields([
            {
              name: 'password',
              errors: ['Wrong password']
            }
          ]);
        } else {
          form.setFields([
            {
              name: 'password',
              errors: ['Login failed']
            }
          ]);
        }
      });
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      form={form}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
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
        Or{' '}
        <span className="form__link" onClick={() => setForm(false)}>
          {t('register_now')}
        </span>
      </Form.Item>
    </Form>
  );
};

export default FormLogin;
