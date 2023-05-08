import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import { useTranslation } from 'next-i18next';

const { Option } = Select;

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
  setLogin: (item: boolean) => void;
  setModal: (item: boolean) => void;
};

const FormRegister = ({ setLogin, setModal }: FormRegisterProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation('header');
  const onFinish = (values: any) => {
    setModal(false);
    setTimeout(() => {
      setLogin(true);
    }, 500);
    console.log('Received values of form: ', values);
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
        label="E-mail"
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
        label="Password"
        rules={[
          {
            required: true,
            message: t('password_error') ?? ''
          }
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
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
        <span className="form__link" onClick={() => setLogin(true)}>
          {t('login')}
        </span>
      </Form.Item>
    </Form>
  );
};

export default FormRegister;
