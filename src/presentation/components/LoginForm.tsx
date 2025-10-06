import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

interface LoginFormProps {
  onLogin: (username: string, password: string) => boolean;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: { username: string; password: string }) => {
    const success = onLogin(values.username, values.password);
    if (success) {
      message.success('เข้าสู่ระบบสำเร็จ');
    } else {
      message.error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
      <Card title="เข้าสู่ระบบ - ระบบติดตามการเดินเรือ" style={{ width: 400 }}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'กรุณากรอกชื่อผู้ใช้' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="ชื่อผู้ใช้" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="รหัสผ่าน" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              เข้าสู่ระบบ
            </Button>
          </Form.Item>
        </Form>
        <div style={{ marginTop: 16, fontSize: 12, color: '#888' }}>
          <p>ผู้ใช้ทดสอบ:</p>
          <p>captain1 / pass123</p>
          <p>admin / admin123</p>
        </div>
      </Card>
    </div>
  );
};
