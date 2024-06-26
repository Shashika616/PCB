import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
    Box, Button, CssBaseline, FormControl, InputLabel, MenuItem, Select, TextField, Typography
} from '@mui/material';
import Navbar from '../components/navbars/NavLogistic';
import { useAuthContext } from '@asgardeo/auth-react';
import '../styles/LogisticPageStyle.css';

const LogisticsPage = () => {
    const {signOut} = useAuthContext();
    const [pcbs, setPcbs] = useState([]);
    const [selectedPcbId, setSelectedPcbId] = useState('');
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [newCustomer, setNewCustomer] = useState({ name: '', address: '', numberOfPCBsRequired: 0 });
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        fetchPCBs();
    }, []);

    useEffect(() => {
        // Validate form whenever newCustomer state changes
        validateForm();
    }, [newCustomer]);

    const fetchPCBs = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/logistics/pcbs');
            setPcbs(response.data);
        } catch (error) {
            console.error('Error fetching PCBs:', error);
        }
    };

    const fetchCustomers = async (pcbId) => {
        try {
            const response = await axios.get(`http://localhost:8081/api/logistics/pcbs/${pcbId}/customers`);
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handlePcbChange = (event) => {
        const pcbId = event.target.value;
        setSelectedPcbId(pcbId);
        fetchCustomers(pcbId);
    };

    const handleCustomerClick = async (customerId) => {
        try {
            const response = await axios.get(`http://localhost:8081/api/logistics/pcbs/${selectedPcbId}/customers/${customerId}`);
            setSelectedCustomer(response.data);
        } catch (error) {
            console.error('Error fetching customer details:', error);
        }
    };

    const handleAddCustomer = async () => {
        try {
            await axios.post(`http://localhost:8081/api/logistics/pcbs/${selectedPcbId}/customers`, newCustomer);
            fetchCustomers(selectedPcbId);
            setNewCustomer({ name: '', address: '', numberOfPCBsRequired: 0 });
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    };

    const handleUpdateCustomer = async () => {
        try {
            await axios.put(`http://localhost:8081/api/logistics/pcbs/${selectedPcbId}/customers/${selectedCustomer.name}`, selectedCustomer);
            fetchCustomers(selectedPcbId);
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    const handleLogout = async () => {
        try{
            await signOut();
        }catch (error){
            console.error("Error signing out",error);
       }
        alert('Logged out');
    };

    const validateForm = () => {
        const { name, address, numberOfPCBsRequired } = newCustomer;
        if (name.trim() !== '' && address.trim() !== '' && numberOfPCBsRequired !== 0) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    };

    return (
        // <CssBaseline />
        <div className='container'>
            <Navbar onLogout={handleLogout} />
            <Box sx={{ mt: 8, p: 2 }}>
                <Typography variant="h3" gutterBottom>
                    Logistics Page
                </Typography>
                <FormControl fullWidth>
                    <InputLabel>Select PCB</InputLabel>
                    <Select value={selectedPcbId} onChange={handlePcbChange}>
                        {pcbs.map(pcb => (
                            <MenuItem key={pcb.id} value={pcb.id}>
                                {pcb.modelName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {selectedPcbId && (
                    <div>
                        <h2>Customers</h2>
                        {customers.length === 0 ? (
                            <Typography variant="body1">No customers for this PCB</Typography>
                        ) : (
                            customers.map(customer => (
                                <div key={customer.name} style={{ marginBottom: '10px' }}>
                                    <span style={{ marginLeft: '10px' }}>{customer.name}</span>
                                    <Button variant="text"  onClick={() => handleCustomerClick(customer.name)} className='smaller'>Edit</Button>
                                    
                                </div>
                            ))
                        )}
                        {selectedCustomer && (
                            <div>
                                <h3>Customer Details</h3>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    value={selectedCustomer.name}
                                    onChange={(e) => setSelectedCustomer({ ...selectedCustomer, name: e.target.value })}
                                    disabled
                                />
                                <TextField
                                    fullWidth
                                    label="Address"
                                    value={selectedCustomer.address}
                                    onChange={(e) => setSelectedCustomer({ ...selectedCustomer, address: e.target.value })}
                                />
                                <TextField
                                    fullWidth
                                    label="Number of PCBs Required"
                                    type="number"
                                    value={selectedCustomer.numberOfPCBsRequired}
                                    onChange={(e) => setSelectedCustomer({ ...selectedCustomer, numberOfPCBsRequired: parseInt(e.target.value) })}
                                />
                                <Button variant="contained" onClick={handleUpdateCustomer}>Update Customer</Button>
                            </div>
                        )}
                        <h3>Add New Customer</h3>
                        <TextField
                            fullWidth
                            label="Name"
                            value={newCustomer.name}
                            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Address"
                            value={newCustomer.address}
                            onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Number of PCBs Required"
                            type="number"
                            value={newCustomer.numberOfPCBsRequired}
                            onChange={(e) => setNewCustomer({ ...newCustomer, numberOfPCBsRequired: parseInt(e.target.value) })}
                        />
                        <Button variant="contained" onClick={handleAddCustomer} disabled={!formValid}>Add Customer</Button>
                    </div>
                )}
            </Box>
        </div>
    );
};

export default LogisticsPage;
