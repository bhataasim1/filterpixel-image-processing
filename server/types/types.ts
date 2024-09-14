export type operations = {
  brightness?: number;
  saturation?: number;
  rotate?: number;
};

export type ProcessImageInputType = {
  filePath: string;
  operations: operations;
};
