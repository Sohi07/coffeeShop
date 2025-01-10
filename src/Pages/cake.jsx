import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../Store/cartSlice';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CakeContainer = styled.div`
  padding: 6rem 2rem 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fffbeb;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1100px;
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
`;

const ProductImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 1.25rem;
  background-color: white;
`;

const ProductName = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const ProductPrice = styled.p`
  font-size: 1.1rem;
  color: #4a2c2a;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #78350f;
`;

const Button = styled.button`
  background: #78350f;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border-radius: 10px;
  cursor: pointer;
  letter-spacing: 0.6px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: #5a2c0c;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  }
`;

const StyledButton = styled(Button)`
  background: linear-gradient(145deg, #6b4f4f, #7d5858);
  margin-left: 3rem;
  margin-top: 1rem;

  &:hover {
    background: linear-gradient(145deg, #7d5858, #8e6a6a);
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const QuantityButton = styled(Button)`
  padding: 5px 10px;
  min-width: 30px;
`;

const QuantityDisplay = styled.span`
  font-weight: bold;
  min-width: 20px;
  text-align: center;
`;

function Cake() {
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState({});

  const handleAddToCart = (product) => {
    if (!quantities[product.id]) {
      setQuantities({
        ...quantities,
        [product.id]: 1,
      });
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
  };

  const handleIncrement = (product) => {
    const newQuantity = (quantities[product.id] || 0) + 1;
    setQuantities({
      ...quantities,
      [product.id]: newQuantity,
    });
    dispatch(addToCart({ ...product, quantity: newQuantity }));
  };

  const handleDecrement = (product) => {
    if (quantities[product.id] > 1) {
      const newQuantity = quantities[product.id] - 1;
      setQuantities({
        ...quantities,
        [product.id]: newQuantity,
      });
      dispatch(addToCart({ ...product, quantity: newQuantity }));
    } else {
      const updatedQuantities = { ...quantities };
      delete updatedQuantities[product.id];
      setQuantities(updatedQuantities);
      dispatch(removeFromCart(product.id));
    }
  };

  const products = [
    {
      id: 36,
      name: "Oreo cheese cake",
      price: 9.2,
      image: "https://handletheheat.com/wp-content/uploads/2015/11/oreo-cheesecake-recipe-SQUARE.jpg",
      description: "Creamy cheesecake with an Oreo crust and topping, rich and indulgent.",
    },
    {
      id: 37,
      name: "Chocolate cake",
      price: 7.2,
      image: "https://img.freepik.com/free-photo/chocolate-cake_1203-8942.jpg",
      description: "Moist and decadent, a classic chocolate cake perfect for any celebration.",
    },
    {
      id: 38,
      name: "Red velvet cake",
      price: 4.2,
      image: "https://img.freepik.com/free-photo/top-view-red-strawberry-cake-delicious-with-tea-table-fruit-color-cake-biscuit-sweet_140725-28319.jpg",
      description: "Rich and velvety, a moist red cake with cream cheese frosting, elegant and delicious.",
    },
    {
      id: 39,
      name: "Cheese cake",
      price: 8.2,
      image: "https://img.freepik.com/premium-photo/citrus-cheesecake-cake-with-kumquats_82780-1574.jpg",
      description: "Creamy and smooth, a classic cheesecake with a graham cracker crust, perfect for dessert.",
    },
    {
      id: 40,
      name: "Blueberry cake",
      price: 3.2,
      image: "https://img.freepik.com/premium-photo/pieces-pie-from-cottage-cheese-blueberries_116441-1516.jpg",
      description: "Moist and bursting with blueberries, a sweet and tangy cake perfect for any occasion.",
    },
    {
      id: 41,
      name: "Strawberry cake",
      price: 6.0,
      image: "https://img.freepik.com/free-photo/delicious-cake-with-strawberries_23-2150797874.jpg",
      description: "Light and fluffy, a sweet strawberry cake with creamy frosting, perfect for summer.",
    },
  ];

  return (
    <CakeContainer>
      <Title initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        Our Cake Selection
      </Title>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
              {!quantities[product.id] ? (
                <>
                  <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                  <StyledButton onClick={() => handleAddToCart(product)}>Buy Now</StyledButton>
                </>
              ) : (
                <QuantityControls>
                  <QuantityButton onClick={() => handleDecrement(product)}>-</QuantityButton>
                  <QuantityDisplay>{quantities[product.id]}</QuantityDisplay>
                  <QuantityButton onClick={() => handleIncrement(product)}>+</QuantityButton>
                </QuantityControls>
              )}
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </CakeContainer>
  );
}

export default Cake;
