import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { FileDrop } from "react-file-drop";
import styled from "styled-components";
import SubmitBtn from "../components/SubmitBtn";
import { useForm } from "react-hook-form";
import { FormProps } from "types";
import { watch } from "fs";
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

const Add: React.FC = () => {
  const fileInputRef = useRef<any>(null);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    formState: { isValid, errors },
  } = useForm<FormProps.Add>({
    mode: "onChange",
  });

  const onCompleted = (data: any) => {
    const {
      createCoffeeShop: { result, error },
    } = data;
    console.log(data);
    if (!result) {
      setError("result", { message: error });
    } else {
      history.push("/");
    }
  };

  const [newShopMutation, { loading }] = useMutation(CREATE_COFFEE_SHOP, {
    onCompleted,
  });

  const onFileInputChange = (event: any) => {
    const { files } = event.target;
    setValue("photos", [...files], { shouldValidate: true });
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
      variables: { name, latitude, longitude, photos },
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
        <SubmitBtn text="Register" />
      </Form>
    </Container>
  );
};

export default Add;
