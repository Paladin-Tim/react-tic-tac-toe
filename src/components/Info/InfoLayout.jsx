import { useState } from "react";
import styles from "./info.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export const InfoLayout = (props) => {
  return (
    <>
      <article id="gameInfo" className={styles.gameInfo}>
        <h1 className={styles.gameHeader}>
          {props.isDraw && "It's draw!"}
          {!props.isDraw && props.isGameEnded && (
            <>
              <span>The winner is </span>
              <span
                className={cx("playerId", `player${props.currentPlayer}`)}
              ></span>
            </>
          )}
          {!props.isDraw && !props.isGameEnded && (
            <>
              <span>Turn: </span>
              <span
                className={cx("playerId", `player${props.currentPlayer}`)}
              ></span>
            </>
          )}
        </h1>
      </article>
    </>
  );
};
