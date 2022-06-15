import { Alert, Button, Form, Modal, Table } from 'react-bootstrap';
import { Brand, Machine, MachineType } from '../model';
import { useState } from 'react';
import useAxios from 'axios-hooks';
import axios from 'axios';
import { EMPTY_MACHINE } from '../constant';

const MachineTab = () => {
    const [{ data: getData, loading: getLoading, error: getError }, refetch] = useAxios<Machine[]>('http://127.0.0.1:8080/machine/getAll');
    const [{ data: getBrandData, loading: getBrandLoading, error: getBrandError }, brandRefetch] = useAxios<Brand[]>('http://127.0.0.1:8080/brand/getAll');
    const [{ data: getMachineTypeData, loading: getMachineTypeLoading, error: getMachineTypeError }, machineTypeRefetch] = useAxios<MachineType[]>('http://127.0.0.1:8080/machineType/getAll');
    const [showModal, setShowModal] = useState(false);
    const [selectedMachine, setSelectedMachine] = useState<Machine>();
    const [editMode, setEditMode] = useState(false);

    const handleChange = (value: Partial<Machine>) =>
        selectedMachine && setSelectedMachine({ ...selectedMachine, ...value });

    const displayError = () =>
        <Alert variant='danger'>
            <Alert.Heading>API error</Alert.Heading>
            <p>{`${getError}`}</p>
        </Alert>;

    const deleteMachine = (id: number) => {
        axios.get(`http://127.0.0.1:8080/machine/delete/${id}`).then(refetch);
    };

    const addMachine = () => {
        axios.post('http://127.0.0.1:8080/machine/create', selectedMachine).then(refetch);
        setShowModal(false);
    };

    const editMachine = () => {
        axios.post('http://127.0.0.1:8080/machine/modify', selectedMachine).then(refetch);
        setShowModal(false);
    };

    const handleModalShow = (machine: Machine, edit = false) => {
        setEditMode(edit);
        setSelectedMachine(machine);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setSelectedMachine(undefined);
        setShowModal(false);
        setEditMode(false);
    };

    const showModalForm = () => {
        return (
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Machine</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Select aria-label='Brand' value={selectedMachine?.brandId} onChange={x => handleChange({ 'brandId': Number(x.target.value) })}>
                            <option>Brand</option>
                            {
                                getBrandData?.map(x => {
                                    return (
                                        <option key={x.id} value={x.id}>{`${x.name}`}</option>
                                    );
                                })
                            }
                        </Form.Select>
                        <Form.Group >
                            <Form.Label>Machine Name</Form.Label>
                            <Form.Control type='text' placeholder='Machine Name' value={selectedMachine?.name} onChange={x => handleChange({ 'name': x.target.value })} />
                        </Form.Group>
                        <Form.Select aria-label='Machine Type' value={selectedMachine?.machineTypeId} onChange={x => handleChange({ 'machineTypeId': Number(x.target.value) })}>
                            <option>Machine Type</option>
                            {
                                getMachineTypeData?.map(x => {
                                    return (
                                        <option key={x.id} value={x.id}>{`${x.name}`}</option>
                                    );
                                })
                            }
                        </Form.Select>
                        <Form.Group >
                            <Form.Label>Power Output</Form.Label>
                            <Form.Control type='text' placeholder='Power Output' value={selectedMachine?.powerOutput} onChange={x => handleChange({ 'powerOutput': Number(x.target.value) })} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Weight</Form.Label>
                            <Form.Control type='text' placeholder='Weight' value={selectedMachine?.weight} onChange={x => handleChange({ 'weight': Number(x.target.value) })} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Rental Price</Form.Label>
                            <Form.Control type='text' placeholder='Rental Price' value={selectedMachine?.rentalPrice} onChange={x => handleChange({ 'rentalPrice': Number(x.target.value) })} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Safety Deposit</Form.Label>
                            <Form.Control type='text' placeholder='Safety Deposit' value={selectedMachine?.safetyDeposit} onChange={x => handleChange({ 'safetyDeposit': Number(x.target.value) })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={editMode ? editMachine : addMachine}>
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
                        <th>Brand Name</th>
                        <th>Name</th>
                        <th>Machine Type</th>
                        <th>Power Output</th>
                        <th>Weight</th>
                        <th>Rental Price</th>
                        <th>Safety Deposit</th>
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
                                <td>{getBrandData?.find(y => y.id === x.brandId)?.name}</td>
                                <td>{x.name}</td>
                                <td>{getMachineTypeData?.find(y => y.id === x.machineTypeId)?.name}</td>
                                <td>{x.powerOutput}</td>
                                <td>{x.weight}</td>
                                <td>{x.rentalPrice}</td>
                                <td>{x.safetyDeposit}</td>
                                <td><Button variant='primary' onClick={() => handleModalShow(x, true)}>Edit</Button></td>
                                <td><Button variant='danger' onClick={() => deleteMachine(x.id)}>Delete</Button></td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </Table>
            <Button variant='primary' onClick={() => handleModalShow(EMPTY_MACHINE)}>Add</Button>
        </div>
    );
};

export default MachineTab;
