import { useEffect, useReducer, useRef, useState, type DragEvent } from "react";
import { DragableItems, type Task } from "./DragableItems";
import { DropletColumnHeader } from "./DropletColumnHeader";
// import { useAppSelector } from "../hooks/store-hooks";

type DropletColumnProps = {
  heading: string;
  statusType: "todo" | "in-progress" | "in-review" | "done";
  tasks: Task[];
  onItemDrop: (
    id: string,
    status: "todo" | "in-progress" | "in-review" | "done",
  ) => void;
  dropIndicator: string | null;
  onDropIndicator: (data: string) => void;
};

type ReducerActionType = {
  type: "title" | "priority" | "due-date" | "clear";
  payload?: unknown;
};

type InitialStateActionType = {
  type: "initial-state";
  payload?: {
    tasks: Task[]
  };
};

type FilterState = {
  tasks: Task[];
  filterType: string | null;
};

const reducerFun = (state: FilterState, action: ReducerActionType | InitialStateActionType) => {
  if (action.type == "title") {
    const tasks = [...state.tasks];

    const sortedTaskByTitle = tasks.sort((a: Task, b: Task) => {
      if (a.title[0].toLocaleLowerCase() < b.title[0].toLocaleLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    });

    return { tasks: [...sortedTaskByTitle], filterType: "Title" };
  }

  if (action.type == "priority") {
    const tasks = [...state.tasks];
    const score = {
      high: 100,
      medium: 50,
      low: 0,
      "": 0,
    };

    const sortedTaskByPriority = tasks.sort((a: Task, b: Task) => {
      return score[b.priority] - score[a.priority];
    });

    return { tasks: [...sortedTaskByPriority], filterType: "Priority" };
  }

  if (action.type == "due-date") {
    const tasks = [...state.tasks];

    const sortedTasks = tasks.sort((a: Task, b: Task) => {
      const [dayA, monthA, yearA] = a.dueDate.split("-").map(Number);
      const [dayB, monthB, yearB] = b.dueDate.split("-").map(Number);

      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);

      return dateA.getTime() - dateB.getTime();
    });

    return { tasks: [...sortedTasks], filterType: "Due Date" };
  }

  if (action.type == "initial-state") {
    return {
      tasks: [...action.payload!.tasks],
      filterType: state.filterType,
    };
  }

  if (action.type == "clear") {
    return {
      tasks: state.tasks,
      filterType: null,
    };
  }

  return state;
};

export const DropletColumn = ({
  heading,
  tasks,
  statusType,
  onItemDrop,
  dropIndicator,
  onDropIndicator,
}: DropletColumnProps) => {
  // const taskArray = useAppSelector((state) => state.task.task);

  const [filteredTasks, dispatch] = useReducer(reducerFun, {
    tasks: tasks,
    filterType: null,
  });

  const isTask = tasks.length > 0;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const rowHeight = 34;
  const buffer = 5;

  const visibleCount = Math.ceil(400 / rowHeight);
  const start = Math.max(0, Math.floor(scrollTop / rowHeight) - buffer);
  const end = start + visibleCount + buffer * 2;

  const visibleItems = filteredTasks.tasks.slice(start, end);

  const handleTasksFiltering = (
    type: "title" | "priority" | "due-date" | "clear",
  ) => {
    console.log("Filter Type: ", type);
    dispatch({ type });
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("id");
    onItemDrop(taskId, statusType);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    onDropIndicator(event.currentTarget.id);
  };

  // console.log("filter", filteredTasks.tasks);
  // console.log("tasks", tasks);

  useEffect(() => {
    if (tasks.length > 0) {
      dispatch({ type: "initial-state", payload: { tasks } });
    }
  }, [tasks]);

  return (
    <div
      id={statusType}
      ref={containerRef}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      className={`w-1/4 rounded-xl bg-slate-100 h-[400px] ${dropIndicator === statusType ? " bg-amber-200 " : ""}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <DropletColumnHeader
        heading={heading}
        onFilter={handleTasksFiltering}
        filterType={filteredTasks.filterType}
      />
      <div
        style={{ height: 10 * rowHeight }}
        className={`py-2 px-4 space-y-4 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
      >
        <div style={{ transform: `translateY(${start * rowHeight}px)` }}>
          {isTask &&
            visibleItems.map((task) => (
              <DragableItems key={task.id} task={task} />
            ))}
          {!isTask && filteredTasks.filterType == null && (
            <p className="my-4 text-center">No tasks.</p>
          )}
          {!isTask && filteredTasks.filterType != null && (
            <div className="my-4 text-center space-y-2">
              <p>No tasks.</p>
              <button
                onClick={() => handleTasksFiltering("clear")}
                className="px-3 py-2 bg-slate-300 rounded-xl font-medium hover:cursor-pointer"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
