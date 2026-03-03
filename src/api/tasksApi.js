/*Responsavel por configurar as rotas para a conexão com o backend*/

const BASE_URL = "http://localhost:8080/api/tasks";

export async function listTasks() {
    const res = await fetch(BASE_URL);
    if(!res.ok) {
        throw new Error('Falha ao carregar tarefas');
    }
    return res.json();
}

export async function createTask(data){
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(data),

    });
    if(!res.ok) {
        throw new Error("Não foi possível criar a task");
    }
    return res.json();
}

export async function updateTask(id, data) {
 
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(data),
    });
    if(!res.ok) {
        throw new Error("Não foi possível atualizar a task!");
    }
    return res.json();
}

export async function deleteTask(id){
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    });
    if(!res.ok){
        throw new Error("Não foi possível deletar a tarefa");
    }
    
}

