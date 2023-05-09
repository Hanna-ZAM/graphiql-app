import React, { useContext } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useTranslation } from 'next-i18next';
import { FormView, ILogin } from '@/types';
import useAuth from '@/hooks/useAuth';
import { NavigateContext } from './Navigate';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

type FormRegisterProps = {
  setForm: (item: FormView) => void;
};

const FormRegister = ({ setForm }: FormRegisterProps) => {
  const { t } = useTranslation('header');
  const [form] = Form.useForm();

  const onFinish = async ({ email, password }: ILogin) => {
    const auth = getAuth();
    const { setIsLogin } = useAuth();
    const modalContext = useContext(NavigateContext);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsLogin(true);
        sessionStorage.setItem('isLoggedIn', 'true');
        modalContext?.setIsModalOpen(false);
        setTimeout(() => {
          setForm('login');
        }, 500);
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          form.setFields([
            {
              name: 'email',
              errors: ['This email is already registered']
            }
          ]);
        } else {
          form.setFields([
            {
              name: 'password',
              errors: ['Registration failed']
            }
          ]);
        }
      });
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label={t('email')}
        rules={[
          {
            type: 'email',
            message: t('email_invalid') ?? ''
          },
          {
            required: true,
            message: t('email_error') ?? ''
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label={t('password')}
        rules={[
          {
            required: true,
            message: t('password_error') ?? ''
          },
          {
            min: 8,
            message: t('password_long') ?? ''
          },
          {
            pattern:
              /(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])(?=.*[^\da-zA-Z]).*/,
            message: t('password_contain') ?? ''
          }
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label={t('confirm')}
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: t('password_confirm') ?? ''
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(t('password_confirm_error') ?? '')
              );
            }
          })
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error(t('agreement_error') ?? ''))
          }
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>{t('agreement')}</Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          {t('register_form')}
        </Button>
        Or{' '}
        <span className="form__link" onClick={() => setForm('login')}>
          {t('login')}
        </span>
      </Form.Item>
    </Form>
  );
};

export default FormRegister;
