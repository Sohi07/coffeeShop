import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const OPENAI_API_KEY = 'REACT_APP_OPENAI_API_KEY'; 

const ExpertContainer = styled.div`
  padding: 6rem 2rem 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fffbeb;
  box-shadow: 1px 1px 5px 6px #888888;

  @media (max-width: 768px) {
    padding: 4rem 1rem 2rem 1rem;
  }
`;

const FeatureTitle = styled(motion.h1)`
  font-size: 4rem;
  margin-top: -4rem;
  margin-bottom: 1rem;
  color: #78350f;
  font-family: 'Playfair Display', serif;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: space-around;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    text-align: center;
    margin-top: 0;
  }
`;

const ImageContent = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0rem;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Image = styled(motion.img)`
  width: 500px;
  height: 500px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  margin-left: 20rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    margin-left: 0;
    margin-bottom: 1rem;
  }
`;

const FeatureDescription = styled(motion.p)`
  font-size: 1.5rem;
  color: #6b4423;
  line-height: 1.6;
  font-family: 'Poppins', sans-serif;
  display: flex;
  margin: 0px;
  margin-left: 60px;
  margin-right: 50px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-left: 1rem;
    margin-right: 1rem;
    text-align: justify;
  }
`;

const ChatContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 400px;
  height: 500px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

const ChatHeader = styled.div`
  background-color: #d2691e;
  color: white;
  padding: 0.5rem;
  text-align: center;
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div`
  align-self: ${props => props.sender === 'user' ? 'flex-end' : 'flex-start'};
  background-color: ${props => props.sender === 'user' ? '#d2691e' : '#f4f4f4'};
  color: ${props => props.sender === 'user' ? 'white' : 'black'};
  padding: 0.5rem 1rem;
  border-radius: 10px;
  max-width: 80%;
`;

const TypingIndicator = styled.div`
  align-self: flex-start;
  background-color: #f4f4f4;
  color: black;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-style: italic;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: ${props => props.small ? '0.5rem 1rem' : '0.8rem 1.5rem'};
  background-color: #d2691e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #b5651d;
  }

  @media (max-width: 768px) {
    width: ${props => props.small ? 'auto' : '100%'};
    padding: ${props => props.small ? '0.5rem 1rem' : '1rem 2rem'};
    font-size: ${props => props.small ? '1rem' : '1.2rem'};
  }
`;

function ExpertBaristas() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([{
    message: "Hello! I'm your coffee expert. How can I help you today?",
    sender: "ChatGPT"
  }]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');

  const toggleChat = () => setIsChatOpen(prev => !prev);

  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;

    const newMessage = {
      message: userInput,
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setUserInput('');
    setIsTyping(true);

    await processMessageToChatGPT(newMessages);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  async function processMessageToChatGPT(chatMessages) {
    const systemMessage = {
      role: "system",
      content: "You are an expert barista with deep knowledge of coffee. Provide detailed, professional advice about coffee, brewing methods, and coffee culture."
    };

    const apiMessages = chatMessages.map((messageObject) => ({
      role: messageObject.sender === "ChatGPT" ? "assistant" : "user",
      content: messageObject.message
    }));

    const apiRequestBody = {
      model: "gpt-4o",
      messages: [systemMessage, ...apiMessages]
    };

    try {
      const response = await fetch( {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + OPENAI_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'An error occurred');
      }

      setMessages([
        ...chatMessages,
        {
          message: data.choices[0].message.content,
          sender: "ChatGPT"
        }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([
        ...chatMessages,
        {
          message: "I apologize, but I'm having trouble connecting right now. Please try again later.",
          sender: "ChatGPT"
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <>
      <ExpertContainer>
        <FeatureTitle
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Expert Baristas
        </FeatureTitle>
        <ImageContent
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Image
            src="https://img.freepik.com/free-vector/people-making-different-coffee-methods_23-2148659306.jpg?t=st=1727760094~exp=1727763694~hmac=1308757b9658b2965de4fa54acb3d847813ef088426f2fb78a05d8cb0be1b993&w=826"
            alt="Expert Baristas"
          />
        </ImageContent>
        <FeatureDescription
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Expert baristas excel in making coffee due to their comprehensive knowledge of coffee, practical brewing skills, and passion for the craft...
        </FeatureDescription>

   <Button onClick={toggleChat}>Chat with a Coffee Expert</Button>

      </ExpertContainer>

      {isChatOpen && (
        <ChatContainer>
          <ChatHeader>
            <span>Chat with Coffee Expert</span>
            <Button small onClick={toggleChat}>Close</Button>
          </ChatHeader>
          <ChatMessages>
            {messages.map((message, index) => (
              <Message key={index} sender={message.sender}>
                {message.message}
              </Message>
            ))}
            {isTyping && (
              <TypingIndicator>Coffee Expert is typing...</TypingIndicator>
            )}
          </ChatMessages>
          <InputContainer>
            <TextInput
              type="text"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button small onClick={handleSendMessage}>Send</Button>
          </InputContainer>
        </ChatContainer>
      )}
    </>
  );
}

export default ExpertBaristas;