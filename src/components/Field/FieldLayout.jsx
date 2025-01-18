import { store } from "../../redux/store";
import PropTypes from "prop-types";
import styles from "./field.module.css";
import classNames from "classnames";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

// [calculateWinner, clickCell, reload].forEach((actionCreator) => {
//   store.dispatch(actionCreator());
//   console.log(store.getState());
// });

// const actionCreators = {
//   calculateWinner,
//   clickCell,
//   reload,
// };

export const FieldLayout = () =>
  //   {
  //   isDraw,
  //   setIsDraw,
  //   fields,
  //   setFields,
  //   currentPlayer,
  //   setCurrentPlayer,
  //   isWinner,
  //    calculateWinner,
  //   calculateWinner,
  //   clickCell,
  //   reload,
  // }
  {
    // const reload = () => {
    //   const cells = document.querySelectorAll("#gameField > button");

    //   cells.forEach((cell) => {
    //     cell.classList.remove(styles.flipped);
    //     cell.removeAttribute("disabled");
    //     cell.firstChild.classList.remove(styles.playerX, styles.player0);
    //   });

    //   setFields(Array(9).fill(""));
    //   setIsDraw(false);
    //   setCurrentPlayer("X");
    // };

    // const handleClickCell = (e, index) => {
    //   e.preventDefault();
    //   e.target.parentElement.classList.add(styles.flipped);
    //   e.target.parentElement.setAttribute("disabled", "");
    //   setTimeout(() => {
    //     e.target.classList.add(
    //       currentPlayer === "X" ? styles.playerX : styles.player0,
    //     );
    //   }, 200);
    //   const updatedFields = [...fields];
    //   updatedFields[index] = currentPlayer;
    //   setFields(updatedFields);
    //   const winner = calculateWinner(updatedFields);

    //   if (!winner) {
    //     if (updatedFields.includes("")) {
    //       setCurrentPlayer(currentPlayer === "X" ? "0" : "X");
    //     } else {
    //       setIsDraw(true);
    //     }
    //   }
    // };

    const [game, setGame] = useState(store.getState());

    useEffect(() => {
      const unsubscribe = store.subscribe(() => setGame(store.getState()));

      return () => {
        unsubscribe();
      };
    }, []);

    const handleClickCell = (e, index) => {
      e.preventDefault();
      e.target.parentElement.classList.add(styles.flipped);
      e.target.parentElement.setAttribute("disabled", "");
      setTimeout(() => {
        e.target.classList.add(
          game.currentPlayer === "X" ? styles.playerX : styles.player0,
        );
      }, 200);
      store.dispatch({
        type: "CLICK_FIELD",
        payload: { i: index },
      });
      store.dispatch({ type: "CALC_WINNER" });
      if (!game.isWinner) {
        store.dispatch({ type: "SET_PLAYER" });
      }
    };

    const reload = () => {
      const cells = document.querySelectorAll("#gameField > button");

      cells.forEach((cell) => {
        cell.classList.remove(styles.flipped);
        cell.removeAttribute("disabled");
        cell.firstChild.classList.remove(styles.playerX, styles.player0);
      });
      store.dispatch({
        type: "RELOAD_GAME",
      });
    };

    return (
      <>
        <article
          id="gameField"
          className={cx(
            styles.gameField,
            game.isDraw && styles.draw,
            game.isWinner && styles[`winner${game.currentPlayer}`],
          )}
        >
          {game.fields.map((field, index) => (
            <button
              id={index}
              key={index}
              value={field}
              className={styles.gameCell}
              disabled={game.isDraw || game.isWinner}
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

// FieldLayout.propTypes = {
//   currentPlayer: PropTypes.string,
//   isDraw: PropTypes.bool,
//   isWinner: PropTypes.bool,
//   fields: PropTypes.array,
//   setFields: PropTypes.func,
//   setIsDraw: PropTypes.func,
//   setCurrentPlayer: PropTypes.func,
//   calculateWinner: PropTypes.func,
// };
