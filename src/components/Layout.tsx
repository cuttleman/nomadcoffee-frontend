import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  padding-top: 90px;
  padding-bottom: 80px;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Layout: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Layout;
