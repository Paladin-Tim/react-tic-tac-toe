import { useEffect, useState } from "react";
import { store } from "../../redux/store";
import PropTypes from "prop-types";
import styles from "./info.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export const InfoLayout = () => {
  const [game, setGame] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => setGame(store.getState()));

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <article id="gameInfo" className={styles.gameInfo}>
        <h1 className={styles.gameHeader}>
          {game.isDraw && "It's draw!"}
          {!game.isDraw && game.isWinner && (
            <>
              <span>The winner is </span>
              <span
                className={cx("playerId", `player${game.currentPlayer}`)}
              ></span>
            </>
          )}
          {!game.isDraw && !game.isWinner && (
            <>
              <span>Turn: </span>
              <span
                className={cx("playerId", `player${game.currentPlayer}`)}
              ></span>
            </>
          )}
        </h1>
      </article>
    </>
  );
};

// InfoLayout.propTypes = {
//   currentPlayer: PropTypes.string,
//   isDraw: PropTypes.bool,
//   isWinner: PropTypes.bool,
// };
