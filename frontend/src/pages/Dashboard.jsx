import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Loader2, Users, AlertCircle, RefreshCw } from 'lucide-react';
import { studentService } from '../services/studentService';
import StudentCard from '../components/StudentCard';
import Button from '../components/Button';

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state
  const [searchTerm, setSearchTerm] = useState('');
  
  const navigate = useNavigate();

  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Use the backend's native search capabilities
      const data = await studentService.getStudents(searchTerm);
      setStudents(data);
    } catch (err) {
      console.error("Failed to fetch students", err);
      setError(err.message || 'Failed to connect to the server.');
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm]);

  // Debounce the search input so we don't spam the API on every keystroke
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchStudents();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, fetchStudents]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      // OPTIMISTIC UI UPDATE: Remove from UI immediately before API finishes
      const previousStudents = [...students];
      setStudents(prev => prev.filter(s => s._id !== id && s.id !== id));

      try {
        await studentService.deleteStudent(id);
        // Success! UI is already updated.
      } catch (err) {
        console.error("Failed to delete", err);
        alert(`Failed to delete: ${err.message}`);
        // REVERT the optimistic update if the API call failed
        setStudents(previousStudents);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Students Directory</h1>
          <p className="text-slate-500">Manage all your enrolled students</p>
        </div>
        
        <Button onClick={() => navigate('/form/new')}>
          <Plus className="w-4 h-4" /> Add Student
        </Button>
      </div>

      <div className="mb-8 relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
          placeholder="Search students via API..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Error State with Retry Button */}
      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-6 rounded-xl flex flex-col items-center text-center mb-8">
          <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
          <p className="font-semibold mb-1">Error Loading Data</p>
          <p className="mb-4 text-sm">{error}</p>
          <Button variant="secondary" onClick={fetchStudents}>
            <RefreshCw className="w-4 h-4 mr-2" /> Try Again
          </Button>
        </div>
      ) : isLoading && students.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Fetching from backend...</p>
        </div>
      ) : students.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {students.map(student => (
            <StudentCard 
              // Mongoose uses _id, but our dummy data used id. We handle both for robustness.
              key={student._id || student.id} 
              student={{...student, id: student._id || student.id}} 
              onEdit={(s) => navigate(`/form/${s.id}`)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-1">No students found</h3>
          <p className="text-slate-500 mb-4">
            {searchTerm ? `No results match "${searchTerm}" in the database.` : "Your database is empty."}
          </p>
          {!searchTerm && (
            <Button onClick={() => navigate('/form/new')} variant="secondary">
              <Plus className="w-4 h-4" /> Add your first student
            </Button>
          )}
        </div>
      )}

    </div>
  );
}
