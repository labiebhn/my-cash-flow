import { combineReducers} from "redux";
import roomReducer from "./roomReducer";
import userReducer from "./userReducer";
import transactionReducer from './transactionReducer';
import accountCodeReducer from './accountCodeReducer';
import reportReducer from './reportReducer';

export default combineReducers({
  roomReducer,
  userReducer,
  transactionReducer,
  accountCodeReducer,
  reportReducer
});