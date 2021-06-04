import { isLoggedInVar } from "../apollo";

const Login: React.FC = () => {
  return (
    <div>
      Login
      <button onClick={() => isLoggedInVar(true)}>log in</button>
    </div>
  );
};

export default Login;
