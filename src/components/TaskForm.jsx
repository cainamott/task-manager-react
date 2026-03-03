import { useState } from "react";
import { createTask } from "../api/tasksApi";

const priorities = ['LOW', 'MEDIUM', 'HIGH'];

export default function TaskForm({ onCreate }){
    const[title, setTitle] = useState('');
    const[priorities, setPriorities] = useState('MEDIUM');

    const canSave = title.trim().length > 0;

    function handleSubmit(err){
        err.preventDefault();
        if(!canSave){
            return;
        }
        onCreate({title: title.trim(), priorities: priorities, done: false});
        setTitle('');
        setPriorities('MEDIUM');
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>Título
                <input value={title} 
                onChange={e => setTitle(e.target.value)} placeholder="Ex. Estudar React"/>
            </label>
            <label>Prioridade
                <select value={priorities} 
                        onChange={e => setPriorities(e.target.value)}>
                    {priorities.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
            </label>
            <button type="submit" disabled={!canSave}>Adicionar Task</button>
        </form>
    );
}