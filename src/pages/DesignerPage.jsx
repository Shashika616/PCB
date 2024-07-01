import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Box, CssBaseline, Select, MenuItem, FormControl, InputLabel, Button, Typography, TextField, Stack } from '@mui/material';
import Navbar from '../components/navbars/NavDesigner';
import { useAuthContext, getAccessToken } from '@asgardeo/auth-react';
import '../styles/DesignerPageStyle.css';
import { config } from 'process';



const DesignerPage = () => {

    const { state, signIn, signOut } = useAuthContext();
    const [pcbs, setPcbs] = useState([]);
    const [design, setDesign] = useState('');
    const [selectedPcbId, setSelectedPcbId] = useState('');
    const [newPcbModel, setNewPcbModel] = useState('');

    // Get access token from asgardeo SDK and add it to the request headers
    const setupAxiosInterceptor = async () => {
        const token = await getAccessToken();
        axios.interceptors.request.use(
            config => {
                config.headers.Authorization = `Bearer ${token}`;
                return config;
            },
            error => {
                return promise.reject(error);
            }
        );
    };

    useEffect(() => {
        setupAxiosInterceptor();
        getAllPCBs();
    }, []);

    const getAllPCBs = async () => {
        try {
            const response = await axios.get("https://2bf3cacc-4d25-40ba-8fba-b400401187f5-dev.e1-us-east-azure.choreoapis.dev/pcb-management/pcbservice/v1.0/api/designers/pcbs");
            setPcbs(response.data);
        } catch (error) {
            console.error('Error fetching PCBs:', error);
        }
    };

    const updateDesign = async () => {
        try {
            await axios.put(`https://2bf3cacc-4d25-40ba-8fba-b400401187f5-dev.e1-us-east-azure.choreoapis.dev/pcb-management/pcbservice/v1.0/api/designers/pcbs/${selectedPcbId}/design`, {design} );
            alert('Design updated successfully!');
        } catch (error) {
            console.error('Error updating design:', error);
        }
    };

    const getDesign = async () => {
        try {
            const response = await axios.get(`https://2bf3cacc-4d25-40ba-8fba-b400401187f5-dev.e1-us-east-azure.choreoapis.dev/pcb-management/pcbservice/v1.0/api/designers/pcbs/${selectedPcbId}/design`);
            setDesign(response.data);
        } catch (error) {
            console.error('Error fetching design:', error);
        }
    };

    const handleListItemClick = (id) => {
        setSelectedPcbId(id);
    };

    const createNewPcb = async () => {
        try {
            const response = await axios.post("https://2bf3cacc-4d25-40ba-8fba-b400401187f5-dev.e1-us-east-azure.choreoapis.dev/pcb-management/pcbservice/v1.0/api/designers/pcbs", { modelName: newPcbModel });
            alert('PCB created successfully!');
            setNewPcbModel(''); // Clear the input field
            getAllPCBs(); // Refresh the PCB list
        } catch (error) {
            console.error('Error creating PCB:', error);
        }
    };

    const handleLogout = async () => {
        try{
            await signOut();
        }catch (error){
            console.error("Error signing in",error);
       }
        alert('Logged out');
    };

    

    return (
                <div className="container">
                <Navbar onLogout={handleLogout} />
                <Box sx={{ mt: 8, p: 2 }}> {/* Adjust the top margin and padding */}
                    <Typography variant="h3" gutterBottom>
                    Design your PCB Here...
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel>Select PCB</InputLabel>
                        <Select
                            value={selectedPcbId}
                            onChange={(e) => handleListItemClick(e.target.value)}
                        >
                            {pcbs.map(pcb => (
                                <MenuItem key={pcb.id} value={pcb.id}>
                                    {pcb.modelName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div>
                        <h2>Update Design</h2>
                        <TextField
                            multiline
                            fullWidth
                            rows={5}
                            variant="outlined"
                            value={design}
                            onChange={(e) => setDesign(e.target.value)}
                        />
                        <Stack spacing={2} direction={'row'}>
                            <Button variant="contained" onClick={updateDesign}>Update Design</Button>
                            <Button variant="contained" onClick={getDesign}>Get Design</Button>
                        </Stack>
                    </div>
                    <div>
                        <h2>Create New PCB</h2>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="New PCB Model Name"
                            value={newPcbModel}
                            onChange={(e) => setNewPcbModel(e.target.value)}
                        />
                        <Button variant="contained" onClick={createNewPcb}>Create PCB</Button>
                    </div>
                </Box>
            </div>
        
    );
};

export default DesignerPage;
