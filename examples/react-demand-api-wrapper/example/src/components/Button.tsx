import styled from "styled-components";

export const Button = styled.button`
  width: 100%;
  display: flex;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
  font-weight: 500;
  appearance: none;
  outline: none;
  box-shadow: none;
  position: relative;
  z-index: 2;
  align-items: center;
  justify-content: center;
  color: rgb(255, 255, 255);
  background-color: rgb(250, 107, 107);
  height: 48px;
  font-size: 16px;
  padding: 0px 16px;
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  transition: background-color 0.2s linear 0s;

  &:hover {
    background-color: rgb(251, 137, 137);
  }
`;
