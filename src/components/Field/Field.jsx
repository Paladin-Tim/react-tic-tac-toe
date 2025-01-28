import { connect } from "react-redux";
import {
  CALC_WINNER,
  clickField,
  RELOAD_GAME,
  SET_PLAYER,
} from "../../redux/actions";
import styles from "./field.module.css";
import classNames from "classnames";
import { Component } from "react";

const cx = classNames.bind(styles);

class FieldContainer extends Component {
  constructor(props) {
    super(props);
  }

  handleClickCell = (e, index) => {
    e.preventDefault();
    e.target.parentElement.classList.add(styles.flipped);
    e.target.parentElement.setAttribute("disabled", "");

    this.props.dispatch(clickField(index));

    e.target.classList.add(
      this.props.currentPlayer === "X" ? styles.playerX : styles.player0,
    );

    this.props.dispatch(CALC_WINNER);
    if (!this.props.isWinner) {
      this.props.dispatch(SET_PLAYER);
    }
  };

  reload = () => {
    const cells = document.querySelectorAll("#gameField > button");

    cells.forEach((cell) => {
      cell.classList.remove(styles.flipped);
      cell.removeAttribute("disabled");
      cell.firstChild.classList.remove(styles.playerX, styles.player0);
    });
    this.props.dispatch(RELOAD_GAME);
  };

  render() {
    return (
      <>
        <article
          id="gameField"
          className={cx(
            styles.gameField,
            "grid grid-cols-3 max-w-3/10 m-auto gap-2 p-[0.7rem] rounded-[15px] aspect-square",
            this.props.isDraw && styles.draw,
            this.props.isWinner && styles[`winner${this.props.currentPlayer}`],
          )}
        >
          {this.props.fields.map((field, index) => (
            <button
              id={index}
              key={index}
              value={field}
              className={cx(
                styles.gameCell,
                "aspect-square w-full rounded-[10px] flex justify-center items-center cursor-pointer border-none",
              )}
              disabled={this.props.isDraw || this.props.isWinner}
            >
              <div
                className={cx(styles.cellContent, "aspect-square h-7/10")}
                onClick={(e) => this.handleClickCell(e, index)}
              ></div>
            </button>
          ))}
        </article>
        <section className="flex justify-center px-0 pt-12 pb-8">
          <button
            type="button"
            className={cx(
              styles.btnReload,
              "border-none text-white py-4 px-6 rounded-[10px] cursor-pointer font-semibold text-[1rem]",
            )}
            onClick={this.reload}
          >
            Reload game
          </button>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  fields: state.fields,
  currentPlayer: state.currentPlayer,
  isWinner: state.isWinner,
  isDraw: state.isDraw,
});

export const Field = connect(mapStateToProps)(FieldContainer);
