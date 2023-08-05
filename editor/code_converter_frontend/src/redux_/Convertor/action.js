// src/redux/actions.js

import axios from 'axios';
import { FAIL, REQUEST, SUCCESS_CONVERT } from './actiontype';

export const updateCode = (newCode) => ({
  type: 'UPDATE_CODE',
  payload: newCode,
});

export const updateOutput = (output) => ({
  type: 'UPDATE_OUTPUT',
  payload: output,
});
const req=()=>{
  return {type:REQUEST}
}
const success_convert=(payload)=>{
  return {type:SUCCESS_CONVERT,payload}
}
const fail=()=>{
  return {type:FAIL}
}
// Async action using redux-thunk
export const convertCode = (code,action,langauge)=>async(dispatch) => {
dispatch(req())
    try {
      console.log(langauge,code)
      const res=await axios.post(`${process.env.REACT_APP_BASEURL}/chat`, { code,action,langauge })
     console.log(res.data)
     dispatch(success_convert(res.data.bot))
      
    } catch (error) {
    dispatch(fail())  
    }
 
};
export const handleDebugCode_quality_check = (code,action)=>async(dispatch) => {
dispatch(req())
    try {
    
      const res=await axios.post(`${process.env.REACT_APP_BASEURL}/chat`, { code,action })
     console.log(res.data)
     dispatch(success_convert(res.data.bot))
      
    } catch (error) {
    dispatch(fail())  
    }
 
};

