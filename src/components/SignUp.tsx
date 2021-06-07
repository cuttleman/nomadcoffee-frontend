import styled from "styled-components";
import { useForm } from "react-hook-form";
import SubmitBtn from "./SubmitBtn";
import AuthInput from "../components/AuthInput";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../queries";
import { FCProps, FormProps } from "types";

const Form = styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const SignUp: React.FC<FCProps.AuthPage> = ({ toggleAuthPage }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { isValid, errors },
  } = useForm<FormProps.SignUp>({ mode: "onChange" });

  const onCompleted = (data: any) => {
    const {
      createAccount: { result, error },
    } = data;
    if (result) {
      toggleAuthPage(false);
    } else {
      setError("result", { message: error });
    }
  };

  const [signUpMutation, { loading }] = useMutation(SIGN_UP, { onCompleted });

  const onValid = () => {
    if (loading) {
      return;
    }
    const { email, username, password, name, location } = getValues();
    signUpMutation({
      variables: {
        email,
        username,
        password,
        ...(name && { name }),
        ...(location && { location }),
      },
    });
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
        name="username"
        pattern={
          /^([^\s!?@#$%^&*._\-~,;:"'+=()<>[\]ㄱ-ㅎ가-힣]|([a-zA-Z0-9][._]+))*[^\s!?@#$%^&*._\-~,;:"'+=()<>[\]ㄱ-ㅎ가-힣]$/
        }
        hasErrorMessage={errors?.username?.message}
        errorMessage="only alphabet and can include . _ middle of characters"
      />
      <AuthInput
        register={register}
        isRequired={true}
        name="password"
        pattern={/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/}
        hasErrorMessage={errors?.password?.message}
        errorMessage="required that is included 0-9, a-z, !@#$%^&*"
      />
      <AuthInput
        register={register}
        name="name"
        pattern={/^[a-zA-Z]{3,10}$/}
        hasErrorMessage={errors?.name?.message}
        errorMessage="only alphabet and length is between 3 and 10"
      />
      <AuthInput
        register={register}
        name="location"
        pattern={/^[a-zA-Z0-9-]{1,10}$/}
        hasErrorMessage={errors?.location?.message}
        errorMessage="length is between 1 and 10"
      />
      <SubmitBtn hasError={!isValid} text="Sign Up" />
    </Form>
  );
};

export default SignUp;
