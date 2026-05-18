import { useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'red' }}>
      <h1>Упс! Произошла ошибка 😥</h1>
      <p>{error?.message || 'Не удалось загрузить данные'}</p>
    </div>
  );
};