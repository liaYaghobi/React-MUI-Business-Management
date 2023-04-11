import { alpha } from '@mui/material/styles';

const palette = {
  common: { black: '#000', white: '#fff' },
  primary: {
    lighter: '#E6F4FF',
    light: '#B3D4FF',
    main: '#0d47a1',
    dark: '#3C5A99',
    darker: '#293E66',
    contrastText: '#fff',
  },
  secondary: {
    lighter: '#D6E9FF',
    light: '#A2C2FF',
    main: '#9ea9b1',
    dark: '#002E6C',
    darker: '#001A36',
    contrastText: '#fff',
  },
  
  info: {
    lighter: '#D9EDFF',
    light: '#B3D4FF',
    main: '#0096F6',
    dark: '#0068BF',
    darker: '#003D84',
    contrastText: '#fff',
  },
  success: {
    lighter: '#E6FCD7',
    light: '#B3F7C9',
    main: '#00C853',
    dark: '#009624',
    darker: '#006B1F',
    contrastText: '#fff',
  },
  warning: {
    lighter: '#FFF8CD',
    light: '#FFE5A5',
    main: '#FFC107',
    dark: '#B78103',
    darker: '#7A4F01',
    contrastText: '#fff',
  },
  error: {
    lighter: '#FFD6D9',
    light: '#FFA2A8',
    main: '#D32F2F',
    dark: '#9A0007',
    darker: '#610001',
    contrastText: '#fff',
  },
  grey: {
    0: '#FFFFFF',
    100: '#F7F9FC',
    200: '#EDF1F7',
    300: '#E4E9F2',
    400: '#C5CEE0',
    500: '#8F9BB3',
    600: '#2E3A59',
    700: '#222B45',
    800: '#1A2138',
    900: '#151A30',
  },
  divider: alpha('#8F9BB3', 0.24),
  text: {
    primary: '#2E3A59',
    secondary: '#8F9BB3',
    disabled: '#C5CEE0',
  },
  background: {
    paper: '#e8f4fd',
    default: '#F7F9FC',
    neutral: '#F7F9FC',
  },
  action: {
    active: '#2E3A59',
    hover: alpha('#2E3A59', 0.08),
    selected: alpha('#2E3A59', 0.16),
    disabled: alpha('#2E3A59', 0.48),
    disabledBackground: alpha('#2E3A59', 0.24),
    focus: alpha('#2E3A59', 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;
