// store.js
import React, {createContext, useReducer, useState} from 'react';

const initialState = {
  exercises:[]
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
 
 const [exerciseListX, setExerciseListX] = useState({});
  // const jump =()=>{
  //   setExerciseListX({t:'dsf'})
  // }
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'ACTIVE_WORKOUT':
        
        const {payload} = action       
        if(state && state.exercises.length <= 0){
          return {...state, exercises: payload}
          
        }
        return
        case 'ACTIVE_TIME':
        const timer = 'asd'// do something with the action
      
        return timer;
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }

