import { useSelector } from "react-redux";
import {
  currentPlayerSelector,
  isDrawSelector,
  isWinnerSelector,
} from "../../redux/selectors";
import styles from "./info.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export const InfoLayout = () => {
  const currentPlayer = useSelector(currentPlayerSelector);
  const isWinner = useSelector(isWinnerSelector);
  const isDraw = useSelector(isDrawSelector);

  return (
    <>
      <article id="gameInfo" className={styles.gameInfo}>
        <h1 className={styles.gameHeader}>
          {isDraw && "It's draw!"}
          {!isDraw && isWinner && (
            <>
              <span>The winner is </span>
              <span className={cx("playerId", `player${currentPlayer}`)}></span>
            </>
          )}
          {!isDraw && !isWinner && (
            <>
              <span>Turn: </span>
              <span className={cx("playerId", `player${currentPlayer}`)}></span>
            </>
          )}
        </h1>
      </article>
    </>
  );
};
