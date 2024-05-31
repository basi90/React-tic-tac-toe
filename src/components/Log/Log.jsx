export default function Log({ moves }) {

  return (
    <ol id="log">
      {moves.map((move) => (
        <li key={`${move.square.row}${move.square.col}`}>
          {move.player} selected {move.square.row}, {move.square.col}
        </li>
      ))}
    </ol>
  );
}
