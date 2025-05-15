import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 375px;
  height: 812px;
  background: #FFFFFF;
  position: relative;
  margin: 0 auto;
`;

const StatusBar = styled.div`
  width: 100%;
  height: 44px;
  position: absolute;
  top: 0;
  left: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 24px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 16px;
  color: #000000;
  text-align: center;
  margin-bottom: 24px;
`;

const InputField = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 0 16px;
  margin-bottom: 16px;
  font-size: 16px;
  &::placeholder {
    color: #828282;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  background: #000000;
  border-radius: 8px;
  color: #FFFFFF;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin-bottom: 24px;
  font-weight: 500;
`;

const Terms = styled.p`
  font-size: 14px;
  color: #000000;
  text-align: center;
  line-height: 1.4;
  max-width: 327px;
`;

const HomeIndicator = styled.div`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 134px;
  height: 5px;
  background: #000000;
  border-radius: 100px;
`;

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log('Signing in with:', email);
  };

  return (
    <Container>
      <StatusBar />
      <Content>
        <Title>KEEP</Title>
        <Description>Enter your email to sign up for this app</Description>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit">Continue</Button>
        </form>
        <Terms>
          By clicking continue, you agree to our Terms of Service and Privacy Policy
        </Terms>
      </Content>
      <HomeIndicator />
    </Container>
  );
};

export default SignIn; 