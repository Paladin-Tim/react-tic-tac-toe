import { useState } from "react";
import styles from "./field.module.css";
import classNames from "classnames/bind";
import { Cell } from "../Cell/Cell";

const cx = classNames.bind(styles);

export const FieldLayout = (props) => {
  return (
    <>
      <article id="gameField" className={styles.gameField}>
        <Cell {...props}></Cell>
      </article>
      <section className={styles.btnWrapper}>
        <button type="button" className={styles.btnReload}>
          Reload game
        </button>
      </section>
    </>
  );
};
