import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

type FormLoginProps = {
  setLogin: (item: boolean) => void;
  setModal: (item: boolean) => void;
};

const FormLogin = ({ setLogin, setModal }: FormLoginProps) => {
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
        rules={[{ required: true, message: 'Please input your Email!' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or{' '}
        <span className="form__link" onClick={() => setLogin(false)}>
          register now!
        </span>
      </Form.Item>
    </Form>
  );
};

export default FormLogin;
