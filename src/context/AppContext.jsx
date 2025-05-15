import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // State simpan data user login & admin
  const [user, setUser] = useState(null);  // {username, role:'user'|'admin'}
  
  // Data café simpan di state lokal (mock)
  const [cafes, setCafes] = useState(() => {
    // Ambil dari localStorage kalau ada
    const saved = localStorage.getItem('cafes');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: 'Kopi Kenangan',
        location: 'Jl. Antasari',
        open_hours: '08:00 - 22:00',
        rating: 4.5,
        description: 'Tempat nongkrong hits dengan suasana cozy.',
        image: 'https://source.unsplash.com/400x300/?coffee,shop',
        reviews: [
          { id: 1, username: 'user1', comment: 'Mantap kopinya!', rating: 5 }
        ],
      },
      {
        id: 2,
        name: 'Ngopi Dulu',
        location: 'Jl. Z.A. Pagar Alam',
        open_hours: '10:00 - 23:00',
        rating: 4.2,
        description: 'Cafe industrial dengan kopi spesialti.',
        image: 'https://source.unsplash.com/400x300/?cafe',
        reviews: [],
      }
    ];
  });

  // Simpan ke localStorage tiap kali cafes berubah
  useEffect(() => {
    localStorage.setItem('cafes', JSON.stringify(cafes));
  }, [cafes]);

  // Fungsi login (sederhana tanpa backend)
  const login = (username, role = 'user') => {
    setUser({ username, role });
  };

  const logout = () => setUser(null);

  // CRUD Cafe (hanya admin)
  const addCafe = (cafe) => {
    setCafes(prev => [...prev, { ...cafe, id: Date.now(), reviews: [] }]);
  };

  const editCafe = (id, updatedCafe) => {
    setCafes(prev => prev.map(c => c.id === id ? { ...c, ...updatedCafe } : c));
  };

  const deleteCafe = (id) => {
    setCafes(prev => prev.filter(c => c.id !== id));
  };

  // Tambah review user
  const addReview = (cafeId, review) => {
    setCafes(prev => prev.map(c => {
      if (c.id === cafeId) {
        const newReviews = [...c.reviews, { ...review, id: Date.now() }];
        // Update rating rata-rata
        const avgRating = newReviews.reduce((a,b) => a + b.rating, 0) / newReviews.length;
        return { ...c, reviews: newReviews, rating: parseFloat(avgRating.toFixed(2)) };
      }
      return c;
    }));
  };

  return (
    <AppContext.Provider value={{
      user, login, logout,
      cafes, addCafe, editCafe, deleteCafe,
      addReview,
    }}>
      {children}
    </AppContext.Provider>
  );
};

