import React from "react";
import CTableHead from "components/CTableHead";
import { Table, TableBody, TableContainer } from "@mui/material";

import { ITableHeadCell } from "pages/interface";
import CTableRow from "components/CTableRow";
interface Props {
  page?: number;
  rowsPerPage?: number;
  data: any[];
  headCells: ITableHeadCell[];
  handleClick: (id: string) => void;
}

const CTable = (props: Props) => {
  const { data, headCells, handleClick } = props;

  return (
    <TableContainer className="ctable-container">
      <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
        <CTableHead headCells={headCells} />
        <TableBody>
          {data.map((row, index) => (
            <CTableRow row={row} key={index} handleClick={handleClick} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CTable;
