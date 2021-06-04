import Router from "./components/Router";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styled";
import { useReactiveVar } from "@apollo/client";
import { darkModeVar } from "./apollo";

const App: React.FC = () => {
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router />
    </ThemeProvider>
  );
};

export default App;
