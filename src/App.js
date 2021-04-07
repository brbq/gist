import './App.css';
import  gists from './gists';
import { useState } from 'react';

function App() {

  const [input, setInput] = useState('');
  const [displayedGists, setGists] = useState([]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const keywords = input.split(" ");
      setGists(
        gists
        .filter((g) => keywords.find(k => g.keys.includes(k)))
        .sort((a,b) => {
          const aCount = a.keys.filter(akey => keywords.find(k => k===akey))
          const bCount = b.keys.filter(bkey => keywords.find(k => k===bkey))
          return aCount >= bCount ? 1 : -1; 
        })
      );
    }
  }

  return (
    <>
      <input autoFocus onKeyDown={handleKeyDown} value={input} onInput={e => setInput(e.target.value)}/>
      {displayedGists.map((g) => (
            <div key={g.id}>
              <h3>{g.title}</h3>
              <textarea defaultValue={g.code}></textarea>
            </div>
        ))}
    </>
  );
}

export default App;
