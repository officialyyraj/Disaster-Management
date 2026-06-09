import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { Offline } from '../pages/Offline';

export const AppLayout = ({ children }) => {
  const isOnline = useOnlineStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOnline) {
      navigate('/offline');
    }
  }, [isOnline, navigate]);

  if (!isOnline) {
    return <Offline />;
  }

  return children;
};
