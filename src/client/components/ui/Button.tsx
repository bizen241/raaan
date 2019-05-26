import { styled } from "../../style";
import { borderRadius, borderWidth, fontSize, padding } from "./values";

export const Button = styled.button<{
  to?: string;
}>`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${padding};

  background-color: transparent;
  border-style: solid;
  border-color: ${p => p.theme.main}33;
  border-width: ${borderWidth};
  border-bottom-width: 2px;
  border-radius: ${borderRadius};

  font-size: ${fontSize};
  text-align: center;
  text-decoration: none;
  color: ${p => p.theme.main};
`;

export const FlatButton = styled(Button)`
  border-style: none;
`;
