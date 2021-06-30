import { ForwardedRef, forwardRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Api } from "types";

const PhotoBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.mainColor};
  opacity: 0;
`;

const Container = styled.div<{ ref: ForwardedRef<HTMLDivElement> | null }>`
  width: 40%;
  max-width: 600px;
  min-width: 500px;
  height: 60vh;
  cursor: pointer;
  margin-bottom: 100px;
  &:not(:last-child) {
  }
  &:hover ${PhotoBg} {
    opacity: 0.5;
  }
`;
const Photo = styled.div<{ url: string }>`
  position: relative;
  ${(props) => props.url && `background-image: url(${props.url});`};
  height: 50%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-clip: border-box;
  background-origin: border-box;
  background-color: ${(props) => props.theme.defaultColor};
`;

const Content = styled.div`
  width: 100%;
  height: 50%;
  padding: 30px;
  background-color: ${(props) => props.theme.shopCardColor};
`;

const ItemContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const ItemColumn = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 1.6rem;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 30px;
`;

const Categories = styled.div``;
const Category = styled.span`
  padding: 6px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.defaultColor};
  margin-right: 10px;
  font-weight: 500;
`;

const GMap = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Shop = forwardRef<HTMLDivElement, Api.CoffeeShop>(
  ({ id, name, latitude, longitude, photos, categories }, ref) => {
    console.log(photos[0]?.url);
    return (
      <Container ref={ref || null}>
        <Link to={`/shop/${id}`}>
          <Photo url={photos[0]?.url}>
            <PhotoBg />
          </Photo>
          <Content>
            <ItemContainer>
              <ItemColumn>
                <Title>{name}</Title>
                <Categories>
                  {categories.length > 0 &&
                    categories.map((category) => (
                      <Category key={category.id}>{category.name}</Category>
                    ))}
                </Categories>
              </ItemColumn>
              <ItemColumn>
                <GMap>google map</GMap>
              </ItemColumn>
            </ItemContainer>
          </Content>
        </Link>
      </Container>
    );
  }
);

export default Shop;
