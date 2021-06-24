// import { useState } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import Shop from "../components/Shop";
import { SEE_COFFEE_SHOPS } from "../queries";
import { logout } from "../apollo";
import { Api } from "types";

const Container = styled.main`
  width: 100%;
`;

const ShopsContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;

const Home: React.FC = () => {
  // const [pageNum, setPageNum] = useState(1);
  const {
    data,
    loading,
  }: {
    data?: {
      seeCoffeeShops: {
        result: boolean;
        error: string;
        shops: Api.CoffeeShop[];
      };
    };
    loading: boolean;
  } = useQuery(SEE_COFFEE_SHOPS, {
    variables: { pageNum: 1 },
    fetchPolicy: "network-only",
  });

  // Infinite scroll implementation

  return loading ? null : (
    <Container>
      <button onClick={logout}>log out</button>
      <ShopsContainer>
        {data?.seeCoffeeShops?.result &&
          data?.seeCoffeeShops?.shops.map((shop: Api.CoffeeShop) => (
            <Shop key={shop.id} {...shop} />
          ))}
      </ShopsContainer>
    </Container>
  );
};

export default Home;
