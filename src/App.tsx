import { useAuth } from './application/usecases/useAuth';
import { LoginForm } from './presentation/components/LoginForm';
import { DashboardPage } from './presentation/pages/DashboardPage';
import { Spin } from 'antd';

function App() {
  const { user, loading, login, logout } = useAuth();

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '50vh auto' }} />;
  }

  if (!user) {
    return <LoginForm onLogin={login} />;
  }

  return <DashboardPage user={user} onLogout={logout} />;
}

export default App;
