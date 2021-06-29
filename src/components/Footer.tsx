import styled from "styled-components";

const Container = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  background-color: ${(props) => props.theme.mainColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer: React.FC = () => {
  return (
    <Container>Copyright © 2021. Cuttleman. All rights reserved.</Container>
  );
};

export default Footer;
