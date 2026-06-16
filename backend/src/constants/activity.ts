export enum ActivityCategory {
  TRANSPORT = 'transport',
  ENERGY = 'energy',
  FOOD = 'food',
  SHOPPING = 'shopping',
  OFFSET = 'offset'
}

export const ACTIVITY_CATEGORY_LABELS: Record<ActivityCategory, string> = {
  [ActivityCategory.TRANSPORT]: 'Transport',
  [ActivityCategory.ENERGY]: 'Energy',
  [ActivityCategory.FOOD]: 'Food',
  [ActivityCategory.SHOPPING]: 'Food & shopping',
  [ActivityCategory.OFFSET]: 'Carbon offset'
};

export const OFFSET_CATEGORIES = new Set([ActivityCategory.OFFSET]);

export const ACTIVITY_CATEGORY_ERROR_FIELDS = {
  CATEGORY: 'Activity.category',
  SUB_TYPE: 'Activity.sub_type',
  CARBON_FACTOR_CATEGORY: 'CarbonFactor.category'
};

