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
  width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #4c1d1d;
  color: #e4e4e4;
  border: 1px solid #822727;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #822727;
  }
`;

const DeleteMessage = ({ onError, onResult }) => {
    const [messageId, setMessageId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`/api/messages/${messageId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            onResult({
                status: response.status,
                body: response.data
            });
            onError('');
            setMessageId('');
        } catch (error) {
            let errorMessage = error.response?.status || '';
            if (errorMessage) errorMessage += ': ';
            errorMessage += error.response?.data?.message || 'Failed to delete message'
            onError(errorMessage);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                type={"text"}
                value={messageId}
                onChange={(e) => setMessageId(e.target.value)}
                placeholder="Enter message ID"
            />
            <Button type="submit">Delete Message</Button>
        </Form>
    );
};

export default DeleteMessage;