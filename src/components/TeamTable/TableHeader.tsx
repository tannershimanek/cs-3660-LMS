import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { sortAsc, sortDir, sortDesc, sortCol } from "../../reducers/table";
import { TableHeaderProps, TableHeaderFields, RootState } from "../../types";

export const TableHeader: React.FC<TableHeaderProps> = ({ headerObject }) => {
  const headerName = Object.keys(headerObject)[0];
  const header = headerObject[headerName as TableHeaderFields];
  const [showIcon, setShowIcon] = useState(false);
  const [icon, setIcon] = useState<JSX.Element>(<></>);
  const headerRef = useRef(null);
  const dispatch = useDispatch();
  const tableData = useSelector((state: RootState) => state.table.value);

  const sortAscending = () => {
    const sortCol = tableData.app.sortCol;
    const sortedAsc = [...tableData.data].sort((a: any, b: any) =>
      a[sortCol] > b[sortCol] ? 1 : -1
    );
    dispatch(sortAsc(sortedAsc));
    dispatch(sortDir("desc")); // swap sortdir
  };

  const sortDescending = () => {
    const sortCol = tableData.app.sortCol;
    const sortedDesc = [...tableData.data].sort((a: any, b: any) =>
      a[sortCol] < b[sortCol] ? 1 : -1
    );
    dispatch(sortDesc(sortedDesc));
    dispatch(sortDir("asc")); // swap sortdir
  };
  useEffect(() => {
    if (!header) return;
    if (tableData.app.sortDir === "asc") {
      if (tableData.app.sortCol === header.id) {
        setShowIcon(true);
        return setIcon(<FaArrowUp />);
      }
    } else if (tableData.app.sortDir === "desc") {
      if (tableData.app.sortCol === header.id) {
        setShowIcon(true);
        return setIcon(<FaArrowDown />);
      }
    } else {
      setShowIcon(false);
      return setIcon(<></>);
    }
  }, [showIcon, tableData.app.sortCol, tableData.app.sortDir, header]);
  if (!header) return null;

  const handleHeaderClick = () => {
    if (header.id === "actions") return;
    dispatch(sortCol(header.id)); // set sortcol
    switch (tableData.app.sortDir) {
      case "asc":
        sortAscending();
        setIcon(<FaArrowDown />);
        break;
      case "desc":
        sortDescending();
        break;
    }
  };

  return (
    <th
      key={header.id}
      id={header.id}
      ref={headerRef}
      onClick={() => handleHeaderClick()}
    >
      {header.title} {showIcon ? icon : null}
    </th>
  );
};
