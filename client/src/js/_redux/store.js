import { createStore, combineReducers, applyMiddleware } from "redux";
import auth from "../_reducers/auth";
import user from "../_reducers/user";
import tickets from "../_reducers/tickets";
import orders from "../_reducers/orders";
import identity from "../_reducers/identity";

import { logger, promise } from "../middleware";

// Global state
const rootReducers = combineReducers({
  auth,
  user,
  tickets,
  orders,
  identity
});

// Setup store for Redux
const store = createStore(rootReducers, applyMiddleware(logger, promise));

export default store;
