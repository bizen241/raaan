import { AttemptResult } from "../api/entities";

export const calculateScore = ({ keystrokes, time, accuracy }: AttemptResult) =>
  Math.floor((keystrokes / (time / 1000)) * 60 * accuracy);
