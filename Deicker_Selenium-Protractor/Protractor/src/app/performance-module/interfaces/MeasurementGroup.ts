import { Measurement } from './Measurement';

export interface MeasurementGroup {
  measuredComponent: string;
  firstValueDesc: string;
  firstValueUnit: string;
  secondValueDesc: string;
  secondValueUnit: string;
  measurements: Measurement[];
}
