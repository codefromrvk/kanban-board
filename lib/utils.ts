import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { BoardDataType } from "./types";

export const baseURL = process.env.NEXT_PUBLIC_API_URL
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const reArrange = (d: BoardDataType, s: { index: number, droppableId: string }, dn: { index: number, droppableId: string }) => {
  const [removed] = d[s.droppableId as keyof BoardDataType].splice(s.index, 1);
  d[dn.droppableId as keyof BoardDataType].splice(dn.index, 0, removed);
  return d;
};