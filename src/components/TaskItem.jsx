export default function TaskItem({task, onToggleDone, onDelete}){
    const {id, title, priority, done} = task;
    return (
        <li>
            <label>
                <input  type="checkbox"
                        checked={done}
                        onChange={() => onToggleDone(id, !done)} 
                />
                <span style={{textDecoration: done ? 'line-through' : 'none'}}>
                    {title}
                </span>
            </label>
            <span className={`chip ${priority.toLowerCase()}`}>{priority}</span>
            <button onClick={() => onDelete(id)} aria-label="Excluir">Excluir</button>
        </li>
    );
}