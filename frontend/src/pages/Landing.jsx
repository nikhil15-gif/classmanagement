import { Link } from 'react-router-dom';
import { Users, Database, ShieldCheck, ArrowRight } from 'lucide-react';
import Button from '../components/Button';

export default function Landing() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
          Modern <span className="text-indigo-600">Student Management</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          A clean, responsive, and intuitive interface to manage your institution's students. 
          Built with React, Tailwind CSS, and best practices.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/dashboard">
            <Button className="text-lg px-8 py-3">
              Get Started <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
            <Database className="text-indigo-600 w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Full CRUD Operations</h3>
          <p className="text-slate-600">Create, Read, Update, and Delete student records seamlessly with fake API latency simulation.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
            <Users className="text-indigo-600 w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Clean Component UI</h3>
          <p className="text-slate-600">Reusable components, unified styling, and fully responsive grid/flexbox layouts.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
            <ShieldCheck className="text-indigo-600 w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Future-Ready</h3>
          <p className="text-slate-600">Services are abstracted. Plug in your Node.js/MongoDB backend tomorrow without changing the UI.</p>
        </div>
      </div>

    </div>
  );
}
