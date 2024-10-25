import PropTypes from "prop-types";
import styles from "./info.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export const InfoLayout = ({ currentPlayer, isDraw, isWinner }) => {
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

InfoLayout.propTypes = {
  currentPlayer: PropTypes.string,
  isDraw: PropTypes.bool,
  isWinner: PropTypes.bool,
};
