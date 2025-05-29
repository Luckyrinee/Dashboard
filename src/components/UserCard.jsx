import './UserCard.css';

function UserCard({ user }) {
    return (
        <div className="user-card">
            <img src={user.avatar} alt={`${user.firstName} avatar`} />
            <h3>{user.firstName} {user.lastName}</h3>
            <p>{user.email}</p>
            <small>{user.address}</small>
        </div>
    );  
}

export default UserCard;    