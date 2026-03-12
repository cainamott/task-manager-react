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
    // always stringify whatever we receive so the backend can validate the payload
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(data),
    });

    if(!res.ok) {
        // copy response body into the error message if available (useful for debugging)
        let errText;
        try {
            errText = await res.text();
        } catch {}
        throw new Error(
            `Não foi possível criar a task${errText ? `: ${errText}` : ''}`
        );
    }

    // some backends return no content (204) or an empty body on create; parsing
    // JSON from an empty response throws the "Unexpected end of JSON input" error
    // the caller can decide what to do when `null` is returned.
    const text = await res.text();
    return text ? JSON.parse(text) : null;
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
    const text = await res.text();
    return text ? JSON.parse(text) : null;
}

export async function deleteTask(id){
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    });
    if(!res.ok){
        throw new Error("Não foi possível deletar a tarefa");
    }
    
}

