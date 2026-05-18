import { useLoaderData, useNavigation } from 'react-router-dom';
import axios from 'axios';

export const productsLoader = async () => {
  const response = await axios.get('https://dummyjson.com/products');
  return response.data.products;
};

export const Products = () => {
  const products = useLoaderData(); 
  const navigation = useNavigation(); 

  
  if (navigation.state === 'loading') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <h2>Загрузка товаров... ⏳</h2>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
      <h1>Каталог товаров</h1>
      
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {products.map((product) => (
          <div key={product.id} style={{ display: 'flex', flexDirection: 'column', width: '280px', padding: '15px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <img src={product.thumbnail} alt={product.title} style={{ width: '100%', height: '150px', objectFit: 'contain', marginBottom: '15px' }} />
            <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{product.title}</h3>
            <p style={{ flexGrow: 1, color: '#666', fontSize: '14px', margin: '0 0 15px 0' }}>{product.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: '18px' }}>${product.price}</span>
              <button style={{ padding: '8px 16px', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>В корзину</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};