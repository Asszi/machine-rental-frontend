import { Alert, Button, Form, Modal, Table } from 'react-bootstrap';
import { Company, Machine, Rental } from '../model';
import { useState } from 'react';
import useAxios from 'axios-hooks';
import axios from 'axios';
import { EMPTY_RENTAL } from '../constant';

const RentalTab = () => {
    const [{ data: getData, loading: getLoading, error: getError }, refetch] = useAxios<Rental[]>('http://127.0.0.1:8080/rental/getAll');
    const [{ data: getCompanyData, loading: getCompanyLoading, error: getCompanyError }, companyRefetch] = useAxios<Company[]>('http://127.0.0.1:8080/company/getAll');
    const [{ data: getMachineData, loading: getMachineLoading, error: getMachineError }, machineRefetch] = useAxios<Machine[]>('http://127.0.0.1:8080/machine/getAll');
    const [showModal, setShowModal] = useState(false);
    const [selectedRental, setSelectedRental] = useState<Rental>();
    const [editMode, setEditMode] = useState(false);

    const handleChange = (value: Partial<Rental>) =>
        selectedRental && setSelectedRental({ ...selectedRental, ...value });

    const displayError = () =>
        <Alert variant='danger'>
            <Alert.Heading>API error</Alert.Heading>
            <p>{`${getError}`}</p>
        </Alert>;

    const deleteRental = (id: number) => {
        axios.get(`http://127.0.0.1:8080/rental/delete/${id}`).then(refetch);
    };

    const addRental = () => {
        axios.post('http://127.0.0.1:8080/rental/create', selectedRental).then(refetch);
        setShowModal(false);
    };

    const editRental = () => {
        axios.post('http://127.0.0.1:8080/rental/modify', selectedRental).then(refetch);
        setShowModal(false);
    };

    const handleModalShow = (rental: Rental, edit = false) => {
        setEditMode(edit);
        setSelectedRental(rental);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setSelectedRental(undefined);
        setShowModal(false);
        setEditMode(false);
    };

    const showModalForm = () => {
        return (
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Rental</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Select aria-label='Company' value={selectedRental?.companyId} onChange={x => handleChange({ 'companyId': Number(x.target.value) })}>
                            <option>Company</option>
                            {
                                getCompanyData?.map(x => {
                                    return (
                                        <option key={x.id} value={x.id}>{`${x.name}`}</option>
                                    );
                                })
                            }
                        </Form.Select>
                        <Form.Select aria-label='Machine' value={selectedRental?.machineId} onChange={x => handleChange({ 'machineId': Number(x.target.value) })}>
                            <option>Machine</option>
                            {
                                getMachineData?.map(x => {
                                    return (
                                        <option key={x.id} value={x.id}>{`${x.name}`}</option>
                                    );
                                })
                            }
                        </Form.Select>
                        <Form.Group >
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control type='text' placeholder='Rental Start' value={selectedRental?.rentalStart} onChange={x => handleChange({ 'rentalStart': x.target.value })} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control type='text' placeholder='Rental End' value={selectedRental?.rentalEnd} onChange={x => handleChange({ 'rentalEnd': x.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={editMode ? editRental : addRental}>
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
                        <th>Company</th>
                        <th>Machine</th>
                        <th>Rental Start</th>
                        <th>Rental End</th>
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
                                <td>{getCompanyData?.find(y => y.id === x.companyId)?.name}</td>
                                <td>{getMachineData?.find(y => y.id === x.machineId)?.name}</td>
                                <td>{x.rentalStart}</td>
                                <td>{x.rentalEnd}</td>
                                <td><Button variant='primary' onClick={() => handleModalShow(x, true)}>Edit</Button></td>
                                <td><Button variant='danger' onClick={() => deleteRental(x.id)}>Delete</Button></td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </Table>
            <Button variant='primary' onClick={() => handleModalShow(EMPTY_RENTAL)}>Add</Button>
        </div>
    );
};

export default RentalTab;
