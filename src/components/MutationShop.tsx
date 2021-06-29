import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FileDrop } from "react-file-drop";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import {
  CREATE_COFFEE_SHOP,
  DELETE_COFFEE_SHOP,
  EDIT_COFFEE_SHOP,
  SEE_COFFEE_SHOPS,
} from "../queries";
import SubmitBtn from "../components/SubmitBtn";
import ErrorValidation from "../components/ErrorValidation";
import { FCProps, FormProps } from "types";

const Container = styled.main`
  width: 100%;
  display: flex;
`;

const Form = styled.form`
  width: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.span`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a5b1c2;
  font-size: 1.2rem;
  font-weight: 600;
`;

const DropBox = styled.div<{ hasError: any }>`
  width: 100%;
  height: 400px;
  border: 4px solid
    ${(props) => (props.hasError ? "red" : props.theme.mainColor)};
  border-radius: 10px;
  background-color: transparent;
`;

const Input = styled.input<{ hasError?: string }>`
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid
    ${(props) =>
      props.hasError ? props.theme.mainBtnColor : props.theme.shopCardColor};
  outline: none;
  font-size: 1.3rem;
  margin: 10px 0;
  background-color: ${(props) => props.theme.shopCardColor};
  &::placeholder {
    color: #a5b1c2;
  }
`;

const PreviewsContainer = styled.div`
  width: 33%;
  height: 50%;
  background-color: ${(props) => props.theme.shopCardColor};
  padding: 10px;
  margin: 0 10px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px;
`;

const ImagePreview = styled.div<{ src: string }>`
  width: ${window.innerWidth / 10}px;
  height: ${window.innerWidth / 10}px;
  overflow: hidden;
  margin: 5px;
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-clip: border-box;
  background-origin: border-box;
  background-color: ${(props) => props.theme.defaultColor};
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

const CategoriesContainer = styled.div<{ hasError?: any }>`
  width: 100%;
  margin: 10px 0;
  border-radius: 10px;
  border: 1px solid
    ${(props) =>
      props.hasError ? props.theme.mainBtnColor : props.theme.shopCardColor};
  background-color: ${(props) => props.theme.shopCardColor};
  display: flex;
  align-items: center;
`;

const CategoriesInput = styled(Input)`
  margin: 0;
`;

const CategoryPreview = styled.span`
  padding: 6px;
  background-color: ${(props) => props.theme.mainColor};
  border-radius: 5px;
  margin-left: 10px;
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

const DeleteContainer = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;
const DeleteShop = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 7px;
  font-size: 0.9rem;
  background-color: #e84118;
  opacity: 1;
  &:active {
    opacity: 0.4;
  }
`;

