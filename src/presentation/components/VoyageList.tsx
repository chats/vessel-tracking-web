import { List, Tag, Collapse, Descriptions, Spin, Alert, Button } from 'antd';
import { ReloadOutlined, EnvironmentOutlined, DashboardOutlined } from '@ant-design/icons';
import { VoyageData, Checkpoint, GpsTrack } from '../../domain/entities/Voyage';
import { formatDateTime } from '../../shared/utils/dateUtils';
import { STATUS_CONFIG } from '../../shared/constants/statusConfig';

interface VoyageListProps {
  voyages: VoyageData[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export const VoyageList = ({ voyages, loading, error, onRefresh }: VoyageListProps) => {
  const sortByTimestamp = <T extends { timestamp: string }>(items: T[]): T[] => {
    return [...items].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  };

  const renderCheckpoints = (checkpoints: Checkpoint[]) => {
    const sorted = sortByTimestamp(checkpoints);
    return (
      <List
        size="small"
        dataSource={sorted}
        renderItem={(checkpoint) => (
          <List.Item>
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <EnvironmentOutlined style={{ color: '#1890ff' }} />
                <strong>{checkpoint.description}</strong>
              </div>
              <Descriptions size="small" column={2} style={{ marginTop: 8 }}>
                <Descriptions.Item label="เวลา">{formatDateTime(checkpoint.timestamp)}</Descriptions.Item>
                <Descriptions.Item label="ตำแหน่ง">
                  {checkpoint.location.latitude.toFixed(4)}, {checkpoint.location.longitude.toFixed(4)}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </List.Item>
        )}
      />
    );
  };

  const renderGpsTracks = (tracks: GpsTrack[]) => {
    const sorted = sortByTimestamp(tracks);
    return (
      <List
        size="small"
        dataSource={sorted}
        renderItem={(track) => (
          <List.Item>
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <DashboardOutlined style={{ color: '#52c41a' }} />
                <strong>GPS Tracking</strong>
              </div>
              <Descriptions size="small" column={3} style={{ marginTop: 8 }}>
                <Descriptions.Item label="เวลา">{formatDateTime(track.timestamp)}</Descriptions.Item>
                <Descriptions.Item label="ความเร็ว">{track.speed} knots</Descriptions.Item>
                <Descriptions.Item label="ทิศทาง">{track.heading}°</Descriptions.Item>
                <Descriptions.Item label="ตำแหน่ง" span={3}>
                  {track.location.latitude.toFixed(4)}, {track.location.longitude.toFixed(4)}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </List.Item>
        )}
      />
    );
  };

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
  }

  if (error) {
    return <Alert message="เกิดข้อผิดพลาด" description={error} type="error" showIcon />;
  }

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>รายการเดินเรือทั้งหมด ({voyages.length})</h2>
        <Button icon={<ReloadOutlined />} onClick={onRefresh}>รีเฟรช</Button>
      </div>
      <List
        dataSource={voyages}
        renderItem={(voyageData) => {
          const { voyage, checkpoints, gps_tracks } = voyageData;
          const statusConfig = STATUS_CONFIG[voyage.status];

          return (
            <List.Item style={{ display: 'block', marginBottom: 16 }}>
              <div style={{ background: '#fff', padding: 16, borderRadius: 8, border: '1px solid #d9d9d9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div>
                    <h3 style={{ margin: 0 }}>{voyage.ship_name} ({voyage.ship_id})</h3>
                    <p style={{ margin: '4px 0', color: '#666' }}>
                      {voyage.departure_port} → {voyage.arrival_port}
                    </p>
                  </div>
                  <Tag color={statusConfig.color} style={{ fontSize: 14, padding: '4px 12px' }}>
                    {statusConfig.icon} {statusConfig.text}
                  </Tag>
                </div>

                <Descriptions size="small" column={2} bordered>
                  <Descriptions.Item label="Voyage ID">{voyage.voyage_id}</Descriptions.Item>
                  <Descriptions.Item label="สถานะ">
                    <Tag color={statusConfig.color}>{statusConfig.text}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="เวลาออกเดินทาง">{formatDateTime(voyage.departure_time)}</Descriptions.Item>
                  <Descriptions.Item label="เวลาถึงจุดหมาย">{formatDateTime(voyage.arrival_time)}</Descriptions.Item>
                </Descriptions>

                <Collapse
                  style={{ marginTop: 16 }}
                  items={[
                    {
                      key: 'checkpoints',
                      label: `Checkpoints (${checkpoints.length})`,
                      children: checkpoints.length > 0 ? renderCheckpoints(checkpoints) : <p>ไม่มีข้อมูล</p>,
                    },
                    {
                      key: 'gps',
                      label: `GPS Tracking (${gps_tracks.length})`,
                      children: gps_tracks.length > 0 ? renderGpsTracks(gps_tracks) : <p>ไม่มีข้อมูล</p>,
                    },
                  ]}
                />
              </div>
            </List.Item>
          );
        }}
      />
    </div>
  );
};
