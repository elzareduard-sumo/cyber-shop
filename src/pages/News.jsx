import { useLoaderData, useSearchParams, useNavigate, Link, useNavigation } from 'react-router-dom';
import axios from 'axios';

export const newsLoader = async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const limit = 10;
  const skip = (page - 1) * limit; 

  const response = await axios.get(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);
  return { posts: response.data.posts, total: response.data.total, page };
};

export const News = () => {
  const { posts, total, page } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  
  const totalPages = Math.ceil(total / 10);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  if (navigation.state === 'loading') {
    return <h2 style={{ textAlign: 'center' }}>Загрузка новостей... ⏳</h2>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <h1>Новости индустрии</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', marginBottom: '30px' }}>
        {posts.map((post) => (
          <div key={post.id} style={{ display: 'flex', flexDirection: 'column', padding: '20px', border: '1px solid #333', borderRadius: '8px' }}>
            <Link to={`/news/${post.id}`} style={{ textDecoration: 'none', color: '#000' }}>
              <h2 style={{ margin: '0 0 10px 0' }}>{post.title}</h2>
            </Link>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '14px' }}>
              <span>Автор ID: {post.userId}</span>
              <span>{new Date().toLocaleDateString()} {/* Заглушка даты */}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button 
          onClick={() => handlePageChange(page - 1)} 
          disabled={page <= 1}
          style={{ padding: '8px 16px', cursor: page <= 1 ? 'not-allowed' : 'pointer' }}
        >
          Назад
        </button>
        
        <span style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
          Страница {page} из {totalPages}
        </span>

        <button 
          onClick={() => handlePageChange(page + 1)} 
          disabled={page >= totalPages}
          style={{ padding: '8px 16px', cursor: page >= totalPages ? 'not-allowed' : 'pointer' }}
        >
          Вперед
        </button>
      </div>
    </div>
  );
};