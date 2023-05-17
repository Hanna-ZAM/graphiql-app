import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useTranslation } from 'next-i18next';
import { ILogin } from '@/types';
import { useRouter } from 'next/router';

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

const FormRegister = () => {
  const { t } = useTranslation('header');
  const [form] = Form.useForm();
  const auth = getAuth();
  const router = useRouter();

  const onFinish = async ({ email, password }: ILogin) => {
    await createUserWithEmailAndPassword(auth, email, password).catch(
      (error) => {
        if (error.code === 'auth/email-already-in-use') {
          form.setFields([
            {
              name: 'email',
              errors: [t('register_failed_email') ?? '']
            }
          ]);
        } else {
          form.setFields([
            {
              name: 'password',
              errors: [t('register_failed') ?? '']
            }
          ]);
        }
      }
    );
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      scrollToFirstError
      className="register-form"
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
        {t('or')}
        <span className="form__link" onClick={() => router.push('/login')}>
          {t('login')}
        </span>
      </Form.Item>
    </Form>
  );
};

export default FormRegister;
