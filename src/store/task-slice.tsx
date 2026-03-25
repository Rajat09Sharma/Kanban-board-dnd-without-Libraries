import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../components/DragableItems";
import { generateTasks } from "../util/tasks";

type InitialTaskSliceState = {
  task: Task[] | [];
};

const initialState: InitialTaskSliceState = { task: generateTasks(500) };

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    dropItem(
      state: InitialTaskSliceState,
      action: PayloadAction<{
        id: string;
        status: "todo" | "in-progress" | "in-review" | "done";
      }>,
    ) {
      const tasks = state.task;
      const taskIndex = tasks.findIndex(
        (task) => task.id == +action.payload.id,
      );
      tasks[taskIndex].status = action.payload.status;
    },

    updatePriorityStatus(
      state: InitialTaskSliceState,
      action: PayloadAction<{ id: number; status: "low" | "high" | "medium" }>,
    ) {
      const tasks = state.task;
      const taskIndex = tasks.findIndex(
        (task) => task.id == +action.payload.id,
      );
      tasks[taskIndex].priority = action.payload.status;
    },
  },
});

export const taskSliceActions = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
