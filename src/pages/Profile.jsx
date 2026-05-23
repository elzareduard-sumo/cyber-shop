import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/axiosInstance';
import { useAuthStore } from '../store/useAuthStore';
import { useEffect } from 'react';

const fetchProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};

export const Profile = () => {
  const logout = useAuthStore((state) => state.logout);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const { data: profile, isLoading, isError } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  useEffect(() => {
    if (profile) {
      setUser(profile);
    }
  }, [profile, setUser]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) return <h2 style={{ textAlign: 'center' }}>Загрузка профиля... ⏳</h2>;
  if (isError) return <h2 style={{ textAlign: 'center', color: 'red' }}>Ошибка доступа!</h2>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '40px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #ddd', width: '400px', alignItems: 'center' }}>
        <img src={profile.avatar} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />
        <h1 style={{ margin: '10px 0 0 0' }}>{profile.name}</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', marginTop: '20px', backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 'bold' }}>ID:</span>
            <span>{profile.id}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 'bold' }}>Email:</span>
            <span>{profile.email}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 'bold' }}>Роль:</span>
            <span>{profile.role}</span>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          style={{ padding: '10px 20px', backgroundColor: '#ff4d4f', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px', width: '100%' }}
        >
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
};