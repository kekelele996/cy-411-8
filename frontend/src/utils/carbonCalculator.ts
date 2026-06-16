import { ActivityCategory, OFFSET_CATEGORIES } from '../constants/activity';
import { CarbonFactor } from '../types/entities';

export function calculateCarbonValue(category: ActivityCategory, amount: number, factor?: CarbonFactor | null) {
  if (!factor || factor.category !== category) return 0;
  let value = Number((amount * Number(factor.factorValue)).toFixed(2));
  if (OFFSET_CATEGORIES.has(category)) {
    value = -value;
  }
  return value;
}

