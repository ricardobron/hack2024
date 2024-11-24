import { create } from 'zustand';

interface IOpenAIData {
  worldview: string;
  religions: {
    [key: string]: string;
  };
  crsAspects: string[];
  avoid: string[];
  favorable: string[];
  actionItems: string[];
  evangelisationTips: string;
  summary: string;
}

interface IOpenAiState {
  data?: IOpenAIData;
  setData: (data: IOpenAIData) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

export const useOpenAi = create<IOpenAiState>((set) => ({
  data: undefined,
  setData: (data: IOpenAIData) => set({ data }),
  isLoading: false,
  setIsLoading: (value: boolean) => set({ isLoading: value }),
}));
