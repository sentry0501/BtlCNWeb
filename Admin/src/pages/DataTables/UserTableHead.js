import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";

const rows = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name"
  },
  
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  { id: "address", numeric: false, disablePadding: false, label: "Address" },
  { id: "phone", numeric: false, disablePadding: false, label: "Phone" },
  { id: "role", numeric: false, disablePadding: false, label: "Role" }
];

class UserTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };
  
  render() {
    const {
      order,
      orderBy,
    } = this.props;

    return (
      <TableHead>
        <TableRow>

          {rows.map(
            row => (
              <TableCell
                key={row.id}
                // align={row.numeric ? "right" : "left"}
                // padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

UserTableHead.propTypes = {

  onRequestSort: PropTypes.func.isRequired,

  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default UserTableHead;
