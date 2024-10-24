import styles from "./cell.module.css";

export const Cell = (props) => {
  const handleClickCell = (e, field, index) => {
    e.preventDefault();
    e.target.parentElement.classList.add(styles.flipped);
    e.target.parentElement.setAttribute("disabled", "");
    setTimeout(() => {
      e.target.classList.add(
        props.currentPlayer === "X" ? styles.playerX : styles.player0,
      );
    }, 200);
    const updatedFields = [...props.fields];
    updatedFields[index] = props.currentPlayer;
    props.setFields(updatedFields);

    if (!props.isGameEnded) {
      props.setCurrentPlayer(props.currentPlayer === "X" ? "0" : "X");
    }
  };

  return (
    <>
      {props.fields.map((field, index) => (
        <button
          id={index}
          key={index}
          value={field}
          className={styles.gameCell}
        >
          <div
            className={styles.cellContent}
            onClick={(e) => handleClickCell(e, field, index)}
          ></div>
        </button>
      ))}
    </>
  );
};
