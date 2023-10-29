import {createTheme} from '@mui/material/styles';
import {indigo, lightBlue} from '@mui/material/colors'

const customTheme = createTheme( {
    palette: {
        primary: indigo,
        secondary : {
            light: lightBlue[600],
            main: lightBlue[700],
            dark: lightBlue[900]
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
    },
    breakpoints: {
        keys: ["xs", "sm", "md", "lg", "xl"],
        values: {
            xs: 0,
            sm: 800,
            md: 1200,
            lg: 1600,
            xl: 1920
        }
    }
});

  declare module '@mui/material/styles' {
    interface Palette {
      neutral: Palette['primary'];
    }
  
    // allow configuration using `createTheme`
    interface PaletteOptions {
      neutral?: PaletteOptions['primary'];
    }
  }
  
  // @babel-ignore-comment-in-output Update the Button's color prop options
  declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
      neutral: true;
    }
  }

declare module '@mui/material/styles'
const theme = {
    ...customTheme
}

export default theme;