import { useEffect, useRef, useState } from "react";
import "./App.css";
import Pill from './components/Pill'

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());

  const inputRef = useRef(null)


  useEffect(() => {
    const fetchUsers = () => {
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      }

      fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data))
        .catch((err) => {
          console.error(err);
        });
    };

    fetchUsers();
  }, [searchTerm]);

  const handleSelectUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchTerm("");
    setSuggestions([]);
    inputRef.current.focus()
  };

  const handleRemoveUser = (user) => {
    const updatedUsers = selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)

    setSelectedUsers(updatedUsers)

    const updatedEmails = new Set(selectedUserSet)
    updatedEmails.delete(user.emails)
  }

  const handleKeydown = (e) => {
    if (e.key === 'Backspace' && e.target.value === '' && selectedUsers.length > 0) {
      const lastUser = selectedUsers[selectedUsers.length - 1];
      handleRemoveUser(lastUser)
    }
  }

  return (
    <>
      <div className="user-search-container">
        <div className="user-search-input">
          {/* pills */}
          {selectedUsers.map((user) => {
            return <Pill key={user.email} image={user.image} text={`${user.firstName} ${user.lastName}`} onClick={() => handleRemoveUser(user)} />
          })}
          {/* input with search suggestion */}
          <div>
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeydown}
              placeholder="search for user"
            />
            <ul className="suggestions-list" >{suggestions?.users?.map((user, index) => {
              return !selectedUserSet.has(user.email) ? (
                <li key={user.email} onClick={() => handleSelectUser(user)}>
                  <img alt={`${user.firstName} ${user.lastName}`} src={user.image}></img>
                  <span>{user.firstName} {user.lastName}</span>
                </li>
              ) : <></>
            })}</ul>
          </div>
          {/* search box with search term */}
        </div>
      </div >
    </>
  );
}

export default App;
