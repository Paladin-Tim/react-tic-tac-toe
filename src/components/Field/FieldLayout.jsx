import { useDispatch, useSelector } from "react-redux";
import {
  currentPlayerSelector,
  fieldsSelector,
  isDrawSelector,
  isWinnerSelector,
} from "../../redux/selectors";
import {
  CALC_WINNER,
  clickField,
  RELOAD_GAME,
  SET_PLAYER,
} from "../../redux/actions";
import styles from "./field.module.css";
import classNames from "classnames";

const cx = classNames.bind(styles);

export const FieldLayout = () => {
  const fields = useSelector(fieldsSelector);
  const currentPlayer = useSelector(currentPlayerSelector);
  const isWinner = useSelector(isWinnerSelector);
  const isDraw = useSelector(isDrawSelector);

  const dispatch = useDispatch();

  const handleClickCell = (e, index) => {
    e.preventDefault();
    e.target.parentElement.classList.add(styles.flipped);
    e.target.parentElement.setAttribute("disabled", "");
    setTimeout(() => {
      e.target.classList.add(
        currentPlayer === "X" ? styles.playerX : styles.player0,
      );
    }, 200);
    dispatch(clickField(index));
    dispatch(CALC_WINNER);
    if (!isWinner) {
      dispatch(SET_PLAYER);
    }
  };

  const reload = () => {
    const cells = document.querySelectorAll("#gameField > button");

    cells.forEach((cell) => {
      cell.classList.remove(styles.flipped);
      cell.removeAttribute("disabled");
      cell.firstChild.classList.remove(styles.playerX, styles.player0);
    });
    dispatch(RELOAD_GAME);
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
