import { FC, ReactElement, useEffect, useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReactPaginate from "react-paginate";

export interface TableColumn<T = any> {
  title: string;
  dataIndex?: keyof T;
  dataIndex1?: keyof T;
  render?: (data: T) => ReactElement;
  sort?: keyof T;
  wrap?: boolean;
  width?: string;
}

export interface TableData<T = any> {
  data: T[];
  total: number;
  per_page: number;
  last_page: number;
}

interface InputProps {
  columns: TableColumn[];
  data: TableData;
  handlePagination: (e: any) => void;
  loading?: boolean;
}

const Table: FC<InputProps> = (props) => {
  const {
    columns,
    data = {
      data: [],
      total: 0,
      per_page: 0,
      last_page: 1,
    },
    handlePagination,
    loading,
  } = props;
  const [tableData, setTableData] = useState<any[]>([]);

  const initiateTable = (data: any[]) => {
    const baseData = data;
    setTableData(baseData);
  };

  useEffect(() => {
    if (data.data.length === 0) return;
    initiateTable([...data.data]);
  }, [data.data]);

  const sort = (direction: "asc" | "desc", property: any) => {
    const baseData = [...data.data];
    const sortedData = baseData.sort((a, b) => {
      if (direction === "asc") return a[property] > b[property] ? 1 : -1;
      return a[property] < b[property] ? 1 : -1;
    });

    initiateTable(sortedData);
  };

  const countloader: number[] = [1, 2, 3, 4, 5];

  return (
    <div id="table" className="w-full">
      <div className="relative overflow-x-auto hd-scroll">
        <table className="w-full bg-gray-100 rounded overflow-hidden">
          <thead className="text-left font-medium bg-slate-100 w-full">
            <tr>
              <th className="flex items-center" style={{ width: "80%" }}>
                No
              </th>
              {columns.map((column, index) => {
                return (
                  <th key={index}>
                    <span className="flex justify-between">
                      {column.title}
                      {column.sort ? (
                        <div>
                          <MdArrowDropUp
                            onClick={() => sort("asc", column.sort)}
                            className="-mb-1.5 text-slate-400"
                            cursor="pointer"
                          />
                          <MdArrowDropDown
                            onClick={() => sort("desc", column.sort)}
                            className="text-slate-400"
                            cursor="pointer"
                          />
                        </div>
                      ) : null}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="relative">
            {loading ? (
              <>
                {countloader.map((data) => (
                  <tr className="odd:bg-white even:bg-gray-50" key={data}>
                    {columns.map((column) => (
                      <td key={column.title}>
                        <Skeleton />
                      </td>
                    ))}
                    <td>
                      <Skeleton />
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <>
                {tableData.length > 0 ? (
                  tableData.map((d, index) => {
                    return (
                      <tr key={index} className="odd:bg-white even:bg-gray-50">
                        <td>{index + 1}</td>
                        {props.columns.map((column, index) => {
                          let renderedContent;
                          if (column.dataIndex1) {
                            renderedContent = column.dataIndex
                              ? d[column.dataIndex][column.dataIndex1 as any]
                              : null;
                          } else {
                            renderedContent = column.dataIndex
                              ? d[column.dataIndex]
                              : null;
                          }
                          if (column.render) {
                            renderedContent = column.render(d);
                          }
                          return (
                            <td
                              key={index}
                              className={`${
                                column.wrap ? "whitespace-nowrap" : ""
                              }`}
                            >
                              {renderedContent}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="text-center">
                      Data masih kosong
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-3">
        {data.data.length > 0 ? (
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e) => handlePagination(e)}
            pageRangeDisplayed={data.per_page}
            pageCount={data.last_page}
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName="flex"
            activeClassName="bg-orange text-white border-none"
            pageClassName="border border-slate-300 ml-[-1px] hover:bg-slate-100 hover:text-slate-800"
            pageLinkClassName="flex items-center justify-center px-3 h-9"
            previousClassName="border border-slate-300 rounded-tl-md rounded-bl-md hover:bg-slate-100 hover:text-slate-800"
            previousLinkClassName="flex items-center justify-center px-3 h-9"
            nextClassName="border border-slate-300 rounded-tr-md rounded-br-md hover:bg-slate-100 hover:text-slate-800 ml-[-0.5px]"
            nextLinkClassName="flex items-center justify-center px-3 h-9"
            breakClassName="border border-slate-300 ml-[-1px]"
            breakLinkClassName="flex items-center justify-center px-3 h-9"
          />
        ) : null}
      </div>
    </div>
  );
};

export default Table;
