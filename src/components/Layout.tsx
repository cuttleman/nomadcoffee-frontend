import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  padding: 80px 0;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Layout: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Layout;
