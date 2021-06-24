import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FCProps } from "types";
import MutationShop from "../components/MutationShop";
import { SEE_COFFEE_SHOP } from "../queries";

const Edit: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [previousData, setPreviousData] = useState<FCProps.MutationShop>();
  const { data, loading } = useQuery(SEE_COFFEE_SHOP, {
    variables: { id: params.id },
  });

  useEffect(() => {
    if (data) {
      const initPhotos = data?.seeCoffeeShop?.shop.photos.map(
        (photo) => photo.url
      );
      const initCategories = data?.seeCoffeeShop?.shop.categories.map(
        (category) => category.name
      );
      setPreviousData({
        type: "edit",
        id: params.id,
        initName: data?.seeCoffeeShop?.shop.name,
        initLatitude: data?.seeCoffeeShop?.shop.latitude,
        initLongitude: data?.seeCoffeeShop?.shop.longitude,
        initPhotos: initPhotos,
        initCategories: initCategories,
      });
    }
  }, [data, params]);

  return loading ? null : <MutationShop type="edit" {...previousData} />;
};

export default Edit;
