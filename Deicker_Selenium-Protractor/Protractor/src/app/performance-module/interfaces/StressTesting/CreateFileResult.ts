export interface CreateFileResult {
  fileSize: number;
  amountOfFiles: number;
  amountOfSubfolders: number;
  writeDuration: number;
  readDuration: number;
  writeMBPerSecond: number;
  readMBPerSecond: number;
}
