import React, { useState } from 'react';
import { PlusCircle, ListTodo } from 'lucide-react';
import { Task } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TaskForm } from './components/TaskForm';
import { TaskCard } from './components/TaskCard';

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<Task['status'] | 'all'>('all');

  const handleAddTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    const task: Task = {
      ...newTask,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, task]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const handleStatusChange = (id: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  const filteredTasks = tasks.filter(task => 
    filter === 'all' ? true : task.status === filter
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <ListTodo className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <PlusCircle size={20} className="mr-2" />
            Add Task
          </button>
        </div>

        <div className="mb-6">
          <div className="flex space-x-2">
            {(['all', 'pending', 'in-progress', 'completed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  filter === status
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              onStatusChange={handleStatusChange}
            />
          ))}
          {filteredTasks.length === 0 && (
            <div className="col-span-full text-center py-12">
              <ListTodo className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No tasks found</h3>
              <p className="text-gray-500 mt-2">
                {filter === 'all'
                  ? "Get started by adding your first task!"
                  : `No ${filter} tasks found.`}
              </p>
            </div>
          )}
        </div>

        {showForm && (
          <TaskForm
            onSubmit={handleAddTask}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;