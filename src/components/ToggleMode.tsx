import { useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { StyledType } from "types";
import { darkModeVar, modeChange } from "../apollo";

const Container = styled.button<StyledType>`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 2px solid ${(props) => props.theme.mainFontColor};
  outline: none;
  cursor: pointer;
  background-color: transparent;
`;

const Button = styled.div<StyledType>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transform: ${(props) =>
    props.isDarkMode ? "translateX(100%)" : "translateX(0)"};
  background-color: ${(props) => props.theme.mainFontColor};
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  transition: all 0.3s linear;
`;

const EmptySpace = styled.div`
  width: 40px;
  height: 40px;
  background-color: transparent;
`;

const ToggleMode: React.FC = () => {
  const isDarkMode = useReactiveVar<boolean>(darkModeVar);

  return (
    <Container onClick={() => modeChange(isDarkMode)} isDarkMode={isDarkMode}>
      <Button isDarkMode={isDarkMode}>{isDarkMode ? "🌛" : "🌞"}</Button>
      <EmptySpace></EmptySpace>
    </Container>
  );
};

export default ToggleMode;
