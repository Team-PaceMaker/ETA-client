import { atom } from 'recoil';
import { v1 } from 'uuid';

export const attentionState = atom({
  key: `attentionState${v1()}`,
  default: -1,
});
