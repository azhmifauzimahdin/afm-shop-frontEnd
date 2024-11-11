import { FC, ReactElement, useEffect, useState } from "react";
import {
  MdArrowDropDown,
  MdArrowDropUp,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReactPaginate from "react-paginate";
import { Button, Input, Select } from "..";
import { useNavigate } from "react-router-dom";

export interface TableColumn<T = any> {
  title: string;
  dataIndex?: keyof T;
  dataIndex1?: keyof T;
  render?: (data: T) => ReactElement;
  sort?: keyof T;
  wrap?: boolean;
  width?: string;
}

interface InputProps<T = any> {
  columns: TableColumn[];
  data: T[];
  loading?: boolean;
  pathAddData?: string;
  search?: boolean;
}

const Table: FC<InputProps> = (props) => {
  const { columns, data, loading, pathAddData, search } = props;
  const [tableData, setTableData] = useState<any[][]>([]);
  const [tableCurrentPage, setTableCurrentPage] = useState<number>(0);
  const [tablePerPage, setTablePerPage] = useState<number>(10);
  const [sortDireaction, setSortDirection] = useState<"asc" | "desc" | "">("");
  const [sortColumn, setSortColumn] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (data.length === 0) return;
    initiateTable([...data]);
  }, [props.data, tablePerPage]);

  const initiateTable = (data: any[]) => {
    const baseData = data;
    const result: any[][] = [];
    while (baseData.length > 0) {
      result.push(baseData.splice(0, tablePerPage));
    }
    setTableData(result);
  };

  const searchData = (seacrhText: string) => {
    const result = searching(data, seacrhText);
    initiateTable(result);
  };

  const searching = (data: any[], seacrhText: string) => {
    const newDatas = data.map((data) => JSON.stringify(data));
    const filteredDatas = newDatas.filter((data) =>
      data.toLowerCase().includes(seacrhText.toLowerCase())
    );
    const normalizeDatas = filteredDatas.map((data) => JSON.parse(data));

    return normalizeDatas;
  };

  const sort = (direction: "asc" | "desc", property: any) => {
    setSortDirection(direction);
    setSortColumn(property);
    const baseDatas = [...data];
    const sortedDatas = baseDatas.sort((a, b) => {
      if (direction === "asc") return a[property] > b[property] ? 1 : -1;
      return a[property] < b[property] ? 1 : -1;
    });

    initiateTable(sortedDatas);
  };

  const countloader: number[] = [1, 2, 3, 4, 5];
  const ammontPerpage: any[] = [
    { label: "10 / page", value: 10 },
    { label: "25 / page", value: 25 },
    { label: "50 / page", value: 50 },
    { label: "100 / page", value: 100 },
  ];

  return (
    <div id="table" className="w-full">
      <div className="flex flex-col md:flex-row justify-between gap-3 mb-3">
        <div>
          {pathAddData ? (
            <Button
              type="button"
              color="primary"
              className="px-3"
              onClick={() => navigate(pathAddData)}
              loadingRender={loading}
            >
              Tambah Data
            </Button>
          ) : null}
        </div>
        {search ? (
          <Input
            type="search"
            id="search"
            name="search"
            width="w-48"
            onChange={(e) => searchData(e.target.value)}
            placeholder="Cari"
            loadingRender={loading}
          />
        ) : null}
      </div>
      <div className="relative overflow-x-auto hd-scroll">
        <table className="w-full bg-gray-100 rounded-xl overflow-hidden">
          <thead className="text-left font-medium bg-slate-200 w-full">
            {loading ? (
              <>
                <tr>
                  {columns.map((_, index) => (
                    <td key={index}>
                      <Skeleton height={20} />
                    </td>
                  ))}
                  <td>
                    <Skeleton height={20} />
                  </td>
                </tr>
              </>
            ) : (
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
                              className={`-mb-1.5 ${
                                column.sort === sortColumn &&
                                sortDireaction === "asc"
                                  ? "text-slate-600"
                                  : "text-slate-400"
                              } hover:text-slate-600`}
                              cursor="pointer"
                            />
                            <MdArrowDropDown
                              onClick={() => sort("desc", column.sort)}
                              className={`${
                                column.sort === sortColumn &&
                                sortDireaction === "desc"
                                  ? "text-slate-600"
                                  : "text-slate-400"
                              } hover:text-slate-600`}
                              cursor="pointer"
                            />
                          </div>
                        ) : null}
                      </span>
                    </th>
                  );
                })}
              </tr>
            )}
          </thead>
          <tbody className="relative">
            {loading ? (
              <>
                {countloader.map((data) => (
                  <tr className="odd:bg-slate-50 even:bg-gray-100" key={data}>
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
                  tableData[tableCurrentPage].map((d, index) => {
                    return (
                      <tr
                        key={index}
                        className="odd:bg-slate-50 even:bg-gray-100"
                      >
                        <td>{index + 1}</td>
                        {columns.map((column, index) => {
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
      <div className="mt-3 flex justify-between">
        <div>
          {loading ? (
            <Skeleton height={30} width={120} borderRadius={24} />
          ) : (
            <>
              {tableData.length > 0 ? (
                <Select
                  id="perpage"
                  name="perpage"
                  data={ammontPerpage}
                  onChange={(e: any) => {
                    setTableCurrentPage(0);
                    setTablePerPage(e.target.value);
                  }}
                />
              ) : null}
            </>
          )}
        </div>
        {loading ? (
          <Skeleton height={30} width={120} borderRadius={24} />
        ) : (
          <>
            {data.length > 0 ? (
              <ReactPaginate
                breakLabel="..."
                nextLabel={<MdKeyboardArrowRight />}
                onPageChange={(e) => {
                  setTableCurrentPage(e.selected);
                }}
                marginPagesDisplayed={1}
                forcePage={tableCurrentPage}
                pageRangeDisplayed={2}
                pageCount={tableData.length}
                previousLabel={<MdKeyboardArrowLeft />}
                renderOnZeroPageCount={null}
                containerClassName="flex"
                activeClassName="bg-orange text-white border-none"
                pageClassName="border border-slate-300 ml-[-0.5px] hover:bg-slate-100 hover:text-slate-800"
                pageLinkClassName="flex items-center justify-center px-3 h-9"
                previousClassName="border border-slate-300 rounded-tl-3xl rounded-bl-3xl hover:bg-slate-100 hover:text-slate-800"
                previousLinkClassName="flex items-center justify-center px-3 h-9"
                nextClassName="border border-slate-300 rounded-tr-3xl rounded-br-3xl hover:bg-slate-100 hover:text-slate-800 ml-[-0.5px]"
                nextLinkClassName="flex items-center justify-center px-3 h-9"
                breakClassName="border border-slate-300 ml-[-0.5px]"
                breakLinkClassName="flex items-center justify-center px-3 h-9"
              />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default Table;
