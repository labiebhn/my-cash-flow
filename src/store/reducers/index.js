import { combineReducers} from "redux";
import roomReducer from "./roomReducer";
import userReducer from "./userReducer";
import transactionReducer from './transactionReducer';
import accountCodeReducer from './accountCodeReducer';

export default combineReducers({
  roomReducer,
  userReducer,
  transactionReducer,
  accountCodeReducer,
});