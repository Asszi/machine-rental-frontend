import { Alert, Button, Form, Modal, Table } from 'react-bootstrap';
import { Company, Transaction } from '../model';
import { useState } from 'react';
import useAxios from 'axios-hooks';
import axios from 'axios';
import { EMPTY_TRANSACTION } from '../constant';

const TransactionTab = () => {
    const [{ data: getData, loading: getLoading, error: getError }, refetch] = useAxios<Transaction[]>('http://127.0.0.1:8080/transaction/getAll');
    const [{ data: getCompanyData, loading: getCompanyLoading, error: getCompanyError }, companyRefetch] = useAxios<Company[]>('http://127.0.0.1:8080/company/getAll');
    const [showModal, setShowModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction>();
    const [editMode, setEditMode] = useState(false);

    const handleChange = (value: Partial<Transaction>) =>
        selectedTransaction && setSelectedTransaction({ ...selectedTransaction, ...value });

    const displayError = () =>
        <Alert variant='danger'>
            <Alert.Heading>API error</Alert.Heading>
            <p>{`${getError}`}</p>
        </Alert>;

    const deleteTransaction = (id: number) => {
        axios.get(`http://127.0.0.1:8080/transaction/delete/${id}`).then(refetch);
    };

    const addTransaction = () => {
        axios.post('http://127.0.0.1:8080/transaction/create', selectedTransaction).then(refetch);
        setShowModal(false);
    };

    const editTransaction = () => {
        axios.post('http://127.0.0.1:8080/transaction/modify', selectedTransaction).then(refetch);
        setShowModal(false);
    };

    const handleModalShow = (transaction: Transaction, edit = false) => {
        setEditMode(edit);
        setSelectedTransaction(transaction);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setSelectedTransaction(undefined);
        setShowModal(false);
        setEditMode(false);
    };

    const showModalForm = () => {
        return (
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Select aria-label='Company' value={selectedTransaction?.companyId} onChange={x => handleChange({ 'companyId': Number(x.target.value) })}>
                            <option>Company</option>
                            {
                                getCompanyData?.map(x => {
                                    return (
                                        <option key={x.id} value={x.id}>{`${x.name}`}</option>
                                    );
                                })
                            }
                        </Form.Select>
                        <Form.Group >
                            <Form.Label>Value</Form.Label>
                            <Form.Control type='text' placeholder='Value' value={selectedTransaction?.value} onChange={x => handleChange({ 'value': Number(x.target.value) })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={editMode ? editTransaction : addTransaction}>
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
                        <th>Value</th>
                        <th>Timestamp</th>
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
                                <td>{x.value}</td>
                                <td>{x.timestamp}</td>
                                <td><Button variant='primary' onClick={() => handleModalShow(x, true)}>Edit</Button></td>
                                <td><Button variant='danger' onClick={() => deleteTransaction(x.id)}>Delete</Button></td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </Table>
            <Button variant='primary' onClick={() => handleModalShow(EMPTY_TRANSACTION)}>Add</Button>
        </div>
    );
};

export default TransactionTab;
