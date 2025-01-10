import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../componets/Button';

const ContactContainer = styled.div`
  padding: 4rem 2rem;
  max-width: 800px;
  margin: 0 auto;
  padding-top: 1.5rem; /* Adjusted padding for top */
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  color: #7c2214; 
`;

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: all 0.5s ease-in-out;
  
  &:hover {
    transform: scale(1.05); /* Slightly scales up the input */
    border-color: #7c2214;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 8px rgba(165, 42, 42, 0.6);
  }
    &:focus{
    border-color:#b5651d;
    outline: none;
    }
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 150px;
  transition: all 0.5s ease-in-out;

  &:hover {
  border-color: #7c2214;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 8px rgba(165, 42, 42, 0.6);  
  transform: scale(1.05); /* Slightly scales up the textarea */
  }
  &:focus{
    border-color:#b5651d;
    outline: none;
    }
`;


function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <ContactContainer>
      <Title
        className = "mt-7"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontWeight: 'bold' }}
      >
        Contact Us
      </Title>
      <Title
        className = "mt-1"
        initial={{ opacity: 0, y: -20}}
        animate={{ opacity: 1, y: 2 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: "24px" }} 
      >
        We would love to hear from you!
      </Title>
      <Form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div style={{ display: 'flex',justifyContent:'space-between',gap:'10px' }}>
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          pattern="[a-zA-Z\s]+" title="Name must only contain letters"
          style={{ width: '50%' }}
        />
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: '50%' }}
        />
        </div>
        <TextArea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <Button primary type="submit">Send Message</Button>
      </Form>
    </ContactContainer>
  );
}

export default Contact;