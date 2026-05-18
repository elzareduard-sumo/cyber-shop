import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useFilterStore } from '../store/useFilterStore';

const fetchProducts = async ({ queryKey }) => {
  const [_key, { title, categoryId, price }] = queryKey;
  
  const params = {};
  if (title) params.title = title;
  if (categoryId) params.categoryId = categoryId;
  if (price) params.price = price;

  const response = await axios.get('https://api.escuelajs.co/api/v1/products', { params });
  return response.data;
};

export const Catalog = () => {
  const { title, categoryId, price, setFilter, resetFilters } = useFilterStore();
  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['products', { title, categoryId, price }],
    queryFn: fetchProducts,
  });

  return (
    <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
      
      {/* Боковая панель с фильтрами */}
      <aside style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '250px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Фильтры</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>Название:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setFilter('title', e.target.value)} 
            placeholder="Например: generic"
            style={{ padding: '8px' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>ID Категории:</label>
          <input 
            type="number" 
            value={categoryId} 
            onChange={(e) => setFilter('categoryId', e.target.value)} 
            placeholder="1, 2, 3..."
            style={{ padding: '8px' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>Цена ($):</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setFilter('price', e.target.value)} 
            placeholder="Например: 100"
            style={{ padding: '8px' }}
          />
        </div>

        <button 
          onClick={resetFilters}
          style={{ marginTop: '10px', padding: '10px', backgroundColor: '#ff4d4f', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Сбросить фильтры
        </button>
      </aside>

      {/* Основная часть с товарами */}
      <section style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h1>Продвинутый каталог (TanStack Query)</h1>

        {/* Обработка состояний Loading и Error */}
        {isLoading && <h2>Загрузка товаров... ⏳</h2>}
        {isError && <h2 style={{ color: 'red' }}>Ошибка: {error.message}</h2>}

        {/* Состояние Success: Вывод сетки товаров (на Flexbox) */}
        {!isLoading && !isError && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {products?.length === 0 ? (
              <h3>По вашему запросу ничего не найдено.</h3>
            ) : (
              products?.map((product) => (
                <div key={product.id} style={{ display: 'flex', flexDirection: 'column', width: '220px', border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
                  <img src={product.images[0]} alt={product.title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '5px' }} onError={(e) => e.target.src = 'https://via.placeholder.com/180'} />
                  <h4 style={{ margin: '10px 0 5px 0' }}>{product.title}</h4>
                  <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#666', flexGrow: 1 }}>Категория: {product.category.name}</p>
                  <strong style={{ fontSize: '18px' }}>${product.price}</strong>
                </div>
              ))
            )}
          </div>
        )}
      </section>

    </div>
  );
};