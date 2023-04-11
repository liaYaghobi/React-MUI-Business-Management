// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Branches',
    path: '/dashboard/branches',
    icon: icon('ic_blog'),
  },
  {
    title: 'Inventory',
    path: '/dashboard/inventory',
    icon: icon('ic_cart'),
  },
  {
    title: 'Employees',
    path: '/dashboard/employees',
    icon: icon('ic_user'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'register',
    path: '/register',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
