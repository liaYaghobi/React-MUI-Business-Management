
import FeedOutlinedIcon  from '@mui/icons-material/FeedOutlined';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: <FeedOutlinedIcon />,
  },
  {
    title: 'Branches',
    path: '/dashboard/branches',
    icon: <PinDropOutlinedIcon />,
  },
  {
    title: 'Inventory',
    path: '/dashboard/inventory',
    icon: <ShoppingCartOutlinedIcon />
  },
  {
    title: 'Employees',
    path: '/dashboard/employees',
    icon: <GroupOutlinedIcon/>,
  },

];

export default navConfig;
