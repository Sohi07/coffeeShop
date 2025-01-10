import { motion } from "framer-motion";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addToCart } from "../Store/cartSlice";
import Button from "../componets/Button";

const SoupContainer = styled.div`
  padding: 6rem 2rem 4rem 2rem; // Added top padding for navbar
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fffbeb; // Warm background color
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #78350f; // Warm brown color
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1100px; // Slightly reduced to center content more
  margin: 0 auto;
`;
const ProductCard = styled(motion.div)`
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1), -2px -2px 8px rgba(255, 255, 255, 0.8);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.15), -4px -4px 12px rgba(255, 255, 255, 0.9);
  }

  &:hover .overlay {
    opacity: 1;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 1rem;
  text-align: center;
`;

const ProductName = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  box-sizing: border-box;
`;

const OverlayText = styled.p`
  font-size: 1rem;
  color: #333;
  text-align: center;
`;

const ProductInfo = styled.div`
  padding: 1.25rem;
  background-color: white;
`;

const ProductPrice = styled.p`
  font-size: 1.5rem;
  color: #4a2c2a;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const StyledButton = styled.button`
  .CartBtn {
    width: 140px;
    height: 40px;
    border-radius: 12px;
    border: none;
    background-color: rgb(255, 208, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition-duration: .5s;
    overflow: hidden;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.103);
    position: relative;
  }

  .IconContainer {
    position: absolute;
    left: -50px;
    width: 30px;
    height: 30px;
    background-color: transparent;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    z-index: 2;
    transition-duration: .5s;
  }

  .icon {
    border-radius: 1px;
  }

  .text {
    height: 100%;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(17, 17, 17);
    z-index: 1;
    transition-duration: .5s;
    font-size: 1.04em;
    font-weight: 600;
  }

  .CartBtn:hover .IconContainer {
    transform: translateX(58px);
    border-radius: 40px;
    transition-duration: .5s;
  }

  .CartBtn:hover .text {
    transform: translate(10px,0px);
    transition-duration: .5s;
  }

  .CartBtn:active {
    transform: scale(0.95);
    transition-duration: .5s;
  }
