import { User, Book, Hash, Edit2, Trash2 } from 'lucide-react';
import Button from './Button';

/**
 * StudentCard Component
 * Displays a single student's data.
 * Instead of duplicating this UI everywhere, we abstract it into a component
 * and pass the student data down as `props`.
 */
export default function StudentCard({ student, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              {student.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-lg leading-tight">{student.name}</h3>
              <p className="text-slate-500 text-sm flex items-center gap-1 mt-1">
                <Hash className="w-3 h-3" /> ID: {student.id}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <User className="w-4 h-4 text-slate-400" />
            <span>Age: <span className="font-medium text-slate-800">{student.age}</span> years</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <Book className="w-4 h-4 text-slate-400" />
            <span>Course: <span className="font-medium text-slate-800">{student.course}</span></span>
          </div>
        </div>

        <div className="flex gap-2 border-t border-slate-100 pt-4 mt-auto">
          {/* We use CLOSURES here: the onClick handler forms a closure over the `student` object */}
          <Button 
            variant="secondary" 
            className="flex-1 py-1.5 text-sm" 
            onClick={() => onEdit(student)}
          >
            <Edit2 className="w-4 h-4" /> Edit
          </Button>
          <Button 
            variant="danger" 
            className="flex-1 py-1.5 text-sm" 
            onClick={() => onDelete(student.id)}
          >
            <Trash2 className="w-4 h-4" /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
