import { useState } from "react";

type Filter = "title" | "priority" | "due-date";

type DropLetHeaderProps = {
  heading: string;
  filterType: string | null;
  onFilter: (type: Filter) => void;
};

const FILTER_OPTIONS = [
  { option: "Title", code: "title" },
  { option: "Priority", code: "priority" },
  { option: "Due Date", code: "due-date" },
];

export const DropletColumnHeader = ({
  heading,
  filterType,
  onFilter,
}: DropLetHeaderProps) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const handleToggle = () => {
    setToggle((prev) => {
      return !prev;
    });
  };

  return (
    <header
      className="w-full relative border-b border-b-gray-300 px-4 py-2 cursor-pointer"
      onClick={handleToggle}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium text-center">{heading}</h2>
        {filterType && (
          <p className="text-xs font-medium">Filtered by:- {filterType}</p>
        )}
      </div>
      <div
        className={`w-1/2 z-10 absolute right-2 top-11/12 bg-slate-600 px-4 py-2 text-white space-y-1.5 rounded-xl ${toggle ? "visible" : "hidden"}`}
      >
        {FILTER_OPTIONS.map((d) => (
          <p
            key={d.option}
            className="hover:cursor-pointer hover:underline hover:underline-offset-1"
            onClick={() => onFilter(d.code as Filter)}
          >
            {d.option}
          </p>
        ))}
      </div>
    </header>
  );
};
