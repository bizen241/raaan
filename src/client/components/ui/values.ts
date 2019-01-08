export type Size = "large" | "medium" | "small";

export const sizes: { [P in Size]: string } = {
  large: "2rem",
  medium: "1rem",
  small: "0.5rem"
};
