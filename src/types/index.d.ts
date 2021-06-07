declare module "types" {
  import { UseFormRegister } from "react-hook-form";
  namespace FCProps {
    interface SubmitBtn {
      text?: string;
      hasError?: boolean;
    }
    interface ErrorValidation {
      term?: string;
    }
    interface AuthInput {
      register: UseFormRegister<FormProps.LogIn | FormProps.SignUp>;
      name: "email" | "password" | "result" | "username" | "name" | "location";
      pattern: any;
      hasErrorMessage?: string;
      errorMessage: string;
      isRequired?: boolean;
    }
    interface AuthPage {
      toggleAuthPage: React.Dispatch<React.SetStateAction<boolean>>;
    }
  }
  namespace FormProps {
    interface LogIn {
      email: string;
      password: string;
      result?: boolean;
    }
    interface SignUp extends LogIn {
      username?: string;
      name?: string;
      location?: string;
    }
  }

  interface StyledType {
    isDarkMode?: boolean;
    hasError?: boolean;
    disabled?: boolean;
  }
}
