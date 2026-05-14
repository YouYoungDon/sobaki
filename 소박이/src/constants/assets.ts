import { SobagiEmotion } from '../types';

export const ROOM_BACKGROUND_URIS: Partial<Record<1 | 2 | 3 | 4 | 5, string>> = {
  1: 'https://cdn.jsdelivr.net/gh/YouYoungDon/sobaki@main/assets/room_stage1.png',
};

export const SOBAGI_IMAGE_URIS: Partial<Record<SobagiEmotion, string>> = {
  happy: 'https://cdn.jsdelivr.net/gh/YouYoungDon/sobaki@main/assets/sobaki.png',
  excited: 'https://cdn.jsdelivr.net/gh/YouYoungDon/sobaki@main/assets/sobaki_gamjung.png',
};