`;
const StyledWrapper = styled.div`
  .heart-container {
    --heart-color: maroon;
    position: relative;
    width: 50px;
    height: 40px;
    transition: .3s;
    z-index:100;
    
  }

  .heart-container .checkbox {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 20;
    cursor: pointer;
  }

  .heart-container .svg-container {
    width:100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .heart-container .svg-outline,
          .heart-container .svg-filled {
    fill: var(--heart-color);
    position: absolute;
  }

  .heart-container .svg-filled {
    animation: keyframes-svg-filled 1s;
    display: none;
  }

  .heart-container .svg-celebrate {
    position: absolute;
    animation: keyframes-svg-celebrate .5s;
    animation-fill-mode: forwards;
    display: none;
    stroke: var(--heart-color);
    fill: var(--heart-color);
    stroke-width: 2px;
  }

  .heart-container .checkbox:checked~.svg-container .svg-filled {
    display: block
  }

  .heart-container .checkbox:checked~.svg-container .svg-celebrate {
    display: block
  }

  @keyframes keyframes-svg-filled {
    0% {
      transform: scale(0);
    }

    25% {
      transform: scale(1.2);
    }

    50% {
      transform: scale(1);
      filter: brightness(1.5);
    }
  }

  @keyframes keyframes-svg-celebrate {
    0% {
      transform: scale(0);
    }

    50% {
      opacity: 1;
      filter: brightness(1.5);
    }

    100% {
      transform: scale(1.4);
      opacity: 0;
      display: none;
    }`;
    const ProductInfo1 = styled.div`
display:flex;
  align-items:center;
  justify-content:space-between;
`;

const products = [
    {
        id: 42,
        name: "Salad",
        price: 7.3,
        image:
          "https://img.freepik.com/free-photo/dietary-salad-with-tomatoes-feta-lettuce-spinach-pine-nuts_2829-20128.jpg?ga=GA1.1.900909129.1729318722&semt=ais_hybrid",
        description:
          "Fresh and healthy, a mix of greens, vegetables, and a tangy dressing, perfect for a light meal.",
      },
      {
        id: 43,
        name: "Tomato soup",
        price: 6.7,
        image:
          "https://img.freepik.com/free-photo/portrait-shooting-tomato-soup-with-crackers-cheese-tomatoes-bread-table_141793-2858.jpg?ga=GA1.1.900909129.1729318722&semt=ais_hybrid",
        description:
          "Warm and comforting, a classic tomato soup perfect for a cozy meal, often served with grilled cheese.",
      },
      {
        id: 44,
        name: "Chicken Noodle soup",
        price: 8.2,
        image:
          "https://img.freepik.com/free-photo/delicious-noodle-soup-with-chicken-uncooked-pasta-small-brown-bowl-spoon-garlic-dark-background_140725-140085.jpg?ga=GA1.1.900909129.1729318722&semt=ais_hybrid",
        description:
          "Hearty and soothing, a classic soup with chicken, noodles, and vegetables, perfect for cold days.",
      },
      {
        id: 45,
        name: "Miso soup",
        price: 7.5,
        image:
          "https://img.freepik.com/free-photo/top-view-japanese-food-bowls-arrangement_23-2148809848.jpg?ga=GA1.1.900909129.1729318722&semt=ais_hybrid",
        description:
          "Savory and umami-rich, a traditional Japanese soup made with miso paste and dashi broth.",
      },
      {
        id: 46,
        name: "Cold cucumber soup",
        price: 7.34,
        image:
          "https://img.freepik.com/free-photo/cold-cucumber-soup-with-dried-tomatoes-mozzarella_2829-14287.jpg?ga=GA1.1.900909129.1729318722&semt=ais_hybrid",
        description:
          "Refreshing and cool, a chilled soup made with cucumbers, yogurt, and herbs, perfect for summer.",
      },
      {
        id: 47,
        name: "Tom Yum Soup",
        price: 9.2,
        image:
          "https://img.freepik.com/free-photo/tom-yum-kung-thai-hot-spicy-soup-shrimp-with-lemon-grass-lemon-galangal-chilli-wooden-table-thailand-food_1150-21078.jpg?ga=GA1.1.900909129.1729318722&semt=ais_hybrid",
        description:
          "Spicy and aromatic, a Thai soup with lemongrass, kaffir lime leaves, and chilies, often with shrimp.",
      },
];
function Soup() {
    const dispatch = useDispatch();
  
    const handleAddToCart = (product) => {
      dispatch(addToCart(product));
    };
  
    return (
      <SoupContainer>
        <Title
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Soupshake Selection
        </Title>
        <ProductGrid>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            ><StyledWrapper style={{backgroundColor:"white",padding:"10px",zIndex:"100",borderRadius:"50px", position:"absolute" ,top: "0", right: "0"}}><div className="heart-container" title="Like">
            <input type="checkbox" className="checkbox" id="Give-It-An-Id" />
            <div className="svg-container">
              <svg viewBox="0 0 24 24" className="svg-outline" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                </path>
              </svg>
              <svg viewBox="0 0 24 24" className="svg-filled" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                </path>
              </svg>
              <svg className="svg-celebrate" width={100} height={100} xmlns="http://www.w3.org/2000/svg">
                <polygon points="10,10 20,20" />
                <polygon points="10,50 20,50" />
                <polygon points="20,80 30,70" />
                <polygon points="90,10 80,20" />
                <polygon points="90,50 80,50" />
                <polygon points="80,80 70,70" />
              </svg>
            </div>
          </div></StyledWrapper>
              <div style={{ position: "relative" }}>
                <ProductImage src={product.image} alt={product.name} />
                <Overlay className="overlay">
                  <OverlayText>{product.description}</OverlayText>
                </Overlay>
              </div>
              <ProductInfo>
              <ProductInfo1>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                </ProductInfo1>
                <Button onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>
                <StyledButton onClick={() => handleAddToCart(product)}><button className="CartBtn">
        <span className="IconContainer"> 
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" className="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>
        </span>
        <p className="text">Buy Now</p>
      </button></StyledButton>
  
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
      </SoupContainer>
    );
  }
  
  export default Soup;
  