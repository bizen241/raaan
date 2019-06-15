import { AttemptResult } from "../api/entities";

export const calculateScore = ({ keystrokes, time, accuracy }: AttemptResult) => (keystrokes / time) * accuracy;
