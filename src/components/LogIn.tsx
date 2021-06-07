import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import SubmitBtn from "./SubmitBtn";
import AuthInput from "./AuthInput";
import { LOG_IN } from "../queries";
import { login } from "../apollo";
import { FCProps, FormProps } from "types";

const Form = styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const LogIn: React.FC<FCProps.AuthPage> = ({ toggleAuthPage }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { isValid, errors },
  } = useForm<FormProps.LogIn>({
    mode: "onChange",
  });

  const onCompleted = (data: any) => {
    const {
      logIn: { result, token, error },
    } = data;
    if (!result) {
      setError("result", { message: error });
      if (error === "User not found.") {
        toggleAuthPage(true);
      }
    } else {
      login(token);
    }
  };

  const [loginMutation, { loading }] = useMutation(LOG_IN, { onCompleted });

  const onValid = () => {
    if (loading) {
      return;
    }
    const { email, password } = getValues();
    loginMutation({ variables: { email, password } });
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <AuthInput
        register={register}
        isRequired={true}
        name="email"
        pattern={
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        }
        hasErrorMessage={errors?.email?.message}
        errorMessage="please input as email type"
      />
      <AuthInput
        register={register}
        isRequired={true}
        name="password"
        pattern={/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/}
        hasErrorMessage={errors?.password?.message}
        errorMessage="required that is included 0-9, a-z, !@#$%^&*"
      />
      <SubmitBtn hasError={!isValid} text="Log In" />
    </Form>
  );
};

export default LogIn;
