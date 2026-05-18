import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchItem = async ({ queryKey }) => {
  const [_key, id] = queryKey;
  const res = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
  return res.data;
};

export const ProductDetail = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const {
    data: item,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: fetchItem,
  });

  if (isLoading) return <h2>Загрузка товара... ⏳</h2>;
  if (isError) return <h2 style={{ color: 'red' }}>Ошибка при загрузке!</h2>;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
      }}
    >
      <button
        onClick={() => nav(-1)}
        style={{
          width: '150px',
          padding: '10px',
          cursor: 'pointer',
          backgroundColor: '#333',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        ← Назад в каталог
      </button>

      {/* Карточка с детальной информацией */}
      <div
        style={{
          display: 'flex',
          gap: '40px',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          border: '1px solid #ddd',
        }}
      >
        {/* Блок с картинкой */}
        <div style={{ display: 'flex', width: '400px', flexShrink: 0 }}>
          <img
            src={item.images[0]}
            alt={item.title}
            style={{ width: '100%', borderRadius: '10px', objectFit: 'cover' }}
            onError={(e) => (e.target.src = 'https://via.placeholder.com/400')}
          />
        </div>

        {/* Блок с текстом */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h1 style={{ margin: 0 }}>{item.title}</h1>
          <span
            style={{
              padding: '5px 10px',
              backgroundColor: '#eee',
              alignSelf: 'flex-start',
              borderRadius: '5px',
            }}
          >
            Категория: {item.category.name}
          </span>
          <p style={{ fontSize: '18px', lineHeight: '1.5', color: '#555' }}>
            {item.description}
          </p>
          <strong
            style={{ fontSize: '32px', color: '#000', marginTop: 'auto' }}
          >
            ${item.price}
          </strong>
        </div>
      </div>
    </div>
  );
};
