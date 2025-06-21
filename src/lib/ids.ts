import { humanId } from 'human-id';

export function readableId() {
  return humanId({ separator: '-', capitalize: false });
}
