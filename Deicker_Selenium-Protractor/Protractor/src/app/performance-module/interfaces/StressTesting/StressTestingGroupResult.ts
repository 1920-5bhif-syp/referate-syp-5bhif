import { CreateFileGroupResult } from './CreateFileGroupResult';
import { CreateZipFolderResult } from './CreateZipFolderResult';

export interface StressTestingGroupResult {
  createFileResults: CreateFileGroupResult[];
  createZipFolderResults: CreateZipFolderResult[];
}
