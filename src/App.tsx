import Router from "./components/Router";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyle, lightTheme } from "./styled";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { client, darkModeVar, initialCheck } from "./apollo";
import ToggleMode from "./components/ToggleMode";
import { useEffect } from "react";

const App: React.FC = () => {
  const darkMode = useReactiveVar(darkModeVar);

  useEffect(() => {
    initialCheck();
  }, []);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyle />
          <ToggleMode />
          <Router />
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
};

export default App;
