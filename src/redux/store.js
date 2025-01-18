import { createStore } from "redux";
import { gameReducer } from "./reducer";

export const store = createStore(gameReducer);

// export const store = configureStore({
//   reducer: gameSlice.reducer,
// });
