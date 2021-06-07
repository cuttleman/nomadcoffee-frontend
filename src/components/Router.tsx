import { useReactiveVar } from "@apollo/client";
import { HashRouter, Route, Switch } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import Home from "../routers/Home";
import Auth from "../routers/Auth";

const Router: React.FC = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={isLoggedIn ? Home : Auth} />
      </Switch>
    </HashRouter>
  );
};

export default Router;
