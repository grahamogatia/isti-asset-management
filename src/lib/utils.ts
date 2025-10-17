import { clsx, type ClassValue } from "clsx";
import { isDate } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function compareObjects<TData extends {}>(
  object1: TData,
  object2: TData
): Partial<TData> {
  const differences: Partial<TData> = {};

  for (const key of Object.keys(object2) as (keyof TData)[]) {
    const value = object2[key];
    if (isDate(value) && isDate(object1[key])) {
      if (object1[key].getTime() !== value.getTime()) {
        differences[key] = value;
      }
    } else {
      if (object1[key] != value) {
        differences[key] = value;
      }
    }
  }

  return differences;
}
