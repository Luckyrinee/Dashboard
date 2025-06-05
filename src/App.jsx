import { useEffect, useState } from 'react';
import UserCard from './components/UserCard';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const [recordsPerPage] = useState(10); // Número de registros por página

  useEffect(() => {
    fetch('http://localhost:3001/people') 
    .then((res) => res.json())
    .then((data) => setUsers(data))
    .catch((err) => console.error('Erro ao buscar usuário', err));
  }, []);

    // Calcular os índices para exibição dos registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);

    // Calcular o número total de páginas
    const totalPages = Math.ceil(users.length / recordsPerPage);

  return (
    <div className="App">
      <h1>Dashboard de Usuários</h1>
      <p>Total de usuários: {users.length}</p>

       {/* Botões de navegação */}
       <div className="pagination">
        <button 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Página Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Próxima Página
        </button>
      </div>

      {/* Exibição dos registros */}
      <div className="user-container">
        {currentRecords.map((user) => (
           <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default App;