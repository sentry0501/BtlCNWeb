import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/Table";
import TableHeader from "@material-ui/core/Table";
import TableHeaderColumn from "@material-ui/core/Table";
import TableRow from "@material-ui/core/Table";
import TableRowColumn from "@material-ui/core/Table";
// import EditIcon from "@material-ui/core/svg-icons/image/edit";
import DeleteIcon from "@material-ui/icons/Delete";
// import DownArrow from "@material-ui/core/svg-icons/navigation/arrow-drop-down";
// import UpArrow from "@material-ui/core/svg-icons/navigation/arrow-drop-up";
import TextField from "@material-ui/core/TextField";

// import InlineForm from "./InlineForm";

const row = (
  x,
  i,
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleSave,
  stopEditing
) => {
  const currentlyEditing = editIdx === i;
  return currentlyEditing ? (
<div></div>
  ) : (
    <TableRow key={`tr-${i}`} selectable={false}>
      {header.map((y, k) => (
        <TableRowColumn key={`trc-${k}`}>{x[y.prop]}</TableRowColumn>
      ))}
      <TableRowColumn>
        {/* <EditIcon onClick={() => startEditing(i)} /> */}
        <DeleteIcon onClick={() => handleRemove(i)} />
      </TableRowColumn>
    </TableRow>
  );
};

export default ({
  data,
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleSave,
  stopEditing,
  handleSort,
  sortDirection,
  columnToSort
}) => (
  <Table>
    <TableHeader>
      <TableRow>
        {header.map((x, i) => (
          <TableHeaderColumn key={`thc-${i}`}>
            <div
              style={{
                display: "flex",
                alignItems: "center"
              }}
              onClick={() => handleSort(x.prop)}
            >
              <span>{x.name}</span>
              {columnToSort === x.prop ? (
                sortDirection === "asc" ? (
                  null
                  // <UpArrow />
                ) : (
                  null
                  // <DownArrow />
                )
              ) : null}
            </div>
          </TableHeaderColumn>
        ))}
        <TableHeaderColumn />
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((x, i) =>
        row(
          x,
          i,
          header,
          handleRemove,
          startEditing,
          editIdx,
          handleSave,
          stopEditing
        )
      )}
    </TableBody>
  </Table>
);
