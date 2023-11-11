import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type IWatchlist = {};

function createData(
  account: string,
  monthly: string,
  ytd: string,
) {
  return { account, monthly, ytd };
}

const rows = [
  createData('Sales', "1,194.32", "11,324.12 "),
  createData('Advertising', "6,874.65", "9,987.50"),
  createData('Inventory', "3,214.09", "9,052.54"),
  createData('Entertainment', "0.00", "0.00"),
  createData('Product', "4,576.12", "2,543.73"),
];

const Watchlist: React.FC<IWatchlist> = (props) => {
  return (
    <TableContainer component={Paper}>
    <Table size='small' aria-label="simple table">
      <TableHead>
        <TableRow>
          {[
            "Account",
            "This Month",
            "YTD"
          ].map((item,key)=>{
            let align:any = key === 0 ? "left" : "justify";
            return (
              <TableCell align={align} key={key} sx={{border:0,color:"#C5C9C8"}}>{item}</TableCell>
            )
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.account}
            sx={{ '& .MuiTableCell-root': { border: 0, fontWeight:500 } }}
          >
            <TableCell component="th" scope="row" sx={{paddingRight:'80px'}}>
              {row.account}
            </TableCell>
            <TableCell align="justify">{row.monthly}</TableCell>
            <TableCell align="justify">{row.ytd}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>);
};

export default Watchlist;
