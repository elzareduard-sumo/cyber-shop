import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Navigate } from 'react-router-dom';
import { api } from '../api/axiosInstance';
import { useAuthStore } from '../store/useAuthStore';

const loginRequest = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const Login = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const token = useAuthStore((state) => state.token);

  const [form, setForm] = useState({ email: 'john@mail.com', password: 'changeme' });


  if (token) {
    return <Navigate to="/profile" replace />;
  }

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      setToken(data.access_token);
      navigate('/profile');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(form);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <form 
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '350px', padding: '30px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
      >
        <h2 style={{ textAlign: 'center', margin: 0 }}>Вход в систему</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Email:</label>
          <input 
            type="email" 
            value={form.email} 
            onChange={(e) => setForm({ ...form, email: e.target.value })} 
            required 
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Пароль:</label>
          <input 
            type="password" 
            value={form.password} 
            onChange={(e) => setForm({ ...form, password: e.target.value })} 
            required 
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loginMutation.isLoading}
          style={{ padding: '12px', backgroundColor: '#1a1a1a', color: '#00ffcc', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
        >
          {loginMutation.isLoading ? 'Вход...' : 'Войти'}
        </button>

        {loginMutation.isError && <span style={{ color: 'red', textAlign: 'center' }}>Неверный email или пароль!</span>}
      </form>
    </div>
  );
};