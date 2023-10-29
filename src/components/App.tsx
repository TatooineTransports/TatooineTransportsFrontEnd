import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Root from './Root';
import theme from '../theme'
import { AuthProvider } from '../provider/AuthProvider';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <AuthProvider>
                    <Root />
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App;
