import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { width } from "../constants";
import ToggleMode from "./ToggleMode";
import { Link } from "react-router-dom";

const Container = styled.header`
  position: fixed;
  z-index: 10;
  width: ${width}px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: transparent;
  border-bottom: 1px solid ${(props) => props.theme.shopCardColor};
`;

const Bg = styled.div`
  width: 100%;
  height: 70px;
  position: fixed;
  background-color: ${(props) => props.theme.mainBgColor};
  opacity: 0.8;
  z-index: 9;
`;

const Title = styled.span`
  font-size: 1.3rem;
  cursor: pointer;
  font-family: "Pacifico", cursive;
  color: ${(props) => props.theme.mainFontColor};
`;

const Nav = styled.nav`
  padding-right: 10%;
`;

const Icon = styled(FontAwesomeIcon)`
  & path {
    color: ${(props) => props.theme.mainColor};
  }
`;

const Header: React.FC = () => {
  return (
    <>
      <Container>
        <Link to="/">
          <Title>NOMAD COFFEE</Title>
        </Link>
        <Nav>
          <Link to="/add">
            <Icon icon={faPlusSquare} size="2x" />
          </Link>
        </Nav>
        <ToggleMode />
      </Container>
      <Bg />
    </>
  );
};

export default Header;
