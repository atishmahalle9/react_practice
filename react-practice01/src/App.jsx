import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());


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
    console.log(selectedUsers, '222')
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    console.log(selectedUserSet, '222111')
    setSearchTerm("");
    setSuggestions([]);
  };

  return (
    <>
      <div className="user-search-container">
        <div className="user-search-input">
          {/* pills */}
          {/* input with search suggestion */}
          <div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
      </div>
    </>
  );
}

export default App;
