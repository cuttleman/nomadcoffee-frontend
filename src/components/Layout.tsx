import styled from "styled-components";
import Footer from "./Footer";

const Container = styled.div`
  min-height: 100vh;
  padding: 100px 0;
  background-color: ${(props) => props.theme.mainBgColor};
  position: relative;
`;

const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      {children}
      <Footer />
    </Container>
  );
};

export default Layout;
