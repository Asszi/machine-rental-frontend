import { Alert, Button, Form, Modal, Table } from 'react-bootstrap';
import { Company } from '../model';
import { useState } from 'react';
import useAxios from 'axios-hooks';
import axios from 'axios';
import { EMPTY_COMPANY } from '../constant';

const CompanyTab = () => {
    const [{ data: getData, loading: getLoading, error: getError }, refetch] = useAxios<Company[]>('http://127.0.0.1:8080/company/getAll');
    const [showModal, setShowModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<Company>();
    const [editMode, setEditMode] = useState(false);

    const handleChange = (value: Partial<Company>) =>
        selectedCompany && setSelectedCompany({ ...selectedCompany, ...value });

    const displayError = () =>
        <Alert variant='danger'>
            <Alert.Heading>API error</Alert.Heading>
            <p>{`${getError}`}</p>
        </Alert>;

    const deleteCompany = (id: number) => {
        axios.get(`http://127.0.0.1:8080/company/delete/${id}`).then(refetch);
    };

    const addCompany = () => {
        axios.post('http://127.0.0.1:8080/company/create', selectedCompany).then(refetch);
        setShowModal(false);
    };

    const editCompany = () => {
        axios.post('http://127.0.0.1:8080/company/modify', selectedCompany).then(refetch);
        setShowModal(false);
    };

    const handleModalShow = (company: Company, edit = false) => {
        setEditMode(edit);
        setSelectedCompany(company);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setSelectedCompany(undefined);
        setShowModal(false);
        setEditMode(false);
    };

    const showModalForm = () => {
        return (
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Company</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group >
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control type='text' placeholder='Company Name' value={selectedCompany?.name} onChange={x => handleChange({ 'name': x.target.value })} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Representative</Form.Label>
                            <Form.Control type='text' placeholder='Representative' value={selectedCompany?.representative} onChange={x => handleChange({ 'representative': x.target.value })} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Tax ID</Form.Label>
                            <Form.Control type='text' placeholder='Tax ID' value={selectedCompany?.taxId} onChange={x => handleChange({ 'taxId': Number(x.target.value) })} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Registration Number</Form.Label>
                            <Form.Control type='text' placeholder='Registration Number' value={selectedCompany?.companyRegistrationNumber} onChange={x => handleChange({ 'companyRegistrationNumber': x.target.value })} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Address</Form.Label>
                            <Form.Control type='text' placeholder='Address' value={selectedCompany?.headquartersAddress} onChange={x => handleChange({ 'headquartersAddress': x.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={editMode ? editCompany : addCompany}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    return (
        <div style={{ marginTop: 40, marginBottom: 40 }}>
            {!!getError && displayError()}
            {showModalForm()}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Representative</th>
                        <th>Tax ID</th>
                        <th>Registration Number</th>
                        <th>Address</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {
                    getData?.map((x, index) => {
                        return (
                            <tr key={x.id}>
                                <td>{`${index + 1}`}</td>
                                <td>{x.name}</td>
                                <td>{x.representative}</td>
                                <td>{x.taxId}</td>
                                <td>{x.companyRegistrationNumber}</td>
                                <td>{x.headquartersAddress}</td>
                                <td><Button variant='primary' onClick={() => handleModalShow(x, true)}>Edit</Button></td>
                                <td><Button variant='danger' onClick={() => deleteCompany(x.id)}>Delete</Button></td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </Table>
            <Button variant='primary' onClick={() => handleModalShow(EMPTY_COMPANY)}>Add</Button>
        </div>
    );
};

export default CompanyTab;
