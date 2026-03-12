import { useEffect, useState } from 'react'
import { createTask, deleteTask, listTasks, updateTask } from './api/tasksApi'
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';

export default function App(){
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('ALL');


  const visibleTasks = Array.isArray(tasks)
    ? tasks.filter((t) => {
        const byText = (t.title ?? "").toLowerCase().includes(query.toLowerCase());
        const byPrio = filterPriority === "ALL" ? true : t.priority === filterPriority;
        return byText && byPrio;
      })
    : [];


  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
      const data = await listTasks();
      if(!cancelled) setTasks(data);
    } catch (err) {
      if(!cancelled) setError(err.message);
    } finally {
      if(!cancelled) setLoading(false);
    }
  })();
  return () => {
    cancelled = true;
  };
  }, []);

  // action handlers
  async function handleCreate(newTask) {
    // ensure priority field is correct; backend expects "priority"
    console.debug('creating task', newTask);

    const saved = await createTask(newTask);
    if (saved) {
      setTasks((prev) => [saved, ...prev]);
    }
  }

  async function handleToggleDone(id, nextDone) {
    const previous = tasks;
    setTasks((ts) =>
      ts.map((t) => (t.id === id ? { ...t, done: nextDone } : t))
    );
    try {
      const current = previous.find((t) => t.id === id);
      await updateTask(id, { ...current, done: nextDone });
    } catch (err) {
      setTasks(previous);
    }
  }

  async function handleDelete(id) {
    const previous = tasks;
    setTasks((ts) => ts.filter((t) => t.id !== id));
    try {
      await deleteTask(id);
    } catch (err) {
      setTasks(previous);
    }
  }

  if (loading) return <p>Carregando... </p> /*Add um skeleton de loading*/
  if (error) return <p role='alert'>Erro: {error}</p>;

  return (
    <main className="container">
      <h1>QuickTasks</h1>
      <FilterBar query={query} setQuery={setQuery} prio={filterPriority} setPrio={setFilterPriority} />
      <TaskForm onCreate={handleCreate} />
      <TaskList
        tasks={visibleTasks}
        onToggleDone={handleToggleDone}
        onDelete={handleDelete}
      />
    </main>
  );
}
