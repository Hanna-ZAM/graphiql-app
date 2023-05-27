import React from 'react';
import { useRouter } from 'next/router';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ILogin } from '../../types';
import { useTranslation } from 'next-i18next';

const FormLogin = () => {
  const { t } = useTranslation('header');
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish = async ({ email, password }: ILogin) => {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password).catch((error) => {
      if (error.code === 'auth/user-not-found') {
        form.setFields([
          {
            name: 'email',
            errors: [t('user_not_found') ?? '']
          }
        ]);
      } else if (error.code === 'auth/wrong-password') {
        form.setFields([
          {
            name: 'password',
            errors: [t('wrong_password') ?? '']
          }
        ]);
      } else {
        form.setFields([
          {
            name: 'password',
            errors: [t('login_failed') ?? '']
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
        {t('or')}
        <span className="form__link" onClick={() => router.push('/register')}>
          {t('register_now')}
        </span>
      </Form.Item>
    </Form>
  );
};

export default FormLogin;
