import type { Task } from "../components/DragableItems";
import ImgSrc from "../assets/user-avator.png";

export const TASK_ARRAY: Task[] = [
  {
    id: 101,
    imgSrc: ImgSrc,
    title: "Design login page UI",
    description: "Create responsive layout for login and signup screens.",
    dueDate: "2026-03-27",
    status: "in-progress",
    priority: "high",
  },
  {
    id: 102,
    imgSrc: ImgSrc,
    title: "Fix payment gateway bug",
    description: "Resolve transaction failure issue for UPI payments.",
    dueDate: "2026-03-26",
    status: "todo",
    priority: "high",
  },
  {
    id: 103,
    imgSrc: ImgSrc,
    title: "Write API documentation",
    description: "Document all endpoints for the user service module.",
    dueDate: "2026-03-30",
    status: "in-review",
    priority: "medium",
  },
  {
    id: 104,
    imgSrc: ImgSrc,
    title: "Update dashboard charts",
    description: "Integrate new analytics data into charts.",
    dueDate: "2026-03-29",
    status: "todo",
    priority: "low",
  },
  {
    id: 105,
    imgSrc: ImgSrc,
    title: "Add email notifications",
    description: "Implement email alerts for user activity.",
    dueDate: "2026-04-02",
    status: "done",
    priority: "medium",
  },
  {
    id: 106,
    imgSrc: ImgSrc,
    title: "Set up CI/CD pipeline",
    description: "Automate build and deployment using GitHub Actions.",
    dueDate: "2026-04-05",
    status: "in-progress",
    priority: "high",
  },
  {
    id: 107,
    imgSrc: ImgSrc,
    title: "ARefactor authentication module",
    description: "Clean up and modularize auth-related code.",
    dueDate: "2026-04-03",
    status: "in-review",
    priority: "high",
  },
  {
    id: 108,
    imgSrc: ImgSrc,
    title: "Create onboarding flow",
    description: "Design and implement first-time user onboarding.",
    dueDate: "2026-04-04",
    status: "todo",
    priority: "medium",
  },
  {
    id: 109,
    imgSrc: ImgSrc,
    title: "Fix mobile responsiveness issues",
    description: "Resolve layout breaking issues on small screens.",
    dueDate: "2026-03-28",
    status: "done",
    priority: "low",
  },
  {
    id: 110,
    imgSrc: ImgSrc,
    title: "Optimize database queries",
    description: "Improve performance of slow-running SQL queries.",
    dueDate: "2026-04-01",
    status: "in-progress",
    priority: "high",
  },
];

export const generateTasks = (count: number = 500) => {
  const statuses = ["todo", "in-progress", "in-review", "done"] as const;
  const priorities = ["high", "medium", "low"] as const;
  // const users = ["RS", "AK", "JD", "MK", "VP"];

  return Array.from({ length: count }, (_, i) => {
    const randomDay = Math.floor(Math.random() * 28) + 1;
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    const year = 2026;

    const formatDate = (d: number, m: number, y: number) =>
      `${String(d).padStart(2, "0")}-${String(m).padStart(2, "0")}-${y}`;

    return {
      id: i+1,
      title: `Task ${i + 1}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      dueDate: formatDate(randomDay, randomMonth, year),
      imgSrc: ImgSrc,
      description: "Improve performance of slow-running SQL queries.",
    };
  });
};
