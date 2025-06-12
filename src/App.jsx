import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Página atual - Navegação
  const [recordsPerPage] = useState(10); // Número de registros por página - Navegação
  const [selectedUser, setSelectedUser] = useState(null); // Usuário selecionado

  // Função para abrir o modal com informações do usuário
  const handleUserClick = (user) => {
    setSelectedUser(user); // Define o usuário selecionado
  };

  useEffect(() => {
    fetch('http://localhost:3001/people') 
    .then((res) => res.json())
    .then((data) => setUsers(data))
    .catch((err) => console.error('Erro ao buscar usuário', err));
  }, []);

    // Calcular os índices para exibição dos registros - Navegação
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);

    // Calcular o número total de páginas - Navegação
    const totalPages = Math.ceil(users.length / recordsPerPage);

  return (
    <div className="App">
      <h1>Dashboard de Usuários</h1>
      <p>Total de usuários: {users.length}</p>
      
       {/* Botões de navegação - Navegação */}
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

      {/* Modal para exibir informações do usuário */}
        {selectedUser && (
          <div className="modal">
            <div className="modal-content">
              <button className="close-button" onClick={() => setSelectedUser(null)}>X</button>
              <img src={selectedUser.avatar} alt={`${selectedUser.firstname} ${selectedUser.lastname}`} />
              <h2>{selectedUser.firstname} {selectedUser.lastname}</h2>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Endereço:</strong> {selectedUser.address}</p>
            </div>
          </div>
        )}

      {/* Exibição dos registros - Navegação */}
      <div className="user-container">
        {currentRecords.map((user) => (
           <UserCard key={user.id} user={user} onClick={() => handleUserClick(user)} />
        ))}
      </div>
    </div>
  );

  {/* User Card*/}
  function UserCard({ user, onClick }) {
    return (
      <div className="user-card" onClick={onClick}>
        <img src={user.avatar} alt={`${user.firstname} avatar`} />
        <h3>{user.firstname} {user.lastname}</h3>
        <p>{user.email}</p>
        <small>{user.address}</small>
      </div>
    );
  }
  
}



export default App;