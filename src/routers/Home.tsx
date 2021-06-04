import { darkModeVar, isLoggedInVar } from "../apollo";
import styled from "styled-components";

const TextContainer = styled.div`
  width: 300px;
  height: 200px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  transition: all 0.3s linear;
`;

const Home: React.FC = () => {
  return (
    <div>
      <TextContainer>Home</TextContainer>
      <button onClick={() => isLoggedInVar(false)}>log out</button>
      <button onClick={() => darkModeVar(true)}>Dark Theme</button>
      <button onClick={() => darkModeVar(false)}>Light Theme</button>
    </div>
  );
};

export default Home;
