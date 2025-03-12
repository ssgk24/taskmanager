import React from 'react';
import { Task } from '../types';
import { Clock, Trash2, Edit2, CheckCircle, Circle, ArrowRightCircle } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
}

export function TaskCard({ task, onDelete, onEdit, onStatusChange }: TaskCardProps) {
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const statusColors = {
    pending: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-emerald-100 text-emerald-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="text-gray-400 hover:text-gray-600"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-gray-400 hover:text-red-600"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">{task.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
        </span>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
          {task.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </span>
        {task.dueDate && (
          <span className="flex items-center text-xs text-gray-500">
            <Clock size={14} className="mr-1" />
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-500">
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </span>
        <div className="flex space-x-2">
          {task.status !== 'completed' && (
            <button
              onClick={() => onStatusChange(task.id, task.status === 'pending' ? 'in-progress' : 'completed')}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              {task.status === 'pending' ? (
                <>
                  <ArrowRightCircle size={16} className="mr-1" />
                  Start
                </>
              ) : (
                <>
                  <CheckCircle size={16} className="mr-1" />
                  Complete
                </>
              )}
            </button>
          )}
          {task.status === 'completed' && (
            <button
              onClick={() => onStatusChange(task.id, 'pending')}
              className="flex items-center text-sm text-gray-600 hover:text-gray-800"
            >
              <Circle size={16} className="mr-1" />
              Reopen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}