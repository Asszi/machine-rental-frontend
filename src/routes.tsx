import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompanyTab from './component/CompanyTab';
import MachineTab from './component/MachineTab';
import RentalTab from './component/RentalTab';
import TransactionTab from './component/TransactionTab';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/company' element={<CompanyTab />} />
                <Route path='/machine' element={<MachineTab />} />
                <Route path='/rental' element={<RentalTab />} />
                <Route path='/transaction' element={<TransactionTab />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
