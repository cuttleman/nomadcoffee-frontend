import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { FileDrop } from "react-file-drop";
import styled from "styled-components";
import SubmitBtn from "../components/SubmitBtn";
import { useForm } from "react-hook-form";
import { FormProps } from "types";
import { useMutation } from "@apollo/client";
import { CREATE_COFFEE_SHOP } from "../queries";
import { useHistory } from "react-router";

const Container = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DropBox = styled.div`
  width: 100%;
  height: 400px;
  border: 4px solid ${(props) => props.theme.mainColor};
  border-radius: 10px;
  background-color: transparent;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  border: none;
  outline: none;
  font-size: 1.3rem;
  margin: 10px 0;
  background-color: ${(props) => props.theme.shopCardColor};
  &::placeholder {
    color: #a5b1c2;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const IconContainer = styled.div`
  height: 390px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoriesContainer = styled.div`
  width: 100%;
  margin: 10px 0;
  border-radius: 10px;
  padding: 0 15px;
  background-color: ${(props) => props.theme.shopCardColor};
  display: flex;
  align-items: center;
`;

const CategoriesInput = styled(Input)`
  margin: 0;
  padding: 15px 0;
`;

const CategoryPreview = styled.span`
  padding: 6px;
  background-color: ${(props) => props.theme.mainColor};
  border-radius: 5px;
  margin-right: 10px;
  display: flex;
  color: ${(props) => props.theme.defaultColor};
  align-items: center;
`;

const CategoryDelete = styled.button`
  background-color: transparent;
  color: red;
  border: none;
  font-size: 0.9rem;
  font-weight: 700;
  padding: 0;
  padding-left: 5px;
`;

const Icon = styled(FontAwesomeIcon)`
  & path {
    color: ${(props) => props.theme.mainColor};
  }
`;

const Add: React.FC = () => {
  const fileInputRef = useRef<any>(null);
  const catergoriesRef = useRef<any>(null);
  const [categoriesText, setCategoriesText] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    formState: { isValid },
  } = useForm<FormProps.Add>({
    mode: "onChange",
  });

  const onCompleted = (data: any) => {
    const {
      createCoffeeShop: { result, error },
    } = data;
    if (!result) {
      setError("result", { message: error });
    } else {
      history.push("/");
    }
  };

  const [newShopMutation, { loading }] = useMutation(CREATE_COFFEE_SHOP, {
    onCompleted,
  });

  const onCategoriesChange = (event: any) => {
    if (event.target.value !== " ") {
      setCategoriesText(event.target.value);
    }
  };

  const onCategoriesKeyDown = (event: any) => {
    if (event.code === "Space") {
      if (categoriesText !== "") {
        setCategories((prev) => [...prev, categoriesText]);
        setCategoriesText("");
      }
    }
  };

  const onDeleteCategory = (event: any) => {
    const {
      parentElement: {
        firstChild: { data: target },
      },
    } = event.target;
    const newCategories = categories.filter((category) => category !== target);
    setCategories(newCategories);
  };

  const onFileInputChange = (event: any) => {
    const { files } = event.target;
    setValue("photos", files, { shouldValidate: true });
  };

  const onTargetClick = () => {
    fileInputRef.current.click();
  };

  const onValid = () => {
    if (loading) {
      return;
    }
    const { name, latitude, longitude, photos } = getValues();
    newShopMutation({
      variables: { name, latitude, longitude, photos, categories },
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onValid)}>
        <DropBox>
          <FileDrop onTargetClick={onTargetClick}>
            <IconContainer>
              <Icon icon={faUpload} size="4x" />
            </IconContainer>
          </FileDrop>
        </DropBox>
        <FileInput
          ref={fileInputRef}
          onChange={onFileInputChange}
          type="file"
          multiple
          formEncType="multipart/form-data"
        />
        <Input
          {...register("name", {
            required: true,
          })}
          type="text"
          placeholder="Coffee name"
        />
        <Input
          {...register("latitude", {
            required: false,
          })}
          type="text"
          placeholder="latitude"
        />
        <Input
          {...register("longitude", {
            required: false,
          })}
          type="text"
          placeholder="longitude"
        />
        <CategoriesContainer>
          {categories.length > 0 &&
            categories.map((category: string, idx: number) => (
              <CategoryPreview key={idx}>
                {category}
                <CategoryDelete onClick={onDeleteCategory}>x</CategoryDelete>
              </CategoryPreview>
            ))}
          <CategoriesInput
            ref={catergoriesRef}
            name="categories"
            type="text"
            placeholder="categories"
            value={categoriesText}
            onChange={onCategoriesChange}
            onKeyDown={onCategoriesKeyDown}
          />
        </CategoriesContainer>
        <SubmitBtn hasError={!isValid} text="Register" />
      </Form>
    </Container>
  );
};

export default Add;
