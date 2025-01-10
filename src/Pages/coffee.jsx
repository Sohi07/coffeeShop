import { motion } from "framer-motion";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addToCart } from "../Store/cartSlice";
import Button from "../componets/Button";

const CoffeeContainer = styled.div`
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



const ProductInfo1 = styled.div`
display:flex;
  align-items:center;
  justify-content:space-between;
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

const products = [
    {
        id: 1,
    name: "Espresso",
    price: 2.5,
    image:
      "https://img.freepik.com/free-photo/caramel-latte-with-chocolade-table_140725-4.jpg?t=st=1727759794~exp=1727763394~hmac=c764d48b2b28767da2c6b996ec20e0d6a5857c19724850db5e46498687e16225&w=740",
    description: "A strong, rich coffee shot, perfect for a quick pick-me-up.",
  },
  {
    id: 2,
    name: "Cappuccino",
    price: 3.5,
    image:
      "https://img.freepik.com/free-photo/delicious-organic-latte-macchiato-with-milk_23-2148420329.jpg?t=st=1727761406~exp=1727765006~hmac=10f2d9d7a08693daef2ef87ff4edd99d5bc33e1813adb65c8628d088268239b5&w=1380 ",
    description:
      "Creamy and frothy, a classic Italian coffee with steamed milk.",
  },
  {
    id: 3,
    name: "Latte",
    price: 4,
    image:
      "https://img.freepik.com/free-photo/cold-chocolate-cocktail-with-ice-cream_140725-940.jpg?t=st=1727759865~exp=1727763465~hmac=ad44e2430bff005bce4db484fbef6f2ec22f05b97b41c8c6c28ecb8508c2d909&w=740 ",
    description:
      "Smooth and milky, a comforting coffee drink with a velvety texture.",
  },
  {
    id: 4,
    name: "Mocha",
    price: 4.5,
    image:
      "https://img.freepik.com/free-photo/delicious-quality-coffee-cup_23-2150691385.jpg?t=st=1727759888~exp=1727763488~hmac=ea5484acf51753db6069801c3df0caa601e5d09a2265109ba218d040acb3e53c&w=1380  ",
    description:
      "A sweet blend of coffee and chocolate, perfect for chocolate lovers.",
  },
  {
    id: 5,
    name: "Americano",
    price: 3,
    image:
      "https://img.freepik.com/free-photo/delicious-quality-coffee-cup_23-2150691389.jpg?t=st=1727759909~exp=1727763509~hmac=615986b69635b1e5a35b3a09347203d49046878d7525a9588f94211a3947ff58&w=1380  ",
    description:
      "A diluted espresso shot, similar to brewed coffee but stronger.",
  },
  {
    id: 6,
    name: "Macchiato",
    price: 3.5,
    image:
      "https://img.freepik.com/free-photo/assortment-with-frappe-dark-background_23-2148436976.jpg?t=st=1727761354~exp=1727764954~hmac=20b5ddf356f56d12e139084bc8e2c14ad3c71677269de9680db9dc4d09250774&w=740 ",
    description: "An espresso with a dollop of foamed milk, rich and creamy.",
  },
  {
    id: 7,
    name: "Turkish Coffee",
    price: 3,
    image:
      "https://img.freepik.com/premium-photo/pouring-turkish-coffee_772702-2136.jpg?w=360",
    description:
      "Thick, strong, and unfiltered coffee, traditionally served in small cups.",
  },
  {
    id: 8,
    name: "Flat white",
    price: 5.5,
    image:
      "https://static.toiimg.com/thumb/86699095.cms?imgsize=59654&width=509&height=340 ",
    description:
      "Velvety microfoam poured over a double shot of espresso, smooth and creamy.",
  },
  {
    id: 9,
    name: "Nitro Cold Brew",
    price: 4.5,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_ZcJOr1zaqJ-TkW9Ie1PcNRRrgPDnNSgX9A&s ",
    description:
      "Cold brew infused with nitrogen, creating a creamy, Guinness-like texture.",
  },
  {
    id: 10,
    name: "Doppio",
    price: 3.4,
    image:
      "https://lifeboostcoffee.com/cdn/shop/articles/Doppio_Espresso_Macchiato.jpg?v=1655197439 ",
    description:
      "A double shot of espresso, strong and intense, perfect for espresso lovers.",
  },
  {
    id: 11,
    name: "Viennese Coffee",
    price: 4,
    image:
      "https://irepo.primecp.com/2015/10/241007/Vienna-Coffee-01-12-07-OR_Category-CategoryPageDefault_ID-1242862.jpg?v=1242862 ",
    description:
      "Espresso topped with whipped cream, often served with chocolate shavings.",
  },
  {
    id: 12,
    name: "Ristretto",
    price: 5.2,
    image:
      "https://www.castironketo.net/wp-content/uploads/2023/10/is-ristretto-keto-friendly-header-image.jpg ",
    description:
      "A short shot of espresso, sweeter and more concentrated than regular espresso.",
  },
  {
    id: 13,
    name: "Red Eye",
    price: 6.2,
    image:
      "https://www.sessioncoffeedenver.com/wp-content/uploads/2024/04/what-is-a-red-eye-coffee.jpg ",
    description:
      "A cup of brewed coffee with a shot of espresso, extra strong and caffeinated.",
  },
  {
    id: 14,
    name: "Frappé",
    price: 8.2,
    image:
      "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/23/29/18/x38TQCFcRRiV1FJYbTLP_coffeefrappe2.jpg",
    description:
      "Iced coffee drink blended with milk and sugar, often topped with whipped cream.",
  },
  {
    id: 15,
    name: "Affogato",
    price: 8.6,
    image:
      "https://static.wixstatic.com/media/6a3e8d_23b343395c7c47feab983d124cc9b4ce~mv2.jpg/v1/fill/w_568,h_770,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/6a3e8d_23b343395c7c47feab983d124cc9b4ce~mv2.jpg",
    description:
      "A scoop of vanilla gelato drowned in a shot of hot espresso, sweet and creamy.",
  },
  {
    id: 16,
    name: "Cortado",
    price: 6,
    image:
      "https://cdn.shopify.com/s/files/1/0677/6524/0096/files/coffee-in-a-glass-2022-11-02-18-50-07-utc_600x600.jpg?v=1683831169",
    description:
      "Espresso cut with a small amount of warm milk to reduce acidity.",
  },
  {
    id: 17,
    name: "Café au lait",
    price: 3.8,
    image:
      "https://blackturtlecoffee.com/cdn/shop/articles/Cafe-Au-Lait-004.jpg?v=1672848240",
    description:
      "Coffee with hot milk, similar to a latte but with a stronger coffee flavor.",
  },
  {
    id: 18,
    name: "Café Bombón",
    price: 4.6,
    image:
      "https://www.theworktop.com/wp-content/uploads/2021/11/cafe-bombon.jpg",
    description:
      "Espresso served with sweetened condensed milk, creating a layered effect.",
  },
  {
    id: 25,
    name: "Irish Coffee",
    price: 7.2,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNlPYx_StS2Y7x9s4hukcCyJZaDm54mgbe8g&s",
    description:
      "Coffee with Irish whiskey, sugar, and cream, a warm and boozy treat.",
  },
];
function Coffee() {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <CoffeeContainer>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Cake Selection
      </Title>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <StyledWrapper style={{backgroundColor:"white",padding:"10px",zIndex:"100",borderRadius:"50px", position:"absolute" ,top: "0", right: "0"}}><div className="heart-container" title="Like">
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
            <div style={{ position: "relative" , padding: "20px"}}>
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
    </CoffeeContainer>
  );
  }
  
  export default Coffee;
  