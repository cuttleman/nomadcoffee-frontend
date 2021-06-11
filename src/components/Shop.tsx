import { Link } from "react-router-dom";
import styled from "styled-components";
import { Api } from "types";

const PhotoBg = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.mainColor};
  opacity: 0;
  border-radius: 50%;
`;

const Container = styled.div`
  width: 60%;
  height: 300px;
  position: relative;
  cursor: pointer;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
  &:hover ${PhotoBg} {
    opacity: 0.5;
  }
`;
const Photo = styled.div<{ url: string }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto 0;
  width: 200px;
  height: 200px;
  ${(props) => props.url && `background-image: url(${props.url});`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-clip: border-box;
  background-origin: border-box;
  background-color: ${(props) => props.theme.defaultColor};
  border-radius: 50%;
  /* overflow: hidden; */
  z-index: 2;
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 90%;
  height: 100%;
  background-color: ${(props) => props.theme.shopCardColor};
  border-radius: 20px;
  z-index: 1;
`;

const ItemContainer = styled.div`
  padding-left: 16%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.span`
  font-size: 1.6rem;
  text-transform: uppercase;
  font-weight: 600;
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

const Map = styled.div`
  width: 70%;
  height: 40%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Shop: React.FC<Api.CoffeeShop> = ({
  id,
  name,
  latitude,
  longitude,
  photos,
  categories,
}) => {
  return (
    <Container>
      <Link to={`/shop/${id}`}>
        <Photo url={photos[0]?.url}>
          <PhotoBg />
        </Photo>
        <Content>
          <ItemContainer>
            <Title>{name}</Title>
            <Categories>
              {categories.length > 0 &&
                categories.map((category) => (
                  <Category key={category.id}>{category.name}</Category>
                ))}
            </Categories>
            <Map>google map</Map>
          </ItemContainer>
        </Content>
      </Link>
    </Container>
  );
};

export default Shop;
