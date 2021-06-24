import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import createUploadLink from "apollo-upload-client/public/createUploadLink";

export const client: any = new ApolloClient({
  // uri: "http://localhost:4000/graphql",
  link: createUploadLink({
    uri: "https://coffee-server-nomad.herokuapp.com/graphql",
    headers: {
      token: localStorage.getItem("token") || "",
    },
  }),
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
