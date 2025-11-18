import { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #1a365d;
  color: #e4e4e4;
  border: 1px solid #2a4a7f;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #2a4a7f;
  }
`;

const StrConcat = ({ onError, onResult }) => {
  const [str1, setStr1] = useState('');
  const [str2, setStr2] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const params = {};
      if (str1 !== '') params.str1 = str1;
      if (str2 !== '') params.str2 = str2;

      const response = await axios.get('/concat', {params});
      onResult({
        status: response.status,
        body: response.data
      });
      onError('');
    } catch (error) {
      let errorMessage = error.response?.status || '';
      if (errorMessage) errorMessage += ': ';
      errorMessage += error.response?.data?.message || 'Failed to concatenate'
      onError(errorMessage);
    }
    setStr1('');
    setStr2('');
  };

  return (
    <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={str1}
          onChange={(e) => setStr1(e.target.value)}
          placeholder="Parameter str1"
        />
        <Input
          type="text"
          value={str2}
          onChange={(e) => setStr2(e.target.value)}
          placeholder="Parameter str2"
        />
      <Button type="submit">Send</Button>
    </Form>
  );
};

export default StrConcat;
