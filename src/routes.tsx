import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompanyTab from './component/CompanyTab';
import MachineTab from './component/MachineTab';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/company' element={<CompanyTab />} />
                <Route path='/machine' element={<MachineTab />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
