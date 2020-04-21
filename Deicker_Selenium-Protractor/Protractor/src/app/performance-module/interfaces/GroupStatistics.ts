import { Statistic } from './Statistic';

export interface GroupStatistic {
  measuredComponent: string;
  firstStatistic: Statistic;
  secondStatistic: Statistic;
}
