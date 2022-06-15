import { Container } from 'react-bootstrap';

interface AppFooterProps {
    className: string;
}

const AppFooter = ({ className = '' }: AppFooterProps) => {
    return (
      <Container className={className} style={{ textAlign: 'center', backgroundColor: '#F8F8F8' }}>
          <p>Created by <b>Balazs Orehovszki</b> | THORXS Ⓒ 2022</p>
      </Container>
    );
};

export default AppFooter;
