import { useState, useEffect } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import {
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import { loginApi } from '../../services/auth';

const Login = ({ store }) => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const [credential, setCredential] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    console.log('mystore: ', store);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredential((prevCredential) => ({
      ...prevCredential,
      [name]: value,
    }));
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    loginApi(credential)
      .then((res) => {
        if (res.data.code === 200) {
          console.log('login: ', res.data.code);
          store.loginWithDataTokenAndProfile(res.data.data);
          navigate('/dashboard');
        }
      })
      .catch((err) => {
        console.log('login: ');
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-[350px]">
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'Please enter a valid email address',
                },
                {
                  required: true,
                  message: 'Please enter your email address',
                },
              ]}
            >
              <Input
                prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                name="email"
                placeholder="Email Address"
                size="large"
                value={credential.email}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                name="password"
                placeholder="Password"
                size="large"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                value={credential.password}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a className=" float-right" href="">
                Forgot password
              </a>
            </Form.Item>
            <Form.Item>
              <Button
                className=" w-full bg-[#1677ff] text-white font-bold py-2 px-4  rounded"
                type="primary"
                htmlType="submit"
                size="large"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
          <div className="mt-3">
            <Link
              to="/register"
              className=" float-right text-[14px] hover:text-[#69b1ff]"
            >
              Or register now!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(inject('store')(Login));
// export default Login;
