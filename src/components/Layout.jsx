import { Outlet, NavLink } from 'react-router-dom';

export const Layout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', backgroundColor: '#1a1a1a', color: '#fff' }}>
        <h2 style={{ margin: 0 }}>Cyber-Shop</h2>
        <nav style={{ display: 'flex', gap: '20px' }}>
          <NavLink to="/" style={({ isActive }) => ({ color: isActive ? '#00ffcc' : '#fff', textDecoration: 'none', fontWeight: 'bold' })}>Главная</NavLink>
          <NavLink to="/products" style={({ isActive }) => ({ color: isActive ? '#00ffcc' : '#fff', textDecoration: 'none', fontWeight: 'bold' })}>Каталог</NavLink>
          <NavLink to="/cart" style={({ isActive }) => ({ color: isActive ? '#00ffcc' : '#fff', textDecoration: 'none', fontWeight: 'bold' })}>Корзина</NavLink>
        </nav>
      </header>
      <main style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
};