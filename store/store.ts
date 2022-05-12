import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from 'reducers'
const devMode = process.env.NODE_ENV === 'development';

const createStore = () =>{
    const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
      devTools: devMode,
    });
    return store;
}

const wrapper = createWrapper(createStore, {
  debug: devMode,
})

export default wrapper;