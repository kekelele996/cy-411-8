import { ActivityCategory, OFFSET_CATEGORIES } from '../constants/activity';
import { logTemplate } from './logger';

export interface CarbonCalculationInput {
  category: ActivityCategory;
  amount: number;
  factorValue: number;
}

export function calculateCarbonValue(input: CarbonCalculationInput) {
  let carbonValue = Number((input.amount * input.factorValue).toFixed(2));
  if (OFFSET_CATEGORIES.has(input.category)) {
    carbonValue = -carbonValue;
  }
  logTemplate('info', 'ACTIVITY_CREATE_START', {
    userId: 0,
    category: input.category,
    subType: `factor:${input.factorValue}`
  });
  return carbonValue;
}

