import { useEffect, useState } from 'react';
import { Avatar, Card, List, Select, Space, Typography } from 'antd';
import { TrophyOutlined } from '@ant-design/icons';
import { fetchRanking } from '../api/ranking';
import { EmptyState } from '../components/common/EmptyState';
import { RankingItem } from '../types/entities';
import { formatCarbon } from '../utils/formatters';
import { useAuth } from '../hooks/useAuth';

export function Ranking() {
  const [region, setRegion] = useState<string | undefined>();
  const [rows, setRows] = useState<RankingItem[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;
    void fetchRanking({ region }).then(setRows);
  }, [region, token]);

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <div>
        <Typography.Title level={2}>排行榜</Typography.Title>
        <Typography.Text type="secondary">按净排放量从低到高排序，净排放越低排名越靠前。</Typography.Text>
      </div>
      <Select allowClear placeholder="按地区筛选" value={region} onChange={setRegion} style={{ width: 220 }} options={['Shanghai', 'Hangzhou', 'Beijing'].map((value) => ({ value, label: value }))} />
      <Card>
        {rows.length ? (
          <List
            dataSource={rows}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar || undefined}>{item.rank}</Avatar>}
                  title={
                    <Space>
                      <TrophyOutlined />#{item.rank} {item.username}
                      <Typography.Text strong style={{ color: item.totalCarbon < 0 ? '#52c41a' : '#cf1322' }}>
                        净排放 {formatCarbon(item.totalCarbon)}
                      </Typography.Text>
                    </Space>
                  }
                  description={
                    <Space>
                      <span>{item.region}</span>
                      <span>排放 {formatCarbon(item.totalEmission ?? 0)}</span>
                      <span>抵消 {formatCarbon(item.totalOffset ?? 0)}</span>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        ) : <EmptyState text="暂无排行榜数据" />}
      </Card>
    </Space>
  );
}
