export default function FilterBar({query, setQuery, prio, setPrio}){
    return(
        <form role="search" className="grid">
            <input  value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Filtre Suas Tasks"
            />
            <select value={prio} onChange={e => setPrio(e.target.value)}>
                <option value="ALL">Todas</option>
                <option value="LOW">Baixa prioridade</option>
                <option value="MEDIUM">Média prioridade</option>
                <option value="HIGH">Alta prioridade</option>
            </select>
        </form>
    );
}
