import React, { useState } from "react";
import styled from "styled-components";
import coffeeImg from "../assets/coffee.png";
import LogIn from "../components/LogIn";
import SignUp from "../components/SignUp";
import PageTitle from "../components/PageTitle";

const Container = styled.main`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const ImageContent = styled.section`
  width: 60%;
  height: 100vh;
  background-color: ${(props) => props.theme.mainColor};
  position: relative;
`;

const Coffee = styled.img`
  width: 55%;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const LogInContent = styled.section`
  width: 40%;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 50px;
  color: ${(props) => props.theme.mainFontColor};
  font-family: "Pacifico", cursive;
  font-style: italic;
  margin-bottom: 20%;
`;

const ToggleSignUp = styled.div`
  margin-top: 40px;
  align-self: center;
`;
const ToggleMessage = styled.span`
  font-size: 0.7rem;
  margin-right: 5px;
`;
const ToggleBtn = styled.button`
  background-color: transparent;
  border: none;
  font-weight: 800;
  color: ${(props) => props.theme.mainBtnColor};
`;

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const toggleAuthPage = () => setIsSignUp((prev) => !prev);
  return (
    <Container>
      <PageTitle title={isSignUp ? "Sign Up" : "Log In"} />
      <ImageContent>
        <Coffee src={coffeeImg} alt="main_coffee" />
      </ImageContent>
      <LogInContent>
        <Title>NOMAD COFFEE</Title>
        {isSignUp ? (
          <SignUp toggleAuthPage={setIsSignUp} />
        ) : (
          <LogIn toggleAuthPage={setIsSignUp} />
        )}
        <ToggleSignUp>
          <ToggleMessage>
            {isSignUp
              ? "Do you have already Account?"
              : "Do you haven't Account?"}
          </ToggleMessage>
          <ToggleBtn onClick={toggleAuthPage}>
            {isSignUp ? "Log In" : "Sign Up"}
          </ToggleBtn>
        </ToggleSignUp>
      </LogInContent>
    </Container>
  );
};

export default Auth;
