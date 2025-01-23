import React from "react";

/**
 * Table component for rendering a table with dynamic columns and rows.
 *
 * @param {Object} props - The properties object.
 * @param {Array} props.columns - An array of column definitions.
 * @param {string} props.columns[].header - The header text for the column.
 * @param {string} props.columns[].accessor - The key to access the column's data in the row object.
 * @param {string} [props.columns[].className] - Optional CSS class for the column header.
 * @param {Function} props.renderRow - A function to render a row. It receives a data item and returns a React node.
 * @param {Array} props.data - An array of data items to be displayed in the table.
 *
 * @returns {JSX.Element} The rendered table component.
 */
const Table = ({
    columns,
    renderRow,
    data,
  }: {
    columns: { header: string; accessor: string; className?: string }[];
    renderRow: (item: any) => React.ReactNode;
    data: any[];
  }) => {
    return (
      <table className="w-full mt-4">
        <thead>
          <tr className="text-left text-gray-500 text-sm">
            {columns.map((col) => (
              <th key={col.accessor} className={col.className}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{data.map((item) => renderRow(item))}</tbody>
      </table>
    );
  };
  
  export default Table;