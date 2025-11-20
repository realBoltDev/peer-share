import { StateCreator } from "zustand";
import { AppState } from "../appStore";

export type TransferStatus = 'Pending' | 'Uploading' | 'Downloading' | 'Completed' | 'Failed';

export interface TransferItem {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  speed: number;
  status: TransferStatus;
  dbKey?: string;
  fileObject?: File;
}

export interface TransferSlice {
  transfers: TransferItem[];
  addTransfer: (item: TransferItem) => void;
  updateTransfer: (id: string, patch: Partial<TransferItem>) => void;
}

export const createTransferSlice: StateCreator<
  AppState,
  [],
  [],
  TransferSlice
> = (set, get) => ({
  transfers: [],

  addTransfer: (item) =>
    set((state) => ({
      transfers: [...state.transfers, item],
    })),

  updateTransfer: (id, patch) =>
    set((state) => ({
      transfers: state.transfers.map((t) =>
        t.id === id ? { ...t, ...patch } : t
      ),
    })),
});
