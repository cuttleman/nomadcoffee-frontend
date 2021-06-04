import { useReactiveVar } from "@apollo/client";
import { HashRouter, Route, Switch } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import Home from "../routers/Home";
import Login from "../routers/Login";

const Router: React.FC = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact children={isLoggedIn ? Home : Login} />
      </Switch>
    </HashRouter>
  );
};

export default Router;
