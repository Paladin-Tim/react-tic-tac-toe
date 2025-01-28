import { connect } from "react-redux";
import styles from "./info.module.css";
import classNames from "classnames/bind";
import { Component } from "react";

const cx = classNames.bind(styles);

class InfoContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <article
          id="gameInfo"
          className="max-w-4/10 mx-auto my-0 text-center px-0 pt-8 pb-12"
        >
          <h1 className="flex justify-center items-center">
            {this.props.isDraw && "It's draw!"}
            {!this.props.isDraw && this.props.isWinner && (
              <>
                <span>The winner is </span>
                <span
                  className={cx(
                    styles.playerId,
                    "pl-[3rem] aspect-square h-10 ",
                    `player${this.props.currentPlayer}`,
                  )}
                ></span>
              </>
            )}
            {!this.props.isDraw && !this.props.isWinner && (
              <>
                <span>Turn: </span>
                <span
                  className={cx(
                    styles.playerId,
                    "pl-[3rem] aspect-square h-10 ",
                    `player${this.props.currentPlayer}`,
                  )}
                ></span>
              </>
            )}
          </h1>
        </article>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer,
  isWinner: state.isWinner,
  isDraw: state.isDraw,
});

export const Info = connect(mapStateToProps)(InfoContainer);
