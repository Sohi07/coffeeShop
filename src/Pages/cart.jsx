import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../Store/cartSlice'; // Import clearCart action
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartContainer = styled.div`
  padding: 2rem;
`;

const CartItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 1rem;
  border-radius: 4px;
`;

const ItemName = styled.span`
  font-weight: bold;
`;

const ItemPrice = styled.span`
  margin-left: 1rem;
`;

const QuantityInput = styled.input`
  width: 50px;
  text-align: center;
`;

const RemoveButton = styled(motion.button)`
  background:rgb(147, 82, 77);
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
`;

const SummaryTable = styled.table`
  width: 100%;
  margin-top: 2rem;
  border-collapse: collapse;
`;

const SummaryRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const SummaryCell = styled.td`
  padding: 0.5rem;
  text-align: right;
`;

const ProceedButton = styled(motion.button)`
  background:rgb(171, 73, 28);
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%; 
`;

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    toast.error('Item removed from cart!');
  };

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity: parseInt(quantity) }));
    toast.info('Cart updated!'); 
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const SGST = totalPrice * 0.09; // SGST is 9%
  const CGST = totalPrice * 0.09; // CGST is 9%
  const finalPrice = totalPrice + SGST + CGST;

  const handleProceedToPayment = () => {
    alert('Payment is processing...');
    dispatch(clearCart());
    alert('Thank you!');
  };

  return (
    <CartContainer>
      <h1>Your Cart</h1>
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <ItemInfo>
            <ItemImage src={item.image} alt={item.name} />
            <ItemName>{item.name}</ItemName>
            <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
          </ItemInfo>
          <QuantityInput
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
          />
          <RemoveButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleRemoveFromCart(item.id)}
          >
            Remove
          </RemoveButton>
        </CartItem>
      ))}
      <SummaryTable>
        <tbody>
          <SummaryRow>
            <SummaryCell>Total:</SummaryCell>
            <SummaryCell>${totalPrice.toFixed(2)}</SummaryCell>
          </SummaryRow>
          <SummaryRow>
            <SummaryCell>SGST (9%):</SummaryCell>
            <SummaryCell>${SGST.toFixed(2)}</SummaryCell>
          </SummaryRow>
          <SummaryRow>
            <SummaryCell>CGST (9%):</SummaryCell>
            <SummaryCell>${CGST.toFixed(2)}</SummaryCell>
          </SummaryRow>
          <SummaryRow>
            <SummaryCell>Final Price:</SummaryCell>
            <SummaryCell>${finalPrice.toFixed(2)}</SummaryCell>
          </SummaryRow>
        </tbody>
      </SummaryTable>
      <ProceedButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleProceedToPayment}
      >
        Proceed to Payment
      </ProceedButton>
    </CartContainer>
  );
}

export default Cart;
