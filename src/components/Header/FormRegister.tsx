import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { ILogin } from '@/types';

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
  setForm: (item: boolean) => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
  setIsLogin: (item: boolean) => void;
};

const FormRegister = ({
  setIsLogin,
  setForm,
  setIsModalOpen
}: FormRegisterProps) => {
  const [form] = Form.useForm();

  const onFinish = async ({ email, password }: ILogin) => {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsLogin(true);
        sessionStorage.setItem('isLoggedIn', 'true');
        setIsModalOpen(false);
        setTimeout(() => {
          setForm(true);
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
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!'
          },
          {
            required: true,
            message: 'Please input your E-mail!'
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
            message: 'Please input your password!'
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
            message: 'Please confirm your password!'
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The two passwords that you entered do not match!')
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
                : Promise.reject(new Error('Should accept agreement'))
          }
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>I have read the agreement</Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
        Or{' '}
        <span className="form__link" onClick={() => setForm(true)}>
          log in!
        </span>
      </Form.Item>
    </Form>
  );
};

export default FormRegister;
