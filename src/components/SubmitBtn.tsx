import styled from "styled-components";
import { FCProps, StyledType } from "types";

const Submit = styled.button<StyledType>`
  width: 30%;
  height: 40px;
  border: none;
  border-radius: 6px;
  outline: none;
  align-self: flex-end;
  background-color: ${(props) => props.theme.mainBtnColor};
  cursor: pointer;
  opacity: ${(props) => (props.hasError ? 0.6 : 1)};
  overflow: hidden;
`;

const Text = styled.div<StyledType>`
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.3;
  font-size: 0.9rem;
  &::before {
    width: 100%;
    content: "👉";
    margin-left: -100%;
    transition: all 0.2s linear;
  }
  &:hover {
    &::before {
      margin-left: ${(props) => (props.disabled ? "none" : "-50%")};
    }
  }
`;

const SubmitBtn: React.FC<FCProps.SubmitBtn> = ({ hasError, text }) => {
  return (
    <Submit type="submit" hasError={hasError} disabled={hasError}>
      <Text disabled={hasError}>{text}</Text>
    </Submit>
  );
};

export default SubmitBtn;
