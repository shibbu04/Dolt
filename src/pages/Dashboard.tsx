import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  ListTodo, 
  Plus, 
  Star, 
  Calendar, 
  UserCheck,
  Sun,
  AlertCircle,
  Trash2,
  X
} from 'lucide-react';
import { addTask, removeTask, toggleTask, setImportant } from '../store/todoSlice';
import { RootState } from '../store';
import { Task, WeatherData } from '../types';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useTheme } from '../hooks/useTheme';
import { Toast, ToastType } from '../components/Toast';

interface ToastState {
  message: string;
  type: ToastType;
}

const Dashboard = () => {
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isOutdoor, setIsOutdoor] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'important' | 'planned' | 'assigned'>('all');
  const [toast, setToast] = useState<ToastState | null>(null);

  const dispatch = useDispatch();
  const { theme } = useTheme();
  const user = useSelector((state: RootState) => state.auth.user);
  const tasks = useSelector((state: RootState) => {
    const allTasks = state.todo.tasks;
    switch (activeTab) {
      case 'important':
        return allTasks.filter(task => task.important);
      case 'planned':
        return allTasks.filter(task => task.priority === 'high');
      case 'assigned':
        return allTasks.filter(task => task.assignedTo === user?.id);
      default:
        return allTasks;
    }
  });

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (isOutdoor) {
      fetchWeather();
    }
  }, [isOutdoor]);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      );
      if (!response.ok) throw new Error('Weather data not available');
      
      const data = await response.json();
      setWeather({
        temp: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: data.weather[0].icon
      });
      setWeatherError(null);
    } catch (error) {
      setWeatherError('Could not fetch weather data');
      setWeather(null);
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task: Task = {
      id: crypto.randomUUID(),
      title: newTask,
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
      isOutdoor,
      important: false,
      assignedTo: user?.id
    };

    dispatch(addTask(task));
    showToast('Task added successfully!', 'success');
    setNewTask('');
    setPriority('medium');
    setIsOutdoor(false);
  };

  const handleToggleTask = (taskId: string) => {
    dispatch(toggleTask(taskId));
    showToast('Task status updated!', 'info');
  };

  const handleRemoveTask = (taskId: string) => {
    dispatch(removeTask(taskId));
    showToast('Task deleted successfully!', 'success');
  };

  const handleSetImportant = (taskId: string) => {
    dispatch(setImportant(taskId));
    showToast('Task marked as important!', 'info');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 dark:text-red-400';
      case 'medium':
        return 'text-yellow-500 dark:text-yellow-400';
      case 'low':
        return 'text-green-500 dark:text-green-400';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        w-64 bg-white dark:bg-gray-800 flex flex-col shadow-lg border-r border-gray-200 dark:border-gray-700
      `}>
        <div className="flex justify-end p-2 lg:hidden">
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 flex-1">
          <div className="flex items-center gap-2 mb-8">
            <ListTodo className="h-8 w-8 text-gray-900 dark:text-white" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              DoIt
            </span>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`}
                alt="avatar"
                className="w-10 h-10 rounded-full bg-gray-700"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Hey, {user?.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'all', icon: ListTodo, label: 'All Tasks' },
              { id: 'important', icon: Star, label: 'Important' },
              { id: 'planned', icon: Calendar, label: 'Planned' },
              { id: 'assigned', icon: UserCheck, label: 'Assigned to me' },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as typeof activeTab)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
                  ${activeTab === id 
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Add Task
              </h1>
              <form onSubmit={handleAddTask} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg flex items-center gap-2 justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-primary"
                  >
                    <Plus size={20} />
                    Add Task
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-4 items-center">
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                    className="rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-primary"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>

                  <label className="flex items-center gap-2 order-first sm:order-none">
                    <input
                      type="checkbox"
                      checked={isOutdoor}
                      onChange={(e) => setIsOutdoor(e.target.checked)}
                      className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 dark:border-gray-700"
                    />
                    <span className="text-gray-900 dark:text-white">
                      Outdoor Activity
                    </span>
                  </label>

                  {isOutdoor && (
                    <div className="flex items-center gap-2">
                      {weather && !weatherError ? (
                        <>
                          <img
                            src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                            alt="weather"
                            className="w-8 h-8"
                          />
                          <span className="text-gray-900 dark:text-white">
                            {weather.temp}°C
                          </span>
                          <span className="text-gray-600 dark:text-gray-400">{weather.description}</span>
                        </>
                      ) : weatherError ? (
                        <div className="text-red-500 dark:text-red-400 flex items-center gap-2">
                          <AlertCircle size={16} />
                          {weatherError}
                        </div>
                      ) : (
                        <div className="animate-pulse flex items-center gap-2">
                          <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                          <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </form>
            </div>

            <div className="space-y-4 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Tasks
              </h2>
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-lg p-4 flex items-center justify-between gap-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:shadow-lg"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleTask(task.id)}
                      className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 dark:border-gray-700 focus:ring-primary"
                    />
                    <span className={`flex-1 ${
                      task.completed 
                        ? 'line-through text-gray-500 dark:text-gray-400' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {task.title}
                    </span>
                    <button
                      onClick={() => handleSetImportant(task.id)}
                      className={`transform transition-transform hover:scale-110 ${
                        task.important ? 'text-yellow-500' : 'text-gray-400 dark:text-gray-500'
                      }`}
                      aria-label={task.important ? 'Remove from important' : 'Mark as important'}
                    >
                      <Star size={16} />
                    </button>
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    {task.isOutdoor && (
                      <Sun size={16} className="text-yellow-500" />
                    )}
                  </div>
                  <button
                    onClick={() => handleRemoveTask(task.id)}
                    className="text-gray-400 hover:text-red-500 dark:text-gray-500"
                    // className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-gray-700"
                    aria-label="Delete task"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

              {tasks.length === 0 && (
                <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  No tasks yet. Add one to get started!
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;