import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const defaultData = [
  { Date: "2025-01", Sales: 100 },
  { Date: "2025-02", Sales: 150 },
  { Date: "2025-03", Sales: 200 },
  { Date: "2025-04", Sales: 180 },
  { Date: "2025-05", Sales: 250 },
];