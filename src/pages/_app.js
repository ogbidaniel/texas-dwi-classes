import '../styles/globals.css';
import { useRouter } from 'next/router';
import { useEffect, createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for user session
    const storedUser = localStorage.getItem('dwi_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('dwi_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dwi_user');
    router.push('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
