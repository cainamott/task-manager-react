import { useState } from "react";
import { createTask } from "../api/tasksApi";

const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH'];

export default function TaskForm({ onCreate }){
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('MEDIUM');

    const canSave = title.trim().length > 0;

    function handleSubmit(e){
        e.preventDefault();
        if(!canSave){
            return;
        }
        onCreate({title: title.trim(), priority, done: false});
        setTitle('');
        setPriority('MEDIUM');
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>Título
                <input value={title} 
                onChange={e => setTitle(e.target.value)} placeholder="Ex. Estudar React"/>
            </label>
            <label>Prioridade
                <select value={priority} 
                        onChange={e => setPriority(e.target.value)}>
                    {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
            </label>
            <button type="submit" disabled={!canSave}>Adicionar Task</button>
        </form>
    );
}