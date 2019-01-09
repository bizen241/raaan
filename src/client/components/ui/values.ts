export type Size = "large" | "medium" | "small";

export const sizes: { [P in Size]: string } = {
  large: "2rem",
  medium: "1rem",
  small: "0.5rem"
};

export const paddings: { [P in Size]: string } = {
  large: "0.75rem",
  medium: "0.5rem",
  small: "0.25rem"
};

export const heights: { [P in Size]: string } = {
  large: "2.4rem",
  medium: "2rem",
  small: "1.6rem"
};

export const fontSizes: { [P in Size]: string } = {
  large: "1.2rem",
  medium: "1rem",
  small: "0.8rem"
};
