import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import NewWindow from 'react-new-window';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  TextField,
} from '@mui/material';

// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';

// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/app/user';

// mock
const USERLIST = [];

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'branch', label: 'Branch', alignRight: false },
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'salary', label: 'Salary', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [userList, setUserList] = useState(USERLIST);
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showWindow, setShowWindow] = useState(false);
  const [employees, setEmployees] = useState([{ id: uuidv4(), name: '', branch: '', title: '', salary: '' }]);

  const addEmployee = () => {
    setEmployees([...employees, { id: uuidv4(), name: '', branch: '', title: '', salary: '' }]);
  };

  const handleChangeInput = (id, event) => {
    const newEmployees = employees.map((employee) => {
      if (id === employee.id) {
        return { ...employee, [event.target.name]: event.target.value };
      }
      return employee;
    });
    setEmployees(newEmployees);
  };

  const handleWindow = () => {
    // Open the new window
    setShowWindow(true);
  };

  const handleCloseWindow = () => {
    // Open the new window
    setShowWindow(false);
  }; 
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleSubmit = () => {
    const newEmployees = [...employees];
    USERLIST.push(...newEmployees);
    setEmployees([{ id: uuidv4(), name: '', branch: '', title: '', salary: '' }]);
  };

  const handleDeleteClick = (row) => {

    const updatedUserList = USERLIST.splice(row, 1);
    setUserList(updatedUserList);
    
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> User </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Employees
          </Typography>
          <Button onClick={handleWindow} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add Employee
          </Button>
        </Stack>
        {showWindow && (
        <NewWindow
          name="Add Employees"
          title="Add Employees"
          features={{ width: 640, height: 480 }}
          onUnload={handleCloseWindow}
        >
              <form className='qPortal'>
      <Button id='AddButton' variant='contained' onClick={addEmployee}>
        Add Employee
      </Button>
     
      {employees.map(q => (
        <div key={q.id}>
          <TextField
            style={{ width: "200px", margin: "5px" }}
            name="name"
            type="text"
            label="Full Name"
            value={q.name}
            onChange={event => handleChangeInput(q.id, event)}
          />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            name="branch"
            type="text"
            label="Branch"
            value={q.branch}
            onChange={event => handleChangeInput(q.id, event)}
          />
           <TextField
            style={{ width: "200px", margin: "5px" }}
            name="title"
            type="text"
            label="Title"
            value={q.title}
            onChange={event => handleChangeInput(q.id, event)}
          />
         <TextField
            style={{ width: "200px", margin: "5px" }}
            name="salary"
            type="number"
            label="Salary"
            value={q.salary}
            onChange={event => handleChangeInput(q.id, event)}
          />
        </div>
      ))}
     <Button  onClick={handleSubmit} >Submit </Button>
    </form>
        </NewWindow>
      )}

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table >
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, branch, title, salary} = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={4}>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{branch}</TableCell>

                        <TableCell align="left">{title}</TableCell>

                        <TableCell align="left">{salary}</TableCell>

                  
                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={() => handleDeleteClick(row)}>
                            <Iconify icon={'eva:trash-2-outline'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}