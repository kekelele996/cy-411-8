export enum ActivityCategory {
  TRANSPORT = 'transport',
  ENERGY = 'energy',
  FOOD = 'food',
  SHOPPING = 'shopping',
  OFFSET = 'offset'
}

export const ACTIVITY_CATEGORY_LABELS: Record<ActivityCategory, string> = {
  [ActivityCategory.TRANSPORT]: '交通',
  [ActivityCategory.ENERGY]: '能源',
  [ActivityCategory.FOOD]: '餐饮',
  [ActivityCategory.SHOPPING]: '购物',
  [ActivityCategory.OFFSET]: '碳抵消'
};

export const ACTIVITY_CATEGORY_COLORS: Record<ActivityCategory, string> = {
  [ActivityCategory.TRANSPORT]: 'blue',
  [ActivityCategory.ENERGY]: 'gold',
  [ActivityCategory.FOOD]: 'green',
  [ActivityCategory.SHOPPING]: 'purple',
  [ActivityCategory.OFFSET]: 'cyan'
};

export const OFFSET_CATEGORIES = new Set([ActivityCategory.OFFSET]);

