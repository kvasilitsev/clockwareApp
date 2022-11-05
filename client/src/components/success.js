import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => { 
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {      
      navigate('/', { replace: true });
    }, 8000);
  });
  return (
    <div>     
      <p>Thank you for your order. You will shortly receive an order confirmation email</p>
    </div>
  );
}

export default Success;


