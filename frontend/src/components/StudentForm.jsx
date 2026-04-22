import { useState, useEffect } from 'react';
import Button from './Button';

/**
 * StudentForm Component
 * A reusable form for creating AND editing students.
 * Uses `useState` to manage local form data before submission.
 */
export default function StudentForm({ initialData, onSubmit, onCancel, isLoading }) {
  // useState holds our form fields. It initializes with initialData if editing, or empty strings if creating.
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    course: ''
  });
  const [errors, setErrors] = useState({});

  // useEffect watches for changes in `initialData`.
  // If we start editing a different student, it populates the form immediately.
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Basic frontend validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age || isNaN(formData.age) || formData.age < 5) newErrors.age = 'Valid age (5+) is required';
    if (!formData.course.trim()) newErrors.course = 'Course is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload (default browser behavior)
    if (validateForm()) {
      // Input values are strings, but the backend strictly expects a number for age
      onSubmit({
        ...formData,
        age: Number(formData.age)
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200">
      
      {/* Semantic labels and inputs */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
          Student Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all ${
            errors.name ? 'border-red-500' : 'border-slate-300'
          }`}
          placeholder="e.g. Jane Doe"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium text-slate-700 mb-1">
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all ${
            errors.age ? 'border-red-500' : 'border-slate-300'
          }`}
          placeholder="e.g. 20"
        />
        {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
      </div>

      <div>
        <label htmlFor="course" className="block text-sm font-medium text-slate-700 mb-1">
          Course
        </label>
        <input
          type="text"
          id="course"
          name="course"
          value={formData.course}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all ${
            errors.course ? 'border-red-500' : 'border-slate-300'
          }`}
          placeholder="e.g. Computer Science"
        />
        {errors.course && <p className="mt-1 text-sm text-red-600">{errors.course}</p>}
      </div>

      <div className="flex gap-3 pt-4 border-t border-slate-100">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onCancel}
          className="flex-1"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          variant="primary" 
          className="flex-1"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : (initialData ? 'Update Student' : 'Add Student')}
        </Button>
      </div>
    </form>
  );
}
