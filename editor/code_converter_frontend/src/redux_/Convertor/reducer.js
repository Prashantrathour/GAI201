// src/redux/reducers.js

import { FAIL, REQUEST, SUCCESS_CONVERT } from "./actiontype";

const initialState = {
    code: '',
    output: '',
 
    isLoading:false,
    isError:false
  };
  
  const codeReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_CODE':
        return {
          ...state,
          code: action.payload,
        
        };
      case SUCCESS_CONVERT:
        return {
          ...state,
          isLoading:false,
          output: action.payload,
       
        };
      case REQUEST:
        return {
          ...state,

          isLoading:true,
        };
      case FAIL:
        return {
          ...state,
          isLoading:false,
          isError:true
        };
      default:
        return state;
    }
  };
  
  export default codeReducer;
  