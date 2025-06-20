export type WithOptionalValues<T extends object> = {
  [Key in keyof T]: T[Key] | undefined;
};
