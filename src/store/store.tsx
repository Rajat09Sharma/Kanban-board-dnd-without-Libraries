import { configureStore } from "@reduxjs/toolkit";
import { taskReducer } from "./task-slice";

const store = configureStore({
  reducer: {
    task: taskReducer,
  },
});

export type AppDispatchType = typeof store.dispatch;
export type AppSelectorType = ReturnType<typeof store.getState>;
export default store;
