import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { studentService } from '../services/studentService';
import StudentForm from '../components/StudentForm';

export default function FormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const isEditing = id !== 'new';
  
  const [initialData, setInitialData] = useState(null);
  const [isFetching, setIsFetching] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null); // Backend error state

  useEffect(() => {
    if (isEditing) {
      const fetchStudent = async () => {
        try {
          const data = await studentService.getStudentById(id);
          // Standardize ID format for the form
          setInitialData({ ...data, id: data._id || data.id });
        } catch (err) {
          console.error("Student not found", err);
          navigate('/dashboard');
        } finally {
          setIsFetching(false);
        }
      };
      fetchStudent();
    }
  }, [id, isEditing, navigate]);

  const handleSubmit = async (formData) => {
    setIsSaving(true);
    setError(null);
    try {
      if (isEditing) {
        await studentService.updateStudent(id, formData);
      } else {
        await studentService.addStudent(formData);
      }
      navigate('/dashboard');
    } catch (err) {
      console.error("Failed to save", err);
      // Display backend validation error
      setError(err.message || 'An error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          {isEditing ? 'Edit Student' : 'Add New Student'}
        </h1>
        <p className="text-slate-500 mt-1">
          {isEditing ? 'Update the details below.' : 'Fill in the details to enroll a new student.'}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3 mb-6">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Failed to save student</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {isFetching ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        </div>
      ) : (
        <StudentForm 
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
          isLoading={isSaving}
        />
      )}

    </div>
  );
}
