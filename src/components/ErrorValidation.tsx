import styled from "styled-components";
import { FCProps, StyledType } from "types";

const Text = styled.span<StyledType>`
  margin-top: 5px;
  color: ${(props) =>
    props.hasError ? props.theme.mainBtnColor : "transparent"};
`;

const ErrorValidation: React.FC<FCProps.ErrorValidation> = ({ term }) => {
  return <Text hasError={Boolean(term)}>{term || <>&nbsp;</>}</Text>;
};

export default ErrorValidation;
