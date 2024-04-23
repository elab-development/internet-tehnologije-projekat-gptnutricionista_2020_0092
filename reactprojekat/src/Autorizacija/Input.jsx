import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  width: 100%;
  float: left;
  margin-top: 30px;
`;

const InputLabel = styled.label`
  width: 100%;
  float: left;
`;

const InputField = styled.input`
  width: 100%;
  height: 60px;
  top: 10px;
  border-radius: 5px;
  background: transparent;
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 300;
`;

const Input = ({ label, type, value, onChange }) => {
  return (
    <InputContainer>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <InputField type={type} id={label} value={value} onChange={onChange} />
    </InputContainer>
  );
};

export default Input;
