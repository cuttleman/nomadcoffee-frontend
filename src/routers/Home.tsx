import styled from "styled-components";
import { useQuery } from "@apollo/client";
import Shop from "../components/Shop";
import { SEE_COFFEE_SHOPS } from "../queries";
import { Api } from "types";
import useReached from "../hooks/useReached";
import { useEffect } from "react";
import { useState } from "react";

const Container = styled.main`
  width: 100%;
`;

const ShopsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Empty = styled.span`
  font-size: 1.3rem;
  font-weight: 800;
`;

const Home: React.FC = () => {
  const [pageNum, setPageNum] = useState<number>(1);
  const { observedRef, isReached } = useReached({ threshold: 0.9 });
  const { data } = useQuery(SEE_COFFEE_SHOPS, {
    variables: { pageNum },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    const hasNext = data?.seeCoffeeShops?.hasNext;
    if (isReached) {
      if (hasNext) {
        setPageNum((prev) => prev + 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReached]);

  return (
    <Container>
      <ShopsContainer>
        {data?.seeCoffeeShops?.result &&
        data?.seeCoffeeShops?.shops.length > 0 ? (
          data?.seeCoffeeShops?.shops.map(
            (shop: Api.CoffeeShop, index: number) => {
              if (index === data?.seeCoffeeShops?.shops.length - 1) {
                return <Shop ref={observedRef} key={shop.id} {...shop} />;
              }
              return <Shop key={shop.id} {...shop} />;
            }
          )
        ) : (
          <Empty>You have'nt coffee shop</Empty>
        )}
      </ShopsContainer>
    </Container>
  );
};

export default Home;
