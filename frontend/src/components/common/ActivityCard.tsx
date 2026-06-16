import { Card, Space, Typography } from 'antd';
import { Activity } from '../../types/entities';
import { OFFSET_CATEGORIES } from '../../constants/activity';
import { formatCarbon, formatDate } from '../../utils/formatters';
import { CategoryBadge } from './CategoryBadge';

export function ActivityCard({ activity }: { activity: Activity }) {
  const isOffset = OFFSET_CATEGORIES.has(activity.category);
  const carbonNum = Number(activity.carbonValue);
  return (
    <Card className="activity-card" size="small">
      <Space direction="vertical" size={6} style={{ width: '100%' }}>
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <CategoryBadge category={activity.category} />
          <Typography.Text strong style={{ color: isOffset ? '#52c41a' : carbonNum > 0 ? '#cf1322' : undefined }}>
            {formatCarbon(activity.carbonValue)}
          </Typography.Text>
        </Space>
        <Typography.Text>{activity.subType} · {Number(activity.amount).toFixed(2)} {activity.unit}</Typography.Text>
        <div className="split-line">
          <span>{formatDate(activity.recordDate)}</span>
          <span>{activity.note || '无备注'}</span>
        </div>
      </Space>
    </Card>
  );
}

