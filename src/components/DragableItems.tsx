import type { ChangeEvent, DragEvent } from "react";
import { useAppDispatch } from "../hooks/store-hooks";
import { taskSliceActions } from "../store/task-slice";

type Priority = "low" | "medium" | "high";

export type Task = {
  id: number;
  imgSrc: string;
  title: string;
  description: string;
  dueDate: string;
  status: "todo" | "in-progress" | "in-review" | "done";
  priority: Priority;
};

type DragableItemsProps = {
  task: Task;
};

export const DragableItems = ({ task }: DragableItemsProps) => {
  const dispatch = useAppDispatch();

  let dueDateCss = "";
  let isTodayDueDate = false;
  let dateOverDue = 0;

  if (task.dueDate) {
    const todayDate = new Date().toISOString().split("T")[0];
    const todayDay = new Date(todayDate).getDay();
    const dueDateDay = new Date(task.dueDate).getDay();

    if (todayDate == task.dueDate) {
      isTodayDueDate = true;
      dueDateCss += " underline decoration-red-400";
    }

    if (todayDay - dueDateDay >= 7) {
      dateOverDue = todayDay - dueDateDay;
    }
  }

  const handleDragStart = (event: DragEvent<HTMLDivElement>, id: number) => {
    event.dataTransfer?.setData("id", id.toString());
  };

  const handleDragEnd = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer?.clearData();
  };

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      taskSliceActions.updatePriorityStatus({
        id: task.id,
        status: event.currentTarget.value as Priority,
      }),
    );
  };

  let headingCss = "";
  switch (task.status) {
    case "todo":
      headingCss += " bg-blue-400 ";
      break;
    case "in-progress":
      headingCss += " bg-amber-400 ";
      break;
    case "in-review":
      headingCss += " bg-purple-400 ";
      break;
    case "done":
      headingCss += " bg-green-400 ";
      break;

    default:
      break;
  }

  let priorityCss = "";
  switch (task.priority) {
    case "low":
      priorityCss += " text-blue-400 ";
      break;
    case "medium":
      priorityCss += " text-amber-400 ";
      break;
    case "high":
      priorityCss += " text-red-400 ";
      break;

    default:
      break;
  }

  return (
    <div
      className="h-[280px] my-2 space-y-2 border rounded-xl cursor-grabbing border-gray-400"
      draggable
      onDragStart={(e) => handleDragStart(e, task.id)}
      onDragEnd={handleDragEnd}
    >
      <div className={`rounded-t-xl px-4 py-2 space-y-2 ${headingCss}`}>
        <h3 className="font-semibold text-xl">{task.title}</h3>
        {dateOverDue < 7 && (
          <p className={dueDateCss}>
            Due date:- {isTodayDueDate ? "Due Today" : task.dueDate}
          </p>
        )}
        {dateOverDue >= 7 && (
          <p className="">{`Task is overdue by ${dateOverDue} days.`}</p>
        )}
      </div>

      <div className="px-3 py-2 space-y-6">
        <div className="font-medium text-lg text-slate-500 space-y-2">
          <img src={task.imgSrc} className="w-1/6" />
          <div>
            <label htmlFor="priority">Priority:- </label>
            <select
              name="priority"
              id="priority"
              className={`pl-1 ${priorityCss} hover:cursor-pointer`}
              defaultValue={task.priority}
              onChange={handleOptionChange}
            >
              <option value="low" className="text-black">
                Low
              </option>
              <option value="high" className="text-black">
                High
              </option>
              <option value="medium" className="text-black">
                Medium
              </option>
            </select>
          </div>
        </div>
        <div className="my-4">
          <p className="">{task.description}</p>
        </div>
      </div>
    </div>
  );
};
