import { Winners } from '@/api/winners';

export interface Prize {
  winners: Winners[];
  prize: number;
  round: string;
}
