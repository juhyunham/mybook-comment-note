import React, { useRef } from "react";
import styled, { css } from "styled-components";
import { LoginReqType } from "../types";

interface SigninProps {
  login: (reqData: LoginReqType) => void;
}

const Signin: React.FC<SigninProps> = ({ login }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLoginClick = () => {
    const emailValue = emailRef.current!.value;
    const passwordValue = passwordRef.current!.value;

    login({ email: emailValue, password: passwordValue });
  };

  return (
    <Wrap>
      <Flex>
        <Col left>
          <img src="/book.jpg" alt="book 이미지" />
        </Col>
        <Col>
          <Title>My Books </Title>
          <SubTitle>Please Note your Opinion</SubTitle>
          <InputWrap>
            <SubTitle>Email</SubTitle>
            <Input placeholder="Email" type="text" name="email" ref={emailRef} />
          </InputWrap>
          <InputWrap>
            <SubTitle>Password</SubTitle>
            <Input placeholder="password" type="password" name="password" ref={passwordRef} />
          </InputWrap>
          <Button type="button" onClick={handleLoginClick}>
            Login
          </Button>
        </Col>
      </Flex>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  height: 100vh;
  padding: 0 50px;
  align-items: center;
`;

const Flex = styled.div`
  overflow: hidden;
  display: flex;
  border-radius: 10px;
  height: 300px;
  min-width: 450px;
  max-width: 600px;
  margin: 0 auto;
  justify-content: center;
  width: 100%;
`;

const Col = styled.div<{ left?: true }>`
  flex: 1;

  > img {
    width: 100%;
  }

  ${(props) =>
    props.left
      ? css`
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f4ba1a;
        `
      : css`
          padding: 10px;
          background: #dad6c7;
        `}
`;

const Title = styled.h1`
  font-size: 20px;
  color: #008e89;
  margin: 0;
`;

const SubTitle = styled.h3`
  font-size: 14px;
  color: #607d8b;
`;

const InputWrap = styled.div`
  margin-top: 20px;
`;

const Input = styled.input`
  width: 100%;
  border: 0;
  border-radius: 8px;
  padding: 5px 5px 5px 10px;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 16px;
  border-radius: 8px;
  background-color: #008e89;
  color: #fff;
  border: 0;
  padding: 8px 0;

  &:hover {
    background-color: #085e7d;
  }
`;

export default Signin;
