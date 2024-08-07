import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  TextField,
  Typography,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import { IData, IDataItem } from "../../utils/types/dataType";
import { fetchData } from "../../service/fetchData";

import { makeStyles } from "@material-ui/core/styles";

import { format } from "date-fns";

const useStyles = makeStyles({
  tableContainer: {
    overflowX: "auto",
    maxWidth: 1100,
  },
  table: {
    maxWidth: "500px",
  },
  cell: {
    whiteSpace: "nowrap",
  },
});

export const TablePage = () => {
  const classes = useStyles();

  const [data, setData] = useState<IData>({ data_items: [] });
  const [releaseFilter, setReleaseFilter] = useState<string>("");
  const [productFilter, setProductFilter] = useState<string>("");
  const [featureTypeFilter, setFeatureTypeFilter] = useState<string>("");
  const [featureWildcard, setFeatureWildcard] = useState<string>("");

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("created_dt");

  useEffect(() => {
    const fetchDataAsync = async () => {
      const result: IData = await fetchData(0, Number.MAX_SAFE_INTEGER);
      setData(result);
    };

    fetchDataAsync();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const formatDateTime = (dateTimeString: string) => {
    return format(new Date(dateTimeString), "yyyy-MM-dd HH:mm:ss");
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property: keyof IDataItem) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setData({
      data_items: data.data_items.sort((a, b) =>
        isAsc
          ? a[property].localeCompare(b[property])
          : b[property].localeCompare(a[property])
      ),
    }); 
  };


  const filteredData = data.data_items.filter((item) => {
    return (
      (!releaseFilter || item.entity_type === releaseFilter) &&
      (!productFilter || item.legal_name === productFilter) &&
      (!featureTypeFilter || item.dba_name === featureTypeFilter) &&
      (!featureWildcard ||
        item.legal_name.toLowerCase().includes(featureWildcard.toLowerCase()))
    );
  });

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div
      style={{
        display: "flex",
        gap: "50px",
      }}
    >
      <div>
        <Typography variant="h6" gutterBottom>
          Features by Jock’s rating for releases All (Select to see item detail
          if it exists)
        </Typography>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table stickyHeader className={classes.table}>
            <TableHead>
              <TableRow>
              <TableCell className={classes.cell}>
                  <TableSortLabel
                    active={orderBy === "created_dt"}
                    direction={orderBy === "created_dt" ? order : "asc"}
                    onClick={() => handleSort("created_dt")}
                  >
                    Created_DT
                  </TableSortLabel>
                </TableCell>
                <TableCell className={classes.cell}>
                  <TableSortLabel
                    active={orderBy === "data_source_modified_dt"}
                    direction={orderBy === "data_source_modified_dt" ? order : "asc"}
                    onClick={() => handleSort("data_source_modified_dt")}
                  >
                    Modified_DT
                  </TableSortLabel>
                </TableCell>
                <TableCell className={classes.cell}>Entity</TableCell>
                <TableCell className={classes.cell}>
                  <TableSortLabel
                    active={orderBy === "legal_name"}
                    direction={orderBy === "legal_name" ? order : "asc"}
                    onClick={() => handleSort("legal_name")}
                  >
                    Legal name
                  </TableSortLabel>
                </TableCell>
                <TableCell className={classes.cell}>DBA name</TableCell>
                <TableCell className={classes.cell}>Physical address</TableCell>
                <TableCell className={classes.cell}>Phone</TableCell>
                <TableCell className={classes.cell}>DOT</TableCell>
                <TableCell className={classes.cell}>MC/MX/FF</TableCell>
                <TableCell className={classes.cell}>Power units</TableCell>
                <TableCell className={classes.cell}>
                  Out of service date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className={classes.cell}>
                    {formatDateTime(item.created_dt)}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {formatDateTime(item.data_source_modified_dt)}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {item.entity_type}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {item.legal_name}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {item.dba_name}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {item.physical_address}
                  </TableCell>
                  <TableCell className={classes.cell}>{item.phone}</TableCell>
                  <TableCell className={classes.cell}>
                    {item.usdot_number}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {item.mc_mx_ff_number}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {item.power_units}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {item.mcs_150_form_date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Select
          value={releaseFilter}
          onChange={(e) => setReleaseFilter(e.target.value)}
          displayEmpty
          style={{ marginRight: "10px" }}
        >
          <MenuItem value="">Release (All)</MenuItem>
          <MenuItem value="v1.0">v1.0</MenuItem>
          <MenuItem value="v1.5">v1.5</MenuItem>
          <MenuItem value="v2.0">v2.0</MenuItem>
        </Select>
        <Select
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value)}
          displayEmpty
          style={{ marginRight: "10px" }}
        >
          <MenuItem value="">Product (All)</MenuItem>
          <MenuItem value="Desktop">Desktop</MenuItem>
          {/* Add more product options if needed */}
        </Select>
        <Select
          value={featureTypeFilter}
          onChange={(e) => setFeatureTypeFilter(e.target.value)}
          displayEmpty
          style={{ marginRight: "10px" }}
        >
          <MenuItem value="">Feature Type (All)</MenuItem>
          <MenuItem value="Shelf System">Shelf System</MenuItem>
          <MenuItem value="Performance">Performance</MenuItem>
          <MenuItem value="Connectivity">Connectivity</MenuItem>
          {/* Add more feature type options if needed */}
        </Select>
        <TextField
          value={featureWildcard}
          onChange={(e) => setFeatureWildcard(e.target.value)}
          placeholder="Feature Wildcard"
        />
      </div>
    </div>
  );
};
