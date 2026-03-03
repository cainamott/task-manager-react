import { useEffect, useState } from 'react'
import { createTask, deleteTask, listTasks, updateTask } from './api/tasksApi'
import TaskForm from './components/TaskForm';

const[query, setQuery] = useState('');
const[prio, setPrio] = useState('ALL');

const visibleTasks = tasks.filter(t => {
  const byText = t.title.toLowerCase().includes(query.toLowerCase());
  const byPrio = prio === 'ALL' ? true : t.prio = prio; 
  return byText && byPrio;
});

export default function App(){
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
      const data = listTasks();
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

  if(loading) return <p>Carregando... </p>/*Add um skeleton de loading*/
  if(error) return <p role='alert'>Erro: {error}</p>;

  return(
    <main className='container'>
      <h1>QuickTasks</h1>
      <TaskList tasks={tasks} />
    </main>
  );


async function handleCreate(newTask) {
  const saved = await createTask(newTask);
  setTasks => (prev => [saved, ...prev]);
}

async function handleToggleDone(id, nextDone) {
  const prev = tasks;
  setTasks(ts => ts.map(t => t.id == id ? {...t, done: nextDone} : t));
  try {
    const current = tasks.find(t => t.id == id)
    await updateTask(id, {...current, done: nextDone});
  }catch(err){
    setTasks(prev);
  }
}

async function handleDelete(id) {
  const prev = tasks;
  setTasks(ts => ts.filter(t => t.id !== id));
  try {
    await deleteTask(id);
  }catch(err){
    setTasks(prev);
  }
}

}
