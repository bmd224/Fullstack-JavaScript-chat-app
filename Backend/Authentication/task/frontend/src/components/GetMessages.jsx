import styled from '@emotion/styled';
import axios from 'axios';

const Button = styled.button`
  padding: 8px 16px;
  background-color: #1b4332;
  color: #e4e4e4;
  border: 1px solid #2d6a4f;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #2d6a4f;
  }
`;

const GetMessages = ({ onError, onResult }) => {
    const handleClick = async () => {
        try {
            const response = await axios.get('/api/messages', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response);
            onResult({
                status: response.status,
                body: response.data
            });
            onError('');
        } catch (error) {
            let errorMessage = error.response?.status || '';
            if (errorMessage) errorMessage += ': ';
            errorMessage += error.response?.data?.message || 'Failed to fetch messages'
            onError(errorMessage);
        }
    };

    return (
        <Button onClick={handleClick}>
            GET /api/messages
        </Button>
    );
};

export default GetMessages;