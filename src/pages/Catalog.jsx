import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useFilterStore } from '../store/useFilterStore';

const url = 'https://api.escuelajs.co/api/v1/products';

const fetchItems = async ({ queryKey }) => {
  const [_, { title, categoryId, price }] = queryKey;
  const params = {};
  if (title) params.title = title;
  if (categoryId) params.categoryId = categoryId;
  if (price) params.price = price;

  const res = await axios.get(url, { params });
  return res.data;
};

const addItem = async (form) => {
  const res = await axios.post(url, {
    ...form,
    price: Number(form.price),
    categoryId: Number(form.categoryId),
    images: [form.image],
  });
  return res.data;
};

const editItem = async ({ id, form }) => {
  const res = await axios.put(`${url}/${id}`, {
    title: form.title,
    price: Number(form.price),
    description: form.description,
    categoryId: Number(form.categoryId),
    images: [form.image],
  });
  return res.data;
};

const delItem = async (id) => {
  const res = await axios.delete(`${url}/${id}`);
  return res.data;
};

export const Catalog = () => {
  const client = useQueryClient();
  const { title, categoryId, price, setFilter, resetFilters } =
    useFilterStore();

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    categoryId: '',
  });

  const {
    data: items,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products', { title, categoryId, price }],
    queryFn: fetchItems,
    staleTime: 60 * 1000,
  });

  const addMut = useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      client.invalidateQueries(['products']);
      setIsOpen(false);
      setForm({
        title: '',
        price: '',
        description: '',
        image: '',
        categoryId: '',
      });
    },
  });

  const editMut = useMutation({
    mutationFn: editItem,
    onSuccess: () => {
      client.invalidateQueries(['products']);
      setIsEdit(false);
      setActiveId(null);
      setForm({
        title: '',
        price: '',
        description: '',
        image: '',
        categoryId: '',
      });
    },
  });

  // Мутация удаления товара
  const delMut = useMutation({
    mutationFn: delItem,
    onSuccess: () => {
      client.invalidateQueries(['products']);
    },
  });

  // Открытие окна создания
  const handleOpenAdd = () => {
    setForm({
      title: '',
      price: '',
      description: '',
      image: '',
      categoryId: '1',
    });
    setIsOpen(true);
  };

  // Открытие окна редактирования при клике на карточку
  const handleOpenEdit = (item) => {
    setActiveId(item.id);
    setForm({
      title: item.title,
      price: item.price,
      description: item.description,
      image: item.images[0] || '',
      categoryId: item.category?.id || '1',
    });
    setIsEdit(true);
  };

  // Обработчик удаления (с остановкой всплытия события)
  const handleDelete = (e, id) => {
    e.stopPropagation(); // Запрещаем открытие модалки редактирования карточки
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      delMut.mutate(id);
    }
  };

  // Отправка формы (создание или редактирование)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      editMut.mutate({ id: activeId, form });
    } else {
      addMut.mutate(form);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '30px',
        alignItems: 'flex-start',
        position: 'relative',
      }}
    >
      {/* Боковая панель (Фильтры + Кнопка добавления) */}
      <aside
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          width: '250px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
        }}
      >
        <button
          onClick={handleOpenAdd}
          style={{
            padding: '12px',
            backgroundColor: '#00ffcc',
            color: '#000',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          + Добавить продукт
        </button>

        <h3>Фильтры</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>Поиск по названию:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setFilter('title', e.target.value)}
            placeholder="Введите название..."
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
            placeholder="Макс. цена"
            style={{ padding: '8px' }}
          />
        </div>

        <button
          onClick={resetFilters}
          style={{
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#ff4d4f',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Сбросить фильтры
        </button>
      </aside>

      {/* Сетка товаров */}
      <section style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h1>Управление каталогом товаров</h1>

        {isLoading && <h2>Загрузка списка товаров... ⏳</h2>}
        {isError && (
          <h2 style={{ color: 'red' }}>Ошибка при загрузке данных!</h2>
        )}

        {!isLoading && !isError && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {items?.length === 0 ? (
              <h3>Товары не найдены.</h3>
            ) : (
              items?.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenEdit(item)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '220px',
                    border: '1px solid #ddd',
                    padding: '15px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: '#fff',
                    transition: '0.2s',
                  }}
                >
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '5px',
                    }}
                    onError={(e) =>
                      (e.target.src = 'https://via.placeholder.com/150')
                    }
                  />
                  <h4 style={{ margin: '10px 0 5px 0', fontSize: '16px' }}>
                    {item.title}
                  </h4>
                  <strong style={{ fontSize: '18px', marginBottom: '15px' }}>
                    ${item.price}
                  </strong>

                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    style={{
                      marginTop: 'auto',
                      padding: '6px',
                      backgroundColor: '#ff4d4f',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Удалить
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </section>

      {/* Модальное окно (Создание / Редактирование) */}
      {(isOpen || isEdit) && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              width: '400px',
              padding: '30px',
              backgroundColor: '#fff',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            }}
          >
            <h2>{isEdit ? 'Редактировать товар' : 'Добавить новый товар'}</h2>

            <input
              type="text"
              placeholder="Название товара"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              style={{ padding: '10px' }}
            />
            <input
              type="number"
              placeholder="Цена ($)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
              style={{ padding: '10px' }}
            />
            <input
              type="text"
              placeholder="Ссылка на изображение"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              required
              style={{ padding: '10px' }}
            />
            <input
              type="number"
              placeholder="ID Категории"
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              required
              style={{ padding: '10px' }}
            />
            <textarea
              placeholder="Описание товара"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
              style={{ padding: '10px', height: '80px', resize: 'none' }}
            />

            <div
              style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'flex-end',
                marginTop: '10px',
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setIsEdit(false);
                }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#ccc',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={addMut.isLoading || editMut.isLoading}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#00ffcc',
                  color: '#000',
                  border: 'none',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                {addMut.isLoading || editMut.isLoading
                  ? 'Сохранение...'
                  : 'Сохранить'}
              </button>
            </div>

            {(addMut.isError || editMut.isError) && (
              <span style={{ color: 'red', textAlign: 'center' }}>
                Ошибка при сохранении данных!
              </span>
            )}
          </form>
        </div>
      )}
    </div>
  );
};