const MutationShop: React.FC<FCProps.MutationShop> = ({
  type,
  id,
  initName,
  initLatitude,
  initLongitude,
  initPhotos,
  initCategories,
}) => {
  const fileInputRef = useRef<any>(null);
  const catergoriesRef = useRef<any>(null);
  const [previews, setPreviews] = useState<Array<string | ArrayBuffer | null>>(
    []
  );
  const [categoriesText, setCategoriesText] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { isValid, errors },
  } = useForm<FormProps.MutationShop>({
    mode: "onChange",
  });

  const onCompleted = (data: any) => {
    const {
      [type === "add" ? "createCoffeeShop" : "editCoffeeShop"]: {
        result,
        error,
      },
    } = data;
    if (!result) {
      setError("result", { message: error });
    } else {
      history.push("/");
    }
  };

  const onDeleteComplete = (data: any) => {
    const {
      deleteCoffeeShop: { result, error },
    } = data;
    if (!result) {
      setError("result", { message: error });
    } else {
      history.push("/");
    }
  };

  const [deleteShopMutation] = useMutation(DELETE_COFFEE_SHOP, {
    onCompleted: onDeleteComplete,
    refetchQueries: [{ query: SEE_COFFEE_SHOPS, variables: { pageNum: 1 } }],
  });

  const [newShopMutation, { loading }] = useMutation(
    type === "add" ? CREATE_COFFEE_SHOP : EDIT_COFFEE_SHOP,
    {
      onCompleted,
      refetchQueries: [{ query: SEE_COFFEE_SHOPS, variables: { pageNum: 1 } }],
    }
  );

  const onDeleteShop = () => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm("Really Delete?");
    if (result) {
      deleteShopMutation({
        variables: {
          id,
        },
      });
    }
  };

  const preventEnter = (event: any) => {
    if (event.code === "Enter") {
      event.preventDefault();
    }
  };

  const onCategoriesChange = (event: any) => {
    if (event.target.value === " ") {
      return;
    } else if (categories.length >= 3) {
      setError("categories.0", { message: "categories limited 3" });
    } else {
      setCategoriesText(event.target.value);
    }
  };

  const onCategoriesKeyDown = (event: any) => {
    clearErrors(["categories", "categories.0"]);
    if (event.code === "Space") {
      if (categoriesText !== "") {
        if (categories.includes(categoriesText)) {
          setError(`categories.0`, { message: "already exist category" });
          setCategoriesText("");
          return;
        }
        setCategories((prev) => [...prev, categoriesText]);
        setCategoriesText("");
      }
    }
    if (event.code === "Enter") {
      event.preventDefault();
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
    if (files.length > 6) {
      setError("photos", { message: "Too much get to images, limited 6" });
      setTimeout(() => clearErrors("photos"), 2000);
      return;
    }
    setValue("photos", [...files], { shouldValidate: true });
    setPreviews([]);

    [...files].forEach((file: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        const current = reader.result;
        setPreviews((prev) => [...prev, current]);
      });
    });
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
      variables: {
        name,
        latitude,
        longitude,
        photos,
        categories,
        ...(type === "edit" && { id }),
      },
    });
  };

  useEffect(() => {
    if (initCategories !== undefined && initCategories.length > 0) {
      setCategories(initCategories);
    }
  }, [initCategories]);

  useEffect(() => {
    if (initPhotos !== undefined && initPhotos.length > 0) {
      setPreviews(initPhotos);
    }
  }, [initPhotos]);

  return (
    <Container>
      <PreviewsContainer>
        {previews.length > 0 ? (
          previews.map((preview: any, idx: number) => (
            <ImagePreview key={idx} src={preview} />
          ))
        ) : (
          <Title>Preview Images</Title>
        )}
      </PreviewsContainer>
      <Form onSubmit={handleSubmit(onValid)}>
        <DropBox hasError={errors.photos}>
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
          defaultValue={initName}
          onKeyDown={preventEnter}
          autoComplete="off"
          hasError={errors.name?.message}
        />
        <ErrorValidation term={errors.name?.message} />
        <Input
          {...register("latitude", {
            required: false,
            pattern: {
              value: /^[-]?[0-9]+(\.?[0-9]+)?$/,
              message: "please input type number",
            },
          })}
          type="text"
          placeholder="latitude"
          defaultValue={initLatitude}
          onKeyDown={preventEnter}
          autoComplete="off"
          hasError={errors.latitude?.message}
        />
        <ErrorValidation term={errors.latitude?.message} />
        <Input
          {...register("longitude", {
            required: false,
            pattern: {
              value: /^[-]?[0-9]+(\.?[0-9]+)?$/,
              message: "please input type number",
            },
          })}
          type="text"
          placeholder="longitude"
          defaultValue={initLongitude}
          onKeyDown={preventEnter}
          autoComplete="off"
          hasError={errors.longitude?.message}
        />
        <ErrorValidation term={errors.longitude?.message} />
        <CategoriesContainer hasError={errors.categories}>
          {categories.length > 0 &&
            categories.map((category: string, idx: number) => (
              <CategoryPreview key={category + idx + Date.now()}>
                {category}
                <CategoryDelete onClick={onDeleteCategory} tabIndex={-1}>
                  x
                </CategoryDelete>
              </CategoryPreview>
            ))}
          <CategoriesInput
            ref={catergoriesRef}
            name="categories"
            type="text"
            placeholder="categories"
            value={categoriesText}
            onChange={onCategoriesChange}
            autoComplete="off"
            onKeyDown={onCategoriesKeyDown}
          />
        </CategoriesContainer>
        <ErrorValidation term={errors.categories?.[0]?.message} />
        <SubmitBtn hasError={!isValid} text="Register" />
      </Form>
      {history.location.pathname !== "/add" && (
        <DeleteContainer>
          <DeleteShop onClick={onDeleteShop}>Delete</DeleteShop>
        </DeleteContainer>
      )}
    </Container>
  );
};

export default MutationShop;
