import { victoryAimation } from "../utils/victory-aimation";
import { WIN_PATTERNS } from "../utils/win-patterns";
import update from "react-addons-update";

export const initialState = {
  fields: Array(9).fill(""),
  currentPlayer: "X",
  isWinner: false,
  isDraw: false,
};

export const gameReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "CALC_WINNER":
      for (let i = 0; i < WIN_PATTERNS.length; i++) {
        const [a, b, c] = WIN_PATTERNS[i];
        if (
          state.fields[a] &&
          state.fields[a] === state.fields[b] &&
          state.fields[a] === state.fields[c]
        ) {
          setTimeout(() => {
            victoryAimation();
          }, 800);
          return { ...state, isWinner: true };
        } else {
          if (!state.fields.includes("")) {
            return { ...state, isDraw: true };
          }
        }
      }
      return state;
    case "CLICK_FIELD":
      return update(state, {
        fields: {
          [payload]: {
            $set: state.currentPlayer,
          },
        },
      });
    case "SET_PLAYER":
      if (state.fields.includes("") && !state.isWinner) {
        return {
          ...state,
          currentPlayer: state.currentPlayer === "X" ? "0" : "X",
        };
      } else {
        return state;
      }
    case "RELOAD_GAME":
      return initialState;
    default:
      return state;
  }
};
