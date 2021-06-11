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
    interface Add {
      name: string;
      latitude?: string;
      longitude?: string;
      photos: any[];
      categories: string[];
      result?: boolean;
    }
  }

  namespace Api {
    interface User {
      id: string;
      username: string;
      email: string;
      name?: string;
      location?: string;
      avatarUrl?: string;
      githubUsername?: string;
      isFollowing: boolean;
      isSelf: boolean;
      coffeeShops: CoffeeShop[];
    }
    interface CoffeeShopPhoto {
      id: string;
      url: string;
      shop: CoffeeShop;
    }
    interface CoffeeShop {
      id: string;
      name: string;
      latitude?: string;
      longitude?: string;
      user: User;
      photos: CoffeeShopPhoto[];
      categories: Category[];
    }
    interface Category {
      id: string;
      name: string;
      slug: string;
      shops: CoffeeShop[];
      totalShops: number;
    }
  }

  interface StyledType {
    isDarkMode?: boolean;
    hasError?: boolean;
    disabled?: boolean;
  }
}
