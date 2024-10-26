import PropTypes from "prop-types";
import styles from "./field.module.css";
import classNames from "classnames";

const cx = classNames.bind(styles);

export const FieldLayout = ({
  isDraw,
  setIsDraw,
  fields,
  setFields,
  currentPlayer,
  setCurrentPlayer,
  isWinner,
  calculateWinner,
}) => {
  const reload = () => {
    const cells = document.querySelectorAll("#gameField > button");

    cells.forEach((cell) => {
      cell.classList.remove(styles.flipped);
      cell.removeAttribute("disabled");
      cell.firstChild.classList.remove(styles.playerX, styles.player0);
    });

    setFields(Array(9).fill(""));
    setIsDraw(false);
    setCurrentPlayer("X");
  };

  const handleClickCell = (e, index) => {
    e.preventDefault();
    e.target.parentElement.classList.add(styles.flipped);
    e.target.parentElement.setAttribute("disabled", "");
    setTimeout(() => {
      e.target.classList.add(
        currentPlayer === "X" ? styles.playerX : styles.player0,
      );
    }, 200);
    const updatedFields = [...fields];
    updatedFields[index] = currentPlayer;
    setFields(updatedFields);
    const winner = calculateWinner(updatedFields);

    if (!winner) {
      if (updatedFields.includes("")) {
        setCurrentPlayer(currentPlayer === "X" ? "0" : "X");
      } else {
        setIsDraw(true);
      }
    }
  };

  return (
    <>
      <article
        id="gameField"
        className={cx(
          styles.gameField,
          isDraw && styles.draw,
          isWinner && styles[`winner${currentPlayer}`],
        )}
      >
        {fields.map((field, index) => (
          <button
            id={index}
            key={index}
            value={field}
            className={styles.gameCell}
            disabled={isDraw || isWinner}
          >
            <div
              className={styles.cellContent}
              onClick={(e) => handleClickCell(e, index)}
            ></div>
          </button>
        ))}
      </article>
      <section className={styles.btnWrapper}>
        <button type="button" className={styles.btnReload} onClick={reload}>
          Reload game
        </button>
      </section>
    </>
  );
};

FieldLayout.propTypes = {
  currentPlayer: PropTypes.string,
  isDraw: PropTypes.bool,
  isWinner: PropTypes.bool,
  fields: PropTypes.array,
  setFields: PropTypes.func,
  setIsDraw: PropTypes.func,
  setCurrentPlayer: PropTypes.func,
  calculateWinner: PropTypes.func,
};
