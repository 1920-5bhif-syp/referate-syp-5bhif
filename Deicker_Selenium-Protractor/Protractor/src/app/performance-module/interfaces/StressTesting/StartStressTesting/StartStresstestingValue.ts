import { MeasurementValueGroup } from './MeasurementValueGroup';

export interface StartStresstestingValue {
    amountOfMeasurements: number;
    zipFolderSize: number;
    measurementValueGroups: MeasurementValueGroup[];
  }
