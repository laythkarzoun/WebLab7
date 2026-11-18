import { Outlet } from 'react-router';
import { useLocalStorage } from '../hooks/useLocalStorage';
import NavBar from './NavBar';

export default function Layout() {
  const [theme, setTheme] = useLocalStorage('assignment7-theme', 'light');
  const currentTheme = theme === 'dark' ? 'dark' : 'light';
  return <div className={`app ${currentTheme}`}>
    <NavBar theme={currentTheme} onToggleTheme={() => setTheme((value) => value === 'dark' ? 'light' : 'dark')} />
    <main className="container"><Outlet /></main>
    <footer className="footer">Mini Shop · React Assignment 7 · DummyJSON API</footer>
  </div>;
}
