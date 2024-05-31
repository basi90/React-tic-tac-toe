import { useState } from "react";

export default function Player({ initialName, symbol, toMove, onSave }) {
  const [ playerName, setPlayerName ] = useState(initialName);
  const [ editing, setEditing ] = useState(false);

  function editClick () {
    setEditing((edit) => !edit);

    if (editing) {
      onSave(symbol, playerName);
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let changeName = <span className="player-name">{playerName}</span>


  if (editing) {
    changeName = <input type="text" required value={playerName} onChange={handleChange} />
  }

  return (
    <li className={toMove ? "active" : undefined }>
      <span className="player">
        {changeName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={editClick}>{editing ? "Save" : "Edit"}</button>
    </li>
  );
}
