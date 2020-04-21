import { MeasurementValue } from './MeasurementValue';

export interface MeasurementValueGroup {
    totalFileSize: number;
    measurementValues: MeasurementValue[]
  }