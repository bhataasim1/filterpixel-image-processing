export type operations = {
  brightness?: number;
  saturation?: number;
  rotate?: number;
  crop?: { left: number; top: number; width: number; height: number };
};

export type ProcessImageInputType = {
  filePath: string;
  operations: operations;
};
