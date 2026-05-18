import { useLoaderData, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const newsDetailLoader = async ({ params }) => {
  const [postResponse, commentsResponse] = await Promise.all([
    axios.get(`https://dummyjson.com/posts/${params.id}`),
    axios.get(`https://dummyjson.com/posts/${params.id}/comments`),
  ]);

  return { 
    post: postResponse.data, 
    comments: commentsResponse.data.comments 
  };
};

export const NewsDetail = () => {
  const { post, comments } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '800px', margin: '0 auto', width: '100%', gap: '20px' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ alignSelf: 'flex-start', padding: '8px 16px', cursor: 'pointer' }}
      >
        ← Назад к новостям
      </button>

      <article style={{ display: 'flex', flexDirection: 'column', gap: '15px', paddingBottom: '20px', borderBottom: '2px solid #eee' }}>
        <h1 style={{ margin: 0 }}>{post.title}</h1>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>{post.body}</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          {post.tags.map(tag => (
            <span key={tag} style={{ backgroundColor: '#eee', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>#{tag}</span>
          ))}
        </div>
      </article>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h2>Комментарии ({comments.length})</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} style={{ display: 'flex', flexDirection: 'column', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
              <strong style={{ marginBottom: '5px' }}>{comment.user.fullName}</strong>
              <p style={{ margin: 0 }}>{comment.body}</p>
            </div>
          ))
        ) : (
          <p>Комментариев пока нет.</p>
        )}
      </section>
    </div>
  );
};