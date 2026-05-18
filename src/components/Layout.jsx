import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CursorGlow from './CursorGlow';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <CursorGlow />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
