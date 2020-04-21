import { Cpu } from './Cpu';
import { Disk } from './Disk';
import { Memory } from './Memory';
import { NetworkCard } from './NetworkCard';
import { EnMService } from './EnMService';

export interface HardwareInformation {
  cpu: Cpu;
  disk: Disk;
  memory: Memory;
  networkCards: NetworkCard[];
  enmServices: EnMService[];
}
