import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/EngineerPageStyle.css';
import {
    Stack,
    Box,
    CssBaseline,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Typography,
    TextField
} from '@mui/material';
import Navbar from '../components/navbars/NavEngineer';
import { useAuthContext } from '@asgardeo/auth-react';


const EngineerPage = () => {
    const { signOut, getAccessToken } = useAuthContext();
    const [pcbs, setPcbs] = useState([]);
    const [design, setDesign] = useState('');
    const [selectedPcbId, setSelectedPcbId] = useState('');
    const [engineeringParameters, setEngineeringParameters] = useState({
        materialType: '',
        numberOfLayers: '',
        laminateThickness: '',
        coating: '',
        solderMaskColor: ''
    });
    const axiosInterceptorSet = useRef(false);
    const token = useRef("");

    // Get access token from asgardeo SDK and add it to the request headers
    const setupAxiosInterceptor = async () => {
        const _token = await getAccessToken();
        token.current = _token;
        console.log("Access token", token.current);
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    };

    useEffect(() => {
        if (!axiosInterceptorSet.current) {
            setupAxiosInterceptor().then(() => {
                axiosInterceptorSet.current = true;
                getAllPCBs();
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, []);

    const getAllPCBs = async () => {
        try {
            const response = await axios.get("https://2bf3cacc-4d25-40ba-8fba-b400401187f5-prod.e1-us-east-azure.choreoapis.dev/pcb-management/pcb-service-3/v1.0/api/engineers/pcbs",{
                headers : {
                    'Authorization' : `Bearer ${token.current}`,
                    'Content-Type': 'application/json'
                }
            });
            setPcbs(response.data);
        } catch (error) {
            console.error('Error fetching PCBs:', error);
        }
    };

    const getDesign = async () => {
        try {
            const response = await axios.get(`https://2bf3cacc-4d25-40ba-8fba-b400401187f5-prod.e1-us-east-azure.choreoapis.dev/pcb-management/pcb-service-3/v1.0/api/engineers/pcbs/${selectedPcbId}/design`,{
                headers : {
                    'Authorization' : `Bearer ${token.current}`,
                    'Content-Type': 'application/json'
                }
            });
            setDesign(response.data);
        } catch (error) {
            console.error('Error fetching design:', error);
        }
    };

    const getEngineeringParameters = async () => {
        try {
        const response = await axios.get(`https://2bf3cacc-4d25-40ba-8fba-b400401187f5-prod.e1-us-east-azure.choreoapis.dev/pcb-management/pcb-service-3/v1.0/api/engineers/pcbs/${selectedPcbId}/engineering-parameters`,{
            headers : {
                'Authorization' : `Bearer ${token.current}`,
                'Content-Type': 'application/json'
            }
        });
            const mappedData = mapUndefinedToText(response.data);
            setEngineeringParameters(mappedData);
        } catch (error) {
            console.error('Error fetching engineering parameters:', error);
        }
    };

    const updateEngineeringParameters = async () => {
        try {
            await axios.put(`https://2bf3cacc-4d25-40ba-8fba-b400401187f5-prod.e1-us-east-azure.choreoapis.dev/pcb-management/pcb-service-3/v1.0/api/engineers/pcbs/${selectedPcbId}/engineering-parameters`, engineeringParameters, {
                headers : {
                    'Authorization' : `Bearer ${token.current}`,
                    'Content-Type': 'application/json'
                }
            });
            alert('Engineering parameters updated successfully!');
            clearFields();
        } catch (error) {
            console.error('Error updating engineering parameters:', error);
        }
    };

    const clearFields = () => {
        setEngineeringParameters({
            materialType: '',
            numberOfLayers: '',
            laminateThickness: '',
            coating: '',
            solderMaskColor: ''
        });
    };

    const mapUndefinedToText = (data) => {
        return {
            materialType: data.materialType || '',
            numberOfLayers: data.numberOfLayers || '',
            laminateThickness: data.laminateThickness || '',
            coating: data.coating || '',
            solderMaskColor: data.solderMaskColor || ''
        };
    };

    const handleListItemClick = (id) => {
        setSelectedPcbId(id);
    };

    const handleLogout = async () => {
        try {
            await signOut();
            alert('Logged out');
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    const handleMaterialTypeChange = (e) => {
        setEngineeringParameters({ ...engineeringParameters, materialType: e.target.value });
    };

    const handleNumberOfLayersChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            setEngineeringParameters({ ...engineeringParameters, numberOfLayers: value });
        } else {
            // Handle case where value is NaN (could be an empty string or non-numeric input)
            setEngineeringParameters({ ...engineeringParameters, numberOfLayers: '' }); // Set to empty string or appropriate fallback
        }
    };
    
    const handleLaminateThicknessChange = (e) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setEngineeringParameters({ ...engineeringParameters, laminateThickness: value });
        } else {
            // Handle case where value is NaN (could be an empty string or non-numeric input)
            setEngineeringParameters({ ...engineeringParameters, laminateThickness: '' }); // Set to empty string or appropriate fallback
        }
    };
    

    const handleCoatingChange = (e) => {
        setEngineeringParameters({ ...engineeringParameters, coating: e.target.value });
    };

    const handleSolderMaskColorChange = (e) => {
        setEngineeringParameters({ ...engineeringParameters, solderMaskColor: e.target.value });
    };

    return (
        <div className="container">
            <Navbar onLogout={handleLogout} />
            <Box sx={{ mt: 8, p: 2 }}>
                <Typography variant="h3" gutterBottom>
                    Engineer Page
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
                    <h2>View Design</h2>
                    <Typography variant="body1">
                        {design}
                    </Typography>
                    <Button variant="contained" onClick={getDesign}>View Design</Button>
                </div>
                <div>
                    <h2>Engineering Parameters</h2>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Material Type"
                        value={engineeringParameters.materialType}
                        onChange={handleMaterialTypeChange}
                        disabled={!selectedPcbId}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Number of Layers"
                        type="number"
                        value={engineeringParameters.numberOfLayers}
                        onChange={handleNumberOfLayersChange}
                        disabled={!selectedPcbId}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Laminate Thickness"
                        type="number"
                        value={engineeringParameters.laminateThickness}
                        onChange={handleLaminateThicknessChange}
                        disabled={!selectedPcbId}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Coating"
                        value={engineeringParameters.coating}
                        onChange={handleCoatingChange}
                        disabled={!selectedPcbId}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Solder Mask Color"
                        value={engineeringParameters.solderMaskColor}
                        onChange={handleSolderMaskColorChange}
                        disabled={!selectedPcbId}
                    />
                    <Stack spacing={2} direction={'row'}>
                        <Button variant="contained" onClick={getEngineeringParameters} disabled={!selectedPcbId}>
                            Get Engineering Parameters
                        </Button>
                        <Button variant="contained" onClick={updateEngineeringParameters} disabled={!selectedPcbId}>
                            Update Engineering Parameters
                        </Button>
                    </Stack>
                    
                </div>
            </Box>
        </div>
    );
};

export default EngineerPage;
