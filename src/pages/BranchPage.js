import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect} from 'react';
import NewWindow from 'react-new-window';

import axios from 'axios';

// @mui
import { Card, Table, Stack, Paper, Button, Checkbox, TableRow, TableBody, TableCell, Container, Typography,
  IconButton, TableContainer, TablePagination, TextField,} from '@mui/material';

// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';

// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/app/user';

// mock
const USERLIST = [];


const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'location', label: 'Location', alignRight: false },
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
  const [formData, setFormData] = useState({
    branch_name: "",
    branch_location: "",
  });
  const [userList, setUserList] = useState(USERLIST);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showWindow, setShowWindow] = useState(false);
  const [employees, setEmployees] = useState([{ id: uuidv4(), name: '', location: '' }]);

  const handleWindow = () => {
 
    setShowWindow(true);
  };

  const handleCloseWindow = () => {
    getDatabase()
    setShowWindow(false);
  }; 
  
  
  const handleDeleteClick = (row) => {
    //setUserList(updatedUserList);
    axios.delete(`http://localhost:8000/branch/delete_branch/${row.name}`)
    .then((response) => {
        USERLIST.splice(0, USERLIST.length);
        getDatabase();
        console.log(response.data);
    })
    .catch((error) => {
        // handle error
        console.error(error);
    });
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
      newSelected = [name];
    } else if (selectedIndex === 0) {
      newSelected = selected.slice(1);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = selected.slice(0, -1);
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
/*
  const handleSubmit = () => {
    const newEmployees = [...employees];
    USERLIST.push(...newEmployees);
    setEmployees([{ id: uuidv4(), name: '', branch: '', title: '', salary: '' }]);
  };*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.post('http://localhost:8000/branch/add_branch', formData);//first try to push new item to database
      getDatabase()
    } catch (error) {
      console.error(error);
      //handle error here
    }
    setFormData({
      branch_name: "",
      branch_location: ""
    });
  };

  const getDatabase = async (e) =>{
    const response =  await axios.get('http://localhost:8000/branch/getAll');
    const branchList = response.data.map(branch => {
      return {
        branch_name: branch.branch_name,
        branch_location: branch.branch_location,
      };
    });
    var testBranch = [];
    branchList.forEach(branch => {
        //prevents some accidental duping that was occuring...
        if (!USERLIST.some(i => i.name === branch.branch_name)){
            const newBranch = ([{ name: branch.branch_name, location: branch.branch_location}]);
            testBranch.push(...newBranch);
        }
    });
    USERLIST.push(...testBranch);
    //setUserList(USERLIST);
    setUserList(testBranch);
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  useEffect(() => {
    async function fetchData() {
      await getDatabase();
    }
    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title> Branches </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Branches
          </Typography>
          <Button onClick={handleWindow} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add Branch
          </Button>
        </Stack>
        {showWindow && (
        <NewWindow
          name="example"
          title="Example Website"
          features={{ width: 540, height: 380 }}
          onUnload={handleCloseWindow}
        >
              <form className='qPortal' onSubmit={handleSubmit}>
     
      {employees.map(q => (
        <div key={q.id}>
          <TextField
            style={{ width: "200px", margin: "5px" }}
            name="name"
            type="text"
            label="Name"
            value={formData.branch_name}
            onChange={(e) =>
            setFormData((prevFormData) => ({
                ...prevFormData,
                branch_name: e.target.value,
            }))
            }
          />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            name="location"
            type="text"
            label="Location"
            value={formData.branch_location}
            onChange={(e) =>
            setFormData((prevFormData) => ({
                ...prevFormData,
                branch_location: e.target.value,
            }))
            }
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
                    const { id, name, location} = row;
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

                        <TableCell align="left">{location}</TableCell>

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