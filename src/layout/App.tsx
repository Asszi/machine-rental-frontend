import React from 'react';
import AppMenu from './AppMenu';
import { Container } from 'react-bootstrap';
import AppFooter from './AppFooter';
import AppRoutes from '../routes';

const App = () => {
  return (
    <>
        <AppMenu />
        <Container className='content'>
            <AppRoutes />
        </Container>
        <AppFooter className='footer' />
    </>
  );
};

export default App;
