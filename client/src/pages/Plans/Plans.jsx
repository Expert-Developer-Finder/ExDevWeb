import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, Typography } from "@mui/material";

function createData(price, condition) {
  return { price, condition };
}

const rows = [
  createData("Free", "if we get A+"),
  createData("1$", "if we get A"),
  createData("100$", "if we get B+ or lower"),
];

export default function Plans() {
  return (
    <Container
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography style={{ marginTop: 50 }} variant="h2">
        The Pricing
      </Typography>
      <TableContainer style={{marginTop:15, maxWidth: 500 }} component={Paper} elevation={6}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Price</TableCell>
              <TableCell align="right">Condition</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.price}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.price}
                </TableCell>
                <TableCell align="right">{row.condition}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
