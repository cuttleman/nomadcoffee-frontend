import { useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { FCProps, StyledType } from "types";
import { darkModeVar } from "../apollo";
import ErrorValidation from "./ErrorValidation";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Input = styled.input<StyledType>`
  width: 70%;
  border: none;
  outline: none;
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  caret-color: ${(props) => props.theme.defaultColor};
  border-bottom: 2px solid
    ${(props) => (props.hasError ? props.theme.mainBtnColor : "transparent")};
  &::placeholder {
    color: #a5b1c2;
  }
`;

const AuthInput: React.FC<FCProps.AuthInput> = ({
  register,
  name,
  pattern,
  hasErrorMessage,
  errorMessage,
  isRequired,
}) => {
  const isDarkMode = useReactiveVar(darkModeVar);
  return (
    <InputContainer>
      <Input
        {...register(name, {
          required: isRequired,
          pattern: {
            value: pattern,
            message: errorMessage,
          },
          ...(name === "password" && {
            minLength: {
              value: 8,
              message: "length is longer than 8",
            },
            maxLength: {
              value: 16,
              message: "length is shorter than 16",
            },
          }),
        })}
        type={name === "password" ? "password" : "text"}
        isDarkMode={isDarkMode}
        placeholder={name}
        autoComplete="off"
        hasError={Boolean(hasErrorMessage)}
      />
      <ErrorValidation term={hasErrorMessage} />
    </InputContainer>
  );
};

export default AuthInput;
