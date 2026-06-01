import { useState } from 'react'
import { Form, Input, Button, Card, message, Space, Typography } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { useAuth } from '../hooks/useAuth'
import styles from '../styles/auth.module.css'
import { useNavigate } from 'react-router-dom'

const { Title, Text } = Typography

export const RegisterForm = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { register, isLoading } = useAuth()
  const [error, setError] = useState<string>('')

  const onFinish = async (values: { email: string; password: string; confirmPassword: string }) => {
    if (values.password !== values.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      setError('')
      await register(values.email, values.password)
      message.success('Registration successful! Please login.')
      navigate('/login')
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Registration failed'
      setError(errorMsg)
      message.error(errorMsg)
    }
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={2} style={{ textAlign: 'center', margin: 0 }}>
            Price Matcher
          </Title>
          <Text type="secondary" style={{ display: 'block', textAlign: 'center' }}>
            Create your account
          </Text>

          <Form form={form} onFinish={onFinish} layout="vertical" autoComplete="off">
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Invalid email format' },
              ]}
            >
              <Input 
                prefix={<MailOutlined />} 
                placeholder="Email"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: 'Please confirm your password!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
                size="large"
              />
            </Form.Item>

            {error && (
              <Form.Item>
                <Text type="danger">{error}</Text>
              </Form.Item>
            )}

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large" 
                block
                loading={isLoading}
              >
                Register
              </Button>
            </Form.Item>

            <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
              <Space>
                <Text>Already have an account?</Text>
                <Button 
                  type="link" 
                  onClick={() => navigate('/login')}
                  disabled={isLoading}
                >
                  Login here
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  )
}
