# 🗂️ Project Management Tool (Frontend Assignment)

## 🚀 Overview

This is a frontend-only project management tool built using **React.js, TypeScript, and Tailwind CSS**. The application demonstrates advanced UI engineering concepts such as state sharing across views, virtual scrolling, custom drag-and-drop, and dynamic filtering.

The project uses a single in-memory dataset (500 tasks) and renders it across multiple views without re-fetching, ensuring consistency and performance.

---

## ✨ Features Implemented

### ✅ Kanban Board

* Four columns: **To Do, In Progress, In Review, Done**
* Tasks displayed as cards with:

  * Title
  * Assignee initials avatar
  * Priority badge (color-coded)
  * Due date with:

    * "Due Today" label
    * Overdue highlighting (red)
    * Overdue > 7 days shows days count
* Column-wise task count
* Independent column scrolling
* Styled empty states

### ✅ Custom Drag and Drop

* Built using native browser events (no external libraries)
* Smooth drag experience with:

  * Placeholder to prevent layout shift
  * Drop zone highlighting
  * Snap-back animation for invalid drops

### ✅ List View with Virtual Scrolling

* Efficient handling of **500+ tasks**
* Only visible rows + buffer rendered
* Smooth scrolling with no flickering
* Sorting supported:

  * Title (A–Z)
  * Priority (Critical → Low)
  * Due date (earliest first)
* Inline status updates via dropdown

### ✅ Advanced Filtering

* Filters:

  * Status
  * Priority
  * Assignee
  * Due date range
* Instant filtering (no submit)
* URL query parameter sync
* Restores state on reload/navigation
* "Clear Filters" button when active

### ✅ Edge Case Handling

* Empty Kanban columns
* Empty list after filtering
* Due today labeling
* Overdue logic with dynamic messaging

---

## ⚙️ Tech Stack

* **React.js (Hooks)**
* **TypeScript**
* **Tailwind CSS**

---

## 📁 Folder Structure

```
src/
 ├── components/
 │    ├── Kanban/
 │    ├── List/
 │    ├── Common/
 │
 ├── hooks/
 ├── utils/
 ├── data/
 ├── App.tsx
```

---

## ⚡ Performance Optimizations

* Virtual scrolling to reduce DOM nodes
* Memoization of computed task lists
* Efficient state updates without re-fetching
* Minimal re-renders using component separation

---

## 🧪 Data Handling

* Generated **500 tasks** using a custom data generator
* Randomized:

  * Priority
  * Status
  * Due dates
  * Assignees

---

## ⚠️ Pending Features

* Timeline / Gantt View
* Live collaboration indicators

---

## 🎯 Goal

The goal of this project is to demonstrate strong frontend fundamentals, performance optimization techniques, and the ability to build complex UI systems without relying on external libraries.

---

## 🏁 Conclusion

This project showcases a scalable and maintainable frontend architecture while solving real-world UI challenges such as drag-and-drop, large dataset rendering, and state synchronization across multiple views.

