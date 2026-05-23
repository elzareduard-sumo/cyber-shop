import { Outlet, NavLink } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export const Layout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', backgroundColor: '#1a1a1a', color: '#fff' }}>
        <h2 style={{ margin: 0 }}>Cyber-Shop</h2>
        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <NavLink to="/" style={({ isActive }) => ({ color: isActive ? '#00ffcc' : '#fff', textDecoration: 'none', fontWeight: 'bold' })}>Главная</NavLink>
          <NavLink to="/advanced-catalog" style={({ isActive }) => ({ color: isActive ? '#00ffcc' : '#fff', textDecoration: 'none', fontWeight: 'bold' })}>Каталог</NavLink>
          <NavLink to="/news" style={({ isActive }) => ({ color: isActive ? '#00ffcc' : '#fff', textDecoration: 'none', fontWeight: 'bold' })}>Новости</NavLink>
          {useAuthStore((state) => state.token) ? (
            <NavLink to="/profile" style={({ isActive }) => ({ color: isActive ? '#00ffcc' : '#fff', textDecoration: 'none', fontWeight: 'bold', backgroundColor: '#333', padding: '5px 15px', borderRadius: '5px' })}>Профиль</NavLink>
          ) : (
            <NavLink to="/login" style={({ isActive }) => ({ color: isActive ? '#00ffcc' : '#fff', textDecoration: 'none', fontWeight: 'bold', backgroundColor: '#00ffcc', color: '#000', padding: '5px 15px', borderRadius: '5px' })}>Войти</NavLink>
          )}
        </nav>
      </header>
      <main style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
};