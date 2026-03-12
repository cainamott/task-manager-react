import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggleDone, onDelete }) {
  if (!tasks.length) return <p>Nenhuma tarefa encontrada</p>;

  return (
    <ul>
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onToggleDone={onToggleDone}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}