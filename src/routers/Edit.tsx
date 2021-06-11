import { useMutation, useQuery } from "@apollo/client";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { FileDrop } from "react-file-drop";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { FormProps } from "types";
import SubmitBtn from "../components/SubmitBtn";
import { SEE_COFFEE_SHOP, EDIT_COFFEE_SHOP } from "../queries";

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
  margin: 10px;
  font-size: 1.3rem;
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

const Icon = styled(FontAwesomeIcon)`
  & path {
    color: ${(props) => props.theme.mainColor};
  }
`;

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useQuery(SEE_COFFEE_SHOP, { variables: { id } });

  const fileInputRef = useRef<any>(null);
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

  const [editShopMutation, { loading: mutationLoading }] = useMutation(
    EDIT_COFFEE_SHOP,
    {
      onCompleted,
    }
  );

  const onFileInputChange = (event: any) => {
    const { files } = event.target;
    setValue("photos", files, { shouldValidate: true });
  };

  const onTargetClick = () => {
    fileInputRef.current.click();
  };

  const onValid = () => {
    if (mutationLoading) {
      return;
    }
    const { name, latitude, longitude, photos } = getValues();
    editShopMutation({
      variables: { name, latitude, longitude, photos },
    });
  };

  return loading ? null : (
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
          defaultValue={data?.seeCoffeeShop?.name}
        />
        <Input
          {...register("latitude", {
            required: false,
          })}
          type="text"
          placeholder="latitude"
          defaultValue={data?.seeCoffeeShop?.latitude}
        />
        <Input
          {...register("longitude", {
            required: false,
          })}
          type="text"
          placeholder="longitude"
          defaultValue={data?.seeCoffeeShop?.longitude}
        />
        <Input
          {...register("longitude", {
            required: false,
          })}
          type="text"
          placeholder="categories"
          defaultValue={data?.seeCoffeeShop?.categories}
        />
        <SubmitBtn hasError={!isValid} text="Edit" />
      </Form>
    </Container>
  );
};

export default Edit;
