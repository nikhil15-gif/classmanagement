import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-700 transition-colors">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">EduManage</span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="hidden sm:block text-sm font-medium text-slate-600">
                  Hi, {user.name}
                </span>
                <Link to="/dashboard" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                  Dashboard
                </Link>
                <Button variant="secondary" onClick={handleLogout} className="!py-1.5 !px-3">
                  <LogOut className="w-4 h-4 mr-1.5" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="secondary" className="!py-1.5 !px-3">
                    <LogIn className="w-4 h-4 mr-1.5" /> Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="!py-1.5 !px-3">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
          
        </div>
      </div>
    </nav>
  );
}
