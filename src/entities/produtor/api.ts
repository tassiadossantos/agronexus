import type { Produtor } from './types';
import { mockProdutor } from './mocks';

export const produtorApi = {
  async getProfile(): Promise<Produtor> {
    await new Promise((r) => setTimeout(r, 500));
    return mockProdutor;
  },

  async updateProfile(data: Partial<Produtor>): Promise<Produtor> {
    await new Promise((r) => setTimeout(r, 300));
    return { ...mockProdutor, ...data };
  },
};
