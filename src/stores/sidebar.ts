import { create } from "zustand";

interface SidebarStore {
  isOpened: boolean;
  toggleSidebar: () => void;
}

const useSidebarStore = create<SidebarStore>((setState) => ({
  isOpened: false,
  toggleSidebar: () => setState((state) => ({ isOpened: !state.isOpened })),
}));

export default useSidebarStore;
