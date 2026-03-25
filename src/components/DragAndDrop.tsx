import { useRef, useState } from "react";
import { DropletColumn } from "./DropletColumn";
// import type { Task } from "./DragableItems";
// import { TASK_ARRAY } from "../util/tasks";
import { useAppDispatch, useAppSelector } from "../hooks/store-hooks";
import { taskSliceActions } from "../store/task-slice";

export const DragAndDrop = () => {
  const [dropIndicator, setDropIndicator] = useState<string | null>(null);
  const timerId = useRef<number | undefined>(undefined);
  // const [tasks, setTasks] = useState<Task[] | []>([...TASK_ARRAY]);
  const tasks = useAppSelector((state) => state.task.task);

  const dispatch = useAppDispatch();

  const handleitemDrop = (
    id: string,
    status: "todo" | "in-progress" | "in-review" | "done",
  ) => {
    // setTasks((prevs) => {
    //   return prevs.map((task) => {
    //     if (task.id == +id) {
    //       return { ...task, status };
    //     }
    //     return task;
    //   });
    // });
    dispatch(taskSliceActions.dropItem({ id, status }));
  };

  // console.log(taskss,"tasks");

  const handleDropIndicator = (data: string) => {
    setDropIndicator(data);

    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    timerId.current = setTimeout(() => {
      setDropIndicator(null);
    }, 1500);
  };

  return (
    <div className="flex justify-between gap-6">
      <DropletColumn
        heading="Todo"
        statusType="todo"
        tasks={tasks.filter((task) => task.status == "todo")}
        onItemDrop={handleitemDrop}
        onDropIndicator={handleDropIndicator}
        dropIndicator={dropIndicator}
      />
      <DropletColumn
        heading="In Progress"
        statusType="in-progress"
        tasks={tasks.filter((task) => task.status == "in-progress")}
        onItemDrop={handleitemDrop}
        onDropIndicator={handleDropIndicator}
        dropIndicator={dropIndicator}
      />
      <DropletColumn
        heading="In Review"
        statusType="in-review"
        tasks={tasks.filter((task) => task.status == "in-review")}
        onItemDrop={handleitemDrop}
        onDropIndicator={handleDropIndicator}
        dropIndicator={dropIndicator}
      />
      <DropletColumn
        heading="Done"
        statusType="done"
        tasks={tasks.filter((task) => task.status == "done")}
        onItemDrop={handleitemDrop}
        onDropIndicator={handleDropIndicator}
        dropIndicator={dropIndicator}
      />
    </div>
  );
};
