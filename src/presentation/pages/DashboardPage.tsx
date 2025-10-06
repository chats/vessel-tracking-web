import { Layout, Button, Space, Avatar } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { VoyageList } from '../components/VoyageList';
import { useVoyages } from '../../application/usecases/useVoyages';
import type { User } from '../../domain/entities/User';

const { Header, Content } = Layout;

interface DashboardPageProps {
  user: User;
  onLogout: () => void;
}

export const DashboardPage = ({ user, onLogout }: DashboardPageProps) => {
  const { voyages, loading, error, refetch } = useVoyages();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#fff', margin: 0 }}>🚢 (POC) ระบบติดตามการเดินเรือ</h1>
        <Space>
          <Avatar icon={<UserOutlined />} />
          <span style={{ color: '#fff' }}>{user.name} ({user.role})</span>
          <Button icon={<LogoutOutlined />} onClick={onLogout}>ออกจากระบบ</Button>
        </Space>
      </Header>
      <Content style={{ padding: 24, background: '#f0f2f5' }}>
        <VoyageList voyages={voyages} loading={loading} error={error} onRefresh={refetch} />
      </Content>
    </Layout>
  );
};
