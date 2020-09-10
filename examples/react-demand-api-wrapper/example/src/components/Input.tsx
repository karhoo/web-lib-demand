import React from "react";
import styled from "styled-components";

interface Props extends React.HTMLProps<HTMLInputElement> {
  label?: string;
}

const Container = styled.div`
  input {
    font-weight: 400;
    height: 48px;
    width: 100%;
    padding: 0 12px;
    border: 1px solid #f1f2f6;
    border-radius: 8px;
    font-size: 16px;
    text-align: left;
    letter-spacing: 0.3px;
    appearance: none;
    background-color: #f1f2f6;
    box-shadow: none;
    caret-color: #a1a9c3;
    color: #132968;
    transition: border 0.15s;
  }
  
  input:hover,
  input:focus {
    border: 1px solid #a1a9c3;
    outline: 0;
  }
`;

export const Input = ({ label, ...props }: Props) => {
  return (
    <Container>
      {label && <label htmlFor={props.id}>{label}:</label>}
      <input {...props} />
    </Container>
  );
};
