import { useMemo } from 'react';
import dayjs from 'dayjs';
import { OFFSET_CATEGORIES } from '../constants/activity';
import { Activity } from '../types/entities';

function calcNet(activityRows: Activity[]) {
  const emission = activityRows
    .filter((row) => !OFFSET_CATEGORIES.has(row.category))
    .reduce((sum, row) => sum + Number(row.carbonValue), 0);
  const offset = activityRows
    .filter((row) => OFFSET_CATEGORIES.has(row.category))
    .reduce((sum, row) => sum + Math.abs(Number(row.carbonValue)), 0);
  return { emission, offset, net: emission - offset };
}

export function useCarbonStats(rows: Activity[]) {
  return useMemo(() => {
    const todayStr = dayjs().format('YYYY-MM-DD');
    const weekStart = dayjs().startOf('week');
    const monthStart = dayjs().startOf('month');
    const todayRows = rows.filter((row) => row.recordDate === todayStr);
    const weekRows = rows.filter((row) => dayjs(row.recordDate).isAfter(weekStart.subtract(1, 'day')));
    const monthRows = rows.filter((row) => dayjs(row.recordDate).isAfter(monthStart.subtract(1, 'day')));
    const todayStats = calcNet(todayRows);
    const weekStats = calcNet(weekRows);
    const monthStats = calcNet(monthRows);
    const trend = rows
      .slice()
      .sort((a, b) => a.recordDate.localeCompare(b.recordDate))
      .map((row) => ({ date: row.recordDate, value: Number(row.carbonValue), category: row.category }));
    return {
      todayTotal: Number(todayStats.net.toFixed(2)),
      todayEmission: Number(todayStats.emission.toFixed(2)),
      todayOffset: Number(todayStats.offset.toFixed(2)),
      weekTotal: Number(weekStats.net.toFixed(2)),
      weekEmission: Number(weekStats.emission.toFixed(2)),
      weekOffset: Number(weekStats.offset.toFixed(2)),
      monthTotal: Number(monthStats.net.toFixed(2)),
      monthEmission: Number(monthStats.emission.toFixed(2)),
      monthOffset: Number(monthStats.offset.toFixed(2)),
      trend
    };
  }, [rows]);
}

