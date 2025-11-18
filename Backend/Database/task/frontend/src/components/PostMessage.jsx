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
  background-color: #164e63;
  color: #e4e4e4;
  border: 1px solid #0e7490;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0e7490;
  }
`;

const PostMessage = ({ onError, onResult }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const payload = { content };

            const response = await axios.post('/api/messages',
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            onResult({
                status: response.status,
                body: response.data
            });
            onError('');
            setContent('');
        } catch (error) {
            let errorMessage = error.response?.status || '';
            if (errorMessage) errorMessage += ': ';
            errorMessage += error.response?.data?.message || 'Failed to send message'
            onError(errorMessage);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter message content"
            />
            <Button type="submit">Send Message</Button>
        </Form>
    );
};

export default PostMessage;