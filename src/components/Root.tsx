import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './customerpages/LandingPage';
import HomePage from './customerpages/HomePage';
import SignInSignUp from './customerpages/SignInSignUp'
import VacationPage from './customerpages/VacationPage';


const Root: React.FC = () => {
    return (
        <Routes>
            <Route  path="/" element={<LandingPage />}/>
            <Route  path="/home" element={<HomePage />}/>
            <Route  path="/sign" element={<SignInSignUp />}/>
            <Route  path='/vacation' element={<VacationPage />}/>
        </Routes>
    );
}
export default Root

