import { useState } from 'react';
import Header from './components/Header';import Footer from './components/Footer';import Menu from './components/Menu';import Home from './pages/Home';import Student from './pages/Student';import Login from './pages/Login';import Teacher from './pages/Teacher';import Admin from './pages/Admin';
export default function App() {
  const [view, setView] = useState('home');
  const go = (nextView) => {setView(nextView);window.scrollTo({ top: 0, behavior: 'smooth' });};
  if (view === 'home') return <Home go={go} />;
  let body = <Student />;
  if (view === 'teacher-login') body = <Login role="docente" onOk={() => go('teacher')} />;
  if (view === 'admin-login') body = <Login role="admin" onOk={() => go('admin')} />;
  if (view === 'teacher') body = <Teacher />;
  if (view === 'admin') body = <Admin />;
  return <div className="appShell"><Header onHome={() => go('home')} /><Menu go={go} /><div className="container">{body}</div><Footer /></div>;
}
