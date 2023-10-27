import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { signUpApi } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [credential, setCredential] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredential((prevCredential) => ({
      ...prevCredential,
      [name]: value,
    }));
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    signUpApi(credential)
      .then((res) => {
        if (res.data.code === 200) {
          console.log('signup: ', res.data);
          navigate('/login');
        }
      })
      .catch((err) => console.log('signup: ', err));
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
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                name="username"
                placeholder="Username"
                size="large"
                onChange={handleChange}
              />
            </Form.Item>
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
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Button
                className=" w-full bg-[#1677ff] text-white font-bold py-2 px-4  rounded"
                type="primary"
                htmlType="submit"
                size="large"
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
          <div className="mt-3">
            <Link
              to="/login"
              className=" float-right text-[14px] hover:text-[#69b1ff]"
            >
              Or sign in now!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
