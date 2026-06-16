import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { ActivityCategory, OFFSET_CATEGORIES } from '../constants/activity';
import { Activity } from '../models/activity';
import { User } from '../models/user';
import { logTemplate } from '../utils/logger';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Activity) private readonly activityRepo: Repository<Activity>
  ) {}

  async list(region?: string, start?: string, end?: string) {
    logTemplate('info', 'ACTIVITY_LIST_START');
    const users = await this.userRepo.find({ where: region ? { region } : {}, order: { username: 'ASC' } });
    const result = await Promise.all(
      users.map(async (user) => {
        const rows = await this.activityRepo.find({
          where: {
            userId: Number(user.id),
            ...(start && end ? { recordDate: Between(start, end) } : {})
          }
        });
        const totalEmission = rows
          .filter((row) => !OFFSET_CATEGORIES.has(row.category as ActivityCategory))
          .reduce((sum, row) => sum + Number(row.carbonValue), 0);
        const totalOffset = rows
          .filter((row) => OFFSET_CATEGORIES.has(row.category as ActivityCategory))
          .reduce((sum, row) => sum + Math.abs(Number(row.carbonValue)), 0);
        const netCarbon = totalEmission - totalOffset;
        return {
          userId: Number(user.id),
          username: user.username,
          region: user.region,
          avatar: user.avatar,
          totalCarbon: Number(netCarbon.toFixed(2)),
          totalEmission: Number(totalEmission.toFixed(2)),
          totalOffset: Number(totalOffset.toFixed(2))
        };
      })
    );
    return result.sort((a, b) => a.totalCarbon - b.totalCarbon).map((item, index) => ({ ...item, rank: index + 1 }));
  }
}
