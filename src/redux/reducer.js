import { victoryAimation } from "../utils/victory-aimation";
import { WIN_PATTERNS } from "../utils/win-patterns";
import update from "react-addons-update";

// const gameAdapter = createEntityAdapter();

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
          [payload.i]: {
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

// export const gameSlice = createSlice({
//   name: "game",
//   initialState,
//   reducers: {
//     clickCell(state, action) {
//       state.fields[action.payload] = state.currentPlayer;

//       if (!state.isWinner) {
//         if (state.fields.includes("")) {
//           state.currentPlayer = state.currentPlayer === "X" ? "0" : "X";
//         } else {
//           state.isDraw = true;
//         }
//       }
//     },
//     calculateWinner(state) {
//       const WIN_PATTERNS = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6],
//       ];
//       for (let i = 0; i < WIN_PATTERNS.length; i++) {
//         const [a, b, c] = WIN_PATTERNS[i];
//         if (
//           state.fields[a] &&
//           state.fields[a] === state.fields[b] &&
//           state.fields[a] === state.fields[c]
//         ) {
//           setTimeout(() => {
//             victoryAimation();
//           }, 800);
//           state.isWinner = true;
//           return state;
//         }
//       }
//       state.isWinner = false;
//       return state;
//     },
//     reload() {
//       return initialState;
//     },
//   },
// });

// export const { clickCell, calculateWinner, reload } = gameSlice.actions;
