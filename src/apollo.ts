import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export const isLoggedInVar = makeVar(false);

export const darkModeVar = makeVar(false);

export const login = (token: string): void => {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("token", token);
  isLoggedInVar(true);
};

export const logout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("token");
  isLoggedInVar(false);
};

export const modeChange = (isDarkMode: boolean) => {
  const modeResult = darkModeVar(isDarkMode ? false : true);
  localStorage.setItem("isDarkMode", `${modeResult}`);
};

export const initialCheck = (): void => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isDarkMode = localStorage.getItem("isDarkMode");
  if (isLoggedIn) isLoggedInVar(true);
  darkModeVar(isDarkMode === "true" ? true : false);
};
