import { useReactiveVar } from "@apollo/client";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import Home from "../routers/Home";
import Auth from "../routers/Auth";
import Add from "../routers/Add";
import Edit from "../routers/Edit";
import Layout from "./Layout";
import Header from "./Header";
import Footer from "./Footer";

const Router: React.FC = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <HashRouter>
      <Header />
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? (
            <Layout>
              <Home />
            </Layout>
          ) : (
            <Auth />
          )}
        </Route>
        <Route path="/add">
          <Layout>
            <Add />
          </Layout>
        </Route>
        <Route path="/shop/:id" exact>
          <Layout>
            <Edit />
          </Layout>
        </Route>
        <Redirect path="*" to="/" />
      </Switch>
      <Footer />
    </HashRouter>
  );
};

export default Router;
