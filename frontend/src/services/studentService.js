/**
 * Student API Service
 * Now fully integrated with the Node.js backend!
 */

// We access the env variable injected by Vite
const API_URL = import.meta.env.VITE_API_BASE_URL + '/api/students';

/**
 * Helper to get authorization headers
 */
const authHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

/**
 * Helper function to handle standard fetch responses and throw errors
 * if the response is not OK.
 */
async function handleResponse(response) {
  const json = await response.json();
  if (!response.ok) {
    if (response.status === 401) {
       // Token expired or invalid
       localStorage.removeItem('token');
       localStorage.removeItem('user');
       window.location.href = '/login'; // Force redirect to login
    }
    const errorMsg = json.message || 'An error occurred with the API';
    const validationErrors = json.errors && json.errors.length > 0 ? ` (${json.errors.join(', ')})` : '';
    throw new Error(errorMsg + validationErrors);
  }
  return json.data;
}

export const studentService = {
  /**
   * Fetch all students (supports pagination, search, sort via backend)
   */
  async getStudents(search = '') {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
    const response = await fetch(`${API_URL}${query}`, {
      headers: { ...authHeader() }
    });
    const data = await handleResponse(response);
    return data.students; 
  },

  /**
   * Fetch a single student by ID
   */
  async getStudentById(id) {
    const response = await fetch(`${API_URL}/${id}`, {
      headers: { ...authHeader() }
    });
    return await handleResponse(response);
  },

  /**
   * Add a new student
   */
  async addStudent(studentData) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify(studentData)
    });
    return await handleResponse(response);
  },

  /**
   * Update an existing student
   */
  async updateStudent(id, studentData) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify(studentData)
    });
    return await handleResponse(response);
  },

  /**
   * Delete a student
   */
  async deleteStudent(id) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { ...authHeader() }
    });
    return await handleResponse(response);
  }
};
