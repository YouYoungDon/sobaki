import { SobagiEmotion } from '../types';

export const EMOTION_MESSAGES: Record<SobagiEmotion, string> = {
  satisfied: '오늘도 잘 참았어요! 수고했어요! 🍀',
  excited: '연속 기록 중이에요! 소박이도 신나요 ✨',
  sleepy: '이 시간에도 기록하다니... 소박이도 졸려요 zzz',
  cozy: '오늘도 잘했어요. 수고한 당신을 응원해요 🍵',
  happy: '오늘도 잘 기록했어요! 💚',
};

export const VALID_EMOTIONS: SobagiEmotion[] = [
  'happy', 'excited', 'cozy', 'sleepy', 'satisfied',
];
