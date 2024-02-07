import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  console.log(suggestions,'22')
  useEffect(() => {
    console.log('insiden useffe')
    const fetchUsers = () => {
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      }

      

    fetch(`'https://dummyjson.com/users/search?q=${searchTerm}'`)
        .then((res) => {
          console.log(res) 
          res.json()
        })
        .then((data) => setSuggestions(data))
        .catch((err) => console.error(err));
    };
    
    fetchUsers();
  }, [searchTerm]);



  return (
    <>
      <div className="user-search-container">
        <div className="user-search-input">
          {/* pills */}
          {/* input with search suggestion */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="search for user"
          />
          <ul className="suggestions-list" >{suggestions?.users.map((user,index) => {})}</ul>
          {/* search box with search term */}
        </div>
      </div>
    </>
  );
}

export default App;
