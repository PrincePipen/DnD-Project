import { create } from 'zustand';

interface Quest {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  progress: number; // 0 to 100
}

interface QuestState {
  quests: Quest[];
  addQuest: (quest: Quest) => void;
  updateQuestProgress: (id: string, progress: number) => void;
  completeQuest: (id: string) => void;
}

export const useQuestStore = create<QuestState>((set) => ({
  quests: [],
  addQuest: (quest) => set((state) => ({ quests: [...state.quests, quest] })),
  updateQuestProgress: (id, progress) => set((state) => ({
    quests: state.quests.map((quest) =>
      quest.id === id ? { ...quest, progress } : quest
    ),
  })),
  completeQuest: (id) => set((state) => ({
    quests: state.quests.map((quest) =>
      quest.id === id ? { ...quest, isActive: false, progress: 100 } : quest
    ),
  })),
}));