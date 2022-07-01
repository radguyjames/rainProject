import React, { useState, useMemo, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import moment from "moment";
import Modal from './Modal';

import {
    TextField,
    Grid,
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
    Select,
    MenuItem,
    Paper,
    Button,
    Typography,
    InputLabel,
    makeStyles,
    FormHelperText
} from '@material-ui/core'
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

const useStyles = makeStyles((theme) => ({
    removeNumberSpinner: {
        '& input[type=number]': {
            '-moz-appearance': 'textfield'
        },
        '& input[type=number]::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0
        },
        '& input[type=number]::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0
        }
    },
}));

/**
 * InputField DataBase Information
 * @type {{mobilityRequirement: null, clinician: null, subBodyPart: string, address: null, gender: null, examinationRequested: null, patientFirstName: null, timing: null, phin: null, weight: null, priority: null, patientLastName: null, bodyPart: string, additionalComments: null, sedationRequirement: null, urgency: null, dob: null, clinicalHistory: null, height: null}}
 */
const fieldValues = {
    patientLastName: null,
    patientFirstName: null,
    phin: null,
    address: null,
    gender: null,
    clinician: null,
    dob: null,
    weight: null,
    height: null,
    urgency: null,
    priority: null,
    clinicalHistory: null,
    bodyPart: null,
    subBodyPart: null,
    timing: null,
    examinationRequested: null,
    additionalComments: null,
    mobilityRequirement: null,
    sedationRequirement: null,
}

/**
 * This function returns the requisition form.
 * @returns {JSX.Element}
 * @constructor
 */
export const Requisition = () => {
    const classes = useStyles();

    const [anatomicalText, setAnatomicalText] = useState('')                            // Update text value for popup's anatomical location field
    const [specialRequirementsBody, setSpecialRequirementsBody] = useState([])          // Update SpecialRequirementsbody state for popup
    const [sedationText, setSedationText] = useState('')                                // Update sedationText state for popup
    const [mobilityText, setMobilityText] = useState('')                                // Update sedationRequirement state for popup
    const [mobilityRequirements, setMobilityRequirements] = useState();                 // Options for dropdown
    const [sedationRequirements, setSedationRequirements] = useState();                 // Options for dropdown
    const [isolationPrecautions, setIsolationPrecautions] = useState();                 // Options for dropdown
    const [types, setTypes] = useState();                                               // Options for dropdown
    const [isolationPrecautionText, setIsolationPrecautionText] = useState('');         // Text value of selected Isolation Precaution
    const [isOpen, setIsOpen] = useState(false)                                         // Update modal window state
    const [subLocationOptions, setSubLocationOptions] = useState([]);                   // Options for dropdown

    const [errorFName, setErrorFName] = useState("");                                   // Error messages. Also control error states
    const [errorLName, setErrorLName] = useState("");
    const [errorPHIN, setErrorPHIN] = useState("");
    const [errorWard, setErrorWard] = useState("");
    const [errorWeight, setErrorWeight] = useState("");
    const [errorHeight, setErrorHeight] = useState("");
    const [errorPhysician, setErrorPhysician] = useState("");
    const [errorDOB, setErrorDOB] = useState("");
    const [errorGender, setErrorGender] = useState("");
    const [errorLocation, setErrorLocation] = useState("");
    const [errorSubLocation, setErrorSubLocation] = useState("");
    const [errorHistory, setErrorHistory] = useState("");
    const [errorComments, setErrorComments] = useState("");

    // Update TextField and popup state.
    const [values, setValues] = useState({
        patientFirstName: '',
        patientLastName: '',
        phin: '',
        weight: null,
        weightUnits: 'kg',
        height: null,
        heightUnits: 'cm',
        clinician: '',
        dob: moment().format('YYYY-MM-DD'),
        gender: null,
        clinicalInformation: '',
        anatomicalLocation: null,
        subLocation: null,
        urgency: '4',
        priority: 40,
        ward: null,
        additionalComments: '',
        isolationPrecaution: null,
        mobilityRequirement: null,
        sedationRequirement: null
    });

    /**
     * Redirects the form to protocol management after submission.
     * @type {History<LocationState>}
     */
    const history = useHistory();
    const redirect = () => {
        history.push('/apps/protocolmanagement')
    }

    /**
     * Retrieves Sedation, Mobility, and Isolation Precaution dropdown text values.
     */
    const openPopup = (e) => {
        e.preventDefault();

        let matchedType = '';
        let anatomical_temp = '';
        let subList = '';
        let sub_temp = '';

        setAnatomicalText('');
        setMobilityText('');
        setIsolationPrecautionText('');
        setSedationText('');
        setSpecialRequirementsBody([]);

        if (values.anatomicalLocation) {
            matchedType = types.find(({ id }) => id === values.anatomicalLocation);
            anatomical_temp = matchedType.type;

            if (values.subLocation) {
                subList = matchedType.subtypes;
                sub_temp = subList[subList.findIndex(obj => obj.id === values.subLocation)].subtype;
                setAnatomicalText(anatomical_temp + ' - ' + sub_temp);
            } else setAnatomicalText(anatomical_temp);
        }

        if (values.mobilityRequirement) {
            setMobilityText(
                mobilityRequirements.find(
                    ({ id }) => id === values.mobilityRequirement
                ).mobilityRequirement
            );
        }

        if (values.isolationPrecaution) {
            setIsolationPrecautionText(
                isolationPrecautions.find(
                    ({ id }) => id === values.isolationPrecaution
                ).isolationPrecaution
            );
        }

        if (values.sedationRequirement) {
            setSpecialRequirementsBody(
                sedationRequirements.find(
                    ({ id }) => id === values.sedationRequirement
                ).message.split('. ')
            );

            setSedationText(
                sedationRequirements.find(
                    ({ id }) => id === values.sedationRequirement
                ).sedationRequirement
            );
        }

        // Validation
        // ----------------------------------------------------------------
        let errors = 0;

        // First name
        if (values.patientFirstName.length === 0) {
            setErrorFName("Required");
            errors++;
        } else if (values.patientFirstName.length > 50) {
            setErrorFName("Maximun 50 characters");
            errors++;
        } else {
            setErrorFName("");
        }

        // Last name
        if (values.patientLastName.length === 0) {
            setErrorLName("Required");
            errors++;
        } else if (values.patientLastName.length > 50) {
            setErrorLName("Maximun 50 characters");
            errors++;
        } else {
            setErrorLName("");
        }

        // PHIN
        if (isNaN(values.phin) || values.phin.length > 9 || values.phin.length < 9) {
            setErrorPHIN("Invalid PHIN");
            errors++;
        } else if (values.phin.length === 0) {
            setErrorPHIN("Required");
            errors++;
        } else {
            setErrorPHIN("");
        }

        // Ward
        if (!values.ward) {
            setErrorWard("Required");
            errors++;
        } else {
            setErrorWard("");
        }

        // Weight
        if (!values.weight) {
            setErrorWeight("Required");
            errors++;
        } else if (isNaN(+values.weight) || values.weight <= 0) {
            setErrorWeight("Invalid weight");
            errors++;
        } else {
            setErrorWeight("");
        }

        // Height
        if (!values.height) {
            setErrorHeight("Required");
            errors++;
        } else if (isNaN(+values.height) || values.height <= 0) {
            setErrorHeight("Invalid height");
            errors++;
        } else {
            setErrorHeight("");
        }

        // Physician
        if (values.clinician.length === 0) {
            setErrorPhysician("Required");
            errors++;
        } else if (values.clinician.length > 50) {
            setErrorPhysician("Maximun 50 characters");
            errors++;
        } else {
            setErrorPhysician("");
        }

        // DOB
        if (values.dob > moment().format("YYYY-MM-DD")) {
            setErrorDOB("Invalid date");
            errors++;
        } else {
            setErrorDOB("");
        }

        // Gender
        if (!values.gender) {
            setErrorGender("Required");
            errors++;
        } else {
            setErrorGender("");
        }

        // Clinical history
        if (values.clinicalInformation.length > 1500) {
            setErrorHistory("Maximun 1500 characters");
            errors++;
        } else {
            setErrorHistory("");
        }

        // Comments
        if (values.additionalComments.length > 1500) {
            setErrorComments("Maximun 1500 characters");
            errors++;
        } else {
            setErrorComments("");
        }

        // Anatomical location
        if (!values.anatomicalLocation) {
            setErrorLocation("Required");
            errors++;
        } else {
            setErrorLocation("");
        }

        // Sub location
        if (!values.subLocation) {
            setErrorSubLocation("Required");
            errors++;
        } else {
            setErrorSubLocation("");
        }

        if (errors === 0) {
            setIsOpen(true);
        }
    }

    /**
     * Handles Input values for TextFields and Radiobuttons.
     * @param e
     */
    const handleInputChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    /**
     * Handles date of birth values in DatePicker field.
     * @param e
     */
    const handleDobChange = (date) => {
        setValues({ ...values, dob: moment(date).format('YYYY-MM-DD') });
    }

    /**
     * Handles anatomical location state onChange event.
     * Updates sublocation to empty string.
     * @param value
     */
    const changeAnatomicalLocation = ({ target: { value } }) => {
        for (let i of types) {
            if (i.id === value) {
                setSubLocationOptions(i.subtypes);
            }
        }

        setValues({
            ...values,
            anatomicalLocation: value,
            subLocation: null
        });
    };

    /**
     * Handles the data submitted to the form to our django backend.
     * @param e
     */
    const handleOnSubmit = e => {
        e.preventDefault();

        // Convert input data to the One True Measurement System (metric)
        let normalValues = values;

        normalValues.weight = values.weightUnits === "lbs" ?
            (values.weight * 0.45359237).toFixed(2) : (values.weight * 1).toFixed(2);

        normalValues.height = values.heightUnits === "in" ?
            (values.height * 2.54).toFixed(2) : (values.height * 1).toFixed(2);

        axios.post('api/auth/requisition', normalValues)
            .then(res => {
                redirect()
            }).catch((error) => {
                console.log(error)
            });
    }

    /**
     * Gets the mobility options data for the mobility requirements.
     */
    const getMobilityRequirements = () => {
        axios.get('http://localhost:8000/api/auth/mobilityrequirements')
            .then(response => {
                setMobilityRequirements(response.data['objMobilityRequirements'])
            }).catch(err => {
                console.log(err)
            });
    }

    /**
     * Gets the sedation options data for the sedation requirements.
     */
    const getSedationRequirements = () => {
        axios.get('http://localhost:8000/api/auth/sedationrequirements')
            .then(response => {
                setSedationRequirements(response.data['objSedationRequirements'])
            }).catch(err => {
                console.log(err)
            });
    }

    /**
     * Gets the isolation precaution options data for the isolation precaution requirements.
     */
    const getIsolationPrecautions = () => {
        axios.get('http://localhost:8000/api/auth/isolationprecautions')
            .then(response => {
                setIsolationPrecautions(response.data['objIsolationPrecaution'])
            }).catch(err => {
                console.log(err)
            });
    }

    /**
     * Gets the type options data
     */
    const getTypes = () => {
        axios.get('http://localhost:8000/api/auth/types')
            .then(response => {
                setTypes(response.data['objType'])
            }).catch(err => {
                console.log(err)
            });
    }

    /**
     * Fetches the requirements' data for the dropdown.
     * Converts it to an array for mapping.
     */
    useEffect(() => {
        getMobilityRequirements();
        getSedationRequirements();
        getIsolationPrecautions();
        getTypes();
    }, []);

    return (

        <div>
            <div style={{ padding: 24, margin: 'auto', maxWidth: 800 }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        backgroundColor: '#64B5F6',
                        height: '100px',
                        borderTopLeftRadius: '4px',
                        borderTopRightRadius: '4px'
                    }}>
                    <h1
                        style={{ margin: 'auto' }}
                    >
                        MRI Request Form
                    </h1>
                </div>

                <form onSubmit={handleOnSubmit} autocomplete="off" encType="multi" style={{ marginBottom: 48 }}>
                    <Paper style={{ padding: 16 }}>
                        <Grid container xs={12} alignItems="flex-start" spacing={2} style={{ margin: "0" }}>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    error={errorFName !== ""}
                                    helperText={errorFName}
                                    required
                                    id="patientFirstName"
                                    name="patientFirstName"
                                    label="Patient First Name"
                                    fullWidth
                                    value={values.patientFirstName}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    error={errorLName !== ""}
                                    helperText={errorLName}
                                    required
                                    id="patientLastName"
                                    name="patientLastName"
                                    label="Patient Last Name"
                                    fullWidth
                                    value={values.patientLastName}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={errorPHIN !== ""}
                                    helperText={errorPHIN}
                                    required
                                    inputProps={{ min: 0 }}
                                    name="phin"
                                    label="PHIN"
                                    type="number"
                                    fullWidth
                                    value={values.phin}
                                    onChange={handleInputChange}
                                    className={classes.removeNumberSpinner}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="precaution-location-label">Isolation Precautions</InputLabel>
                                <Select
                                    labelId="precaution-location-label"
                                    id="isolationPrecaution"
                                    name="isolationPrecaution"
                                    fullWidth
                                    onChange={handleInputChange}
                                    value={values.isolationPrecaution}
                                >
                                    <MenuItem key="0" value=""><em>None</em></MenuItem>

                                    {!isolationPrecautions ? null :
                                        isolationPrecautions.map(({ id, isolationPrecaution }) => (
                                            <MenuItem key={id} value={id}>{isolationPrecaution}</MenuItem>
                                        ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    error={errorWard !== ""}
                                >
                                    <InputLabel id="ward-location-label">Ward</InputLabel>
                                    <Select
                                        required
                                        labelId="ward-location-label"
                                        id="ward"
                                        name="ward"
                                        fullWidth
                                        onChange={handleInputChange}
                                        value={values.ward}
                                    >
                                        <MenuItem value={"A3 - 73731"}>A3 - 73731</MenuItem>
                                        <MenuItem value={"A3 Step - 73066"}>A3 Step - 73066</MenuItem>
                                        <MenuItem value={"A4 - 73741"}>A4 - 73741</MenuItem>
                                        <MenuItem value={"A5 - 73751"}>A5 - 73751</MenuItem>
                                        <MenuItem value={"A5 Step - 74232"}>A5 Step - 74232</MenuItem>
                                        <MenuItem value={"A6 - 73584"}>A6 - 73584</MenuItem>
                                        <MenuItem value={"A7 (IICU) - 73702"}>A7 (IICU) - 73702</MenuItem>
                                        <MenuItem value={"A7 Step - 73066"}>A7 Step - 73066</MenuItem>
                                        <MenuItem value={"B2 - 73933"}>B2 - 73933</MenuItem>
                                        <MenuItem value={"B3 - 73733"}>B3 - 73733</MenuItem>
                                        <MenuItem value={"B4 - 73743"}>B4 - 73743</MenuItem>
                                        <MenuItem value={"B5 - 73960"}>B5 - 73960</MenuItem>
                                        <MenuItem value={"B6 - 73763"}>B6 - 73763</MenuItem>
                                        <MenuItem value={"D2 - 73727"}>D2 - 73727</MenuItem>
                                        <MenuItem value={"D3 - 73737"}>D3 - 73737</MenuItem>
                                        <MenuItem value={"D3 Step - 71338"}>D3 Step -71338</MenuItem>
                                        <MenuItem value={"D4 - 73747"}>D4 - 73747</MenuItem>
                                        <MenuItem value={"D5 -73757"}>D5 -73757</MenuItem>
                                        <MenuItem value={"D6 - 73767"}>D6 - 73767</MenuItem>
                                        <MenuItem value={"H3 - 73771"}>H3 - 73771</MenuItem>
                                        <MenuItem value={"H4 - 73773"}>H4 - 73773</MenuItem>
                                        <MenuItem value={"H5 - 73775"}>H5 - 73775</MenuItem>
                                        <MenuItem value={"H6 - 73778"}>H6 - 73778</MenuItem>
                                        <MenuItem value={"H7 - 77351"}>H7 - 77351</MenuItem>
                                        <MenuItem value={"ER - 73160"}>ER - 73160</MenuItem>
                                        <MenuItem value={"Triage - 71182"}>Triage - 71182</MenuItem>
                                        <MenuItem value={"Admitting - 73203"}>Admitting - 73203</MenuItem>
                                        <MenuItem value={"Resus Room - 38836"}>Resus Room - 38836</MenuItem>
                                        <MenuItem value={"OBS - 73830"}>OBS - 73830</MenuItem>
                                        <MenuItem value={"MTA - 73323"}>MTA - 73323</MenuItem>
                                        <MenuItem value={"MLA - 73323"}>MLA - 73323</MenuItem>
                                        <MenuItem value={"Reaz - 73315"}>Reaz - 73315</MenuItem>
                                        <MenuItem value={"LAA - 75860"}>LAA - 75860</MenuItem>
                                        <MenuItem value={"Burn Unit -77575"}>Burn Unit -77575</MenuItem>
                                        <MenuItem value={"SICU - 73396"}>SICU - 73396</MenuItem>
                                        <MenuItem value={"MICU - 73711"}>MICU - 73711</MenuItem>
                                        <MenuItem value={"CCU - 77815"}>CCU - 77815</MenuItem>
                                        <MenuItem value={"PACU 73299"}>PACU 73299</MenuItem>
                                        <MenuItem value={"RS2 - 73889"}>RS2 - 73889</MenuItem>
                                        <MenuItem value={"RS3 - 723442"}>RS3 - 723442</MenuItem>
                                        <MenuItem value={"RR4 - 72319"}>RR4 - 72319</MenuItem>
                                        <MenuItem value={"RR5 - 72347"}>RR5 - 72347</MenuItem>
                                        <MenuItem value={"RR6 - 72349"}>RR6 - 72349</MenuItem>
                                        <MenuItem value={"MS3 - 73141"}>MS3 - 73141</MenuItem>
                                        <MenuItem value={"PY1S - 73275"}>PY1S - 73275</MenuItem>
                                        <MenuItem value={"PY1N - 77670"}>PY1N - 77670</MenuItem>
                                        <MenuItem value={"PY2S - 73282"}>PY2S - 73282</MenuItem>
                                        <MenuItem value={"PY2N - 73282"}>PY2N - 73282</MenuItem>
                                        <MenuItem value={"PX2 - 73869"}>PX2 - 73869</MenuItem>
                                        <MenuItem value={"PX3 - 73520"}>PX3 - 73520</MenuItem>
                                        <MenuItem value={"PY3S - 77410"}>PY3S - 77410</MenuItem>
                                        <MenuItem value={"PY3N - 73721"}>PY3N -73721</MenuItem>
                                        <MenuItem value={"ROU - 75697"}>ROU - 75697</MenuItem>
                                        <MenuItem value={"Womens Triage - 74201"}>Womens Triage - 74201</MenuItem>
                                        <MenuItem value={"WR1 - 71391"}>WR1 - 71391</MenuItem>
                                        <MenuItem value={"WR2 - 73833"}>WR2 - 73833</MenuItem>
                                        <MenuItem value={"WR3 - 78580"}>WR3 - 78580</MenuItem>
                                        <MenuItem value={"WR5 - 73395"}>WR5 - 73395</MenuItem>
                                        <MenuItem value={"WN2 - 72115"}>WN2 - 72115</MenuItem>
                                        <MenuItem value={"WN3 - 71493"}>WN3 - 71493</MenuItem>
                                        <MenuItem value={"WN5 - 73395"}>WN5 - 73395</MenuItem>
                                        <MenuItem value={"NICU - 75907"}>NICU - 75907</MenuItem>
                                        <MenuItem value={"Labour Floor - 73394"}>Labour Floor - 73394</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="mobilityRequirementLabel">Mobility Requirements</InputLabel>
                                <Select
                                    labelId="mobilityRequirementLabel"
                                    id="mobilityRequirement"
                                    name="mobilityRequirement"
                                    fullWidth
                                    onChange={handleInputChange}
                                    value={values.mobilityRequirement}
                                >
                                    <MenuItem key="0" value=""><em>None</em></MenuItem>

                                    {!mobilityRequirements ? null :
                                        mobilityRequirements.map(({ id, mobilityRequirement }) => (
                                            <MenuItem key={id} value={id} >{mobilityRequirement}</MenuItem>
                                        ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="sedationRequirementLabel">Sedation Requirements</InputLabel>
                                <Select
                                    labelId="sedationRequirementLabel"
                                    id="sedationRequirement"
                                    name="sedationRequirement"
                                    fullWidth
                                    onChange={handleInputChange}
                                    value={values.sedationRequirement}
                                >
                                    <MenuItem key="0" value=""><em>None</em></MenuItem>

                                    {!sedationRequirements ? null :
                                        sedationRequirements.map(({ id, sedationRequirement }) => (
                                            <MenuItem key={id} value={id} >{sedationRequirement}</MenuItem>
                                        ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Grid container xs={12} style={{ display: "flex" }} alignItems="flex-end">
                                    <Grid item xs={12} sm={8}>
                                        <TextField
                                            error={errorWeight !== ""}
                                            helperText={errorWeight}
                                            required
                                            id="weight"
                                            name="weight"
                                            label="Weight"
                                            type="number"
                                            value={values.weight}
                                            onChange={handleInputChange}
                                            InputProps={{ inputProps: { min: 0 } }}
                                            style={{ marginRight: "5px" }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Select
                                            fullWidth
                                            labelId="weightLabel"
                                            id="weightUnits"
                                            name="weightUnits"
                                            onChange={handleInputChange}
                                            value={values.weightUnits}
                                        >
                                            <MenuItem key="0" value="kg">kg</MenuItem>
                                            <MenuItem key="1" value="lbs">lbs</MenuItem>
                                        </Select>
                                        {errorWeight !== "" &&                              // This fixes the unit select jumping around
                                            <FormHelperText> </FormHelperText>
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Grid container xs={12} style={{ display: "flex" }} alignItems="flex-end">
                                    <Grid item xs={12} sm={8}>
                                        <TextField
                                            error={errorHeight !== ""}
                                            helperText={errorHeight}
                                            required
                                            id="height"
                                            name="height"
                                            label="Height"
                                            type="number"
                                            value={values.height}
                                            onChange={handleInputChange}
                                            InputProps={{ inputProps: { min: 0 } }}
                                            style={{ marginRight: "5px" }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Select
                                            fullWidth
                                            labelId="heightLabel"
                                            id="heightUnits"
                                            name="heightUnits"
                                            onChange={handleInputChange}
                                            value={values.heightUnits}
                                        >
                                            <MenuItem key="0" value="cm">cm</MenuItem>
                                            <MenuItem key="1" value="in">in</MenuItem>
                                        </Select>
                                        {errorHeight !== "" &&                                  // This fixes the unit select jumping around
                                            <FormHelperText> </FormHelperText>
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={errorPhysician !== ""}
                                    helperText={errorPhysician}
                                    required
                                    id="clinician"
                                    name="clinician"
                                    label="Physician"
                                    fullWidth
                                    value={values.clinician}
                                    onChange={handleInputChange}
                                >
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <MuiPickersUtilsProvider utils={MomentUtils} locale="en">
                                    <KeyboardDatePicker
                                        error={errorDOB !== ""}
                                        helperText={errorDOB}
                                        fullWidth
                                        placeholder="2022-03-24"
                                        label="Date of Birth"
                                        format="YYYY-MM-DD"
                                        value={values.dob}
                                        onChange={date => handleDobChange(date)}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    error={errorGender !== ""}
                                >
                                    <FormLabel labelPlacement="start">Gender</FormLabel>
                                    <RadioGroup
                                        row
                                        id="gender"
                                        name="gender"
                                        value={values.gender}
                                        onChange={handleInputChange}
                                    >
                                        <FormControlLabel value="male" control={<Radio required={true} />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio required={true} />} label="Female" />
                                        <FormControlLabel value="other" control={<Radio required={true} />} label="Other" />
                                        <FormControlLabel value="x" control={<Radio required={true} />} label="X" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={errorHistory !== ""}
                                    helperText={errorHistory}
                                    id="clinicalInformation"
                                    name="clinicalInformation"
                                    label="Relevant Clinical History"
                                    fullWidth
                                    multiline={true}
                                    value={values.clinicalInformation}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <InputLabel id="anatomical-location-label">Anatomical Location</InputLabel>
                                <Select
                                    error={errorLocation !== ""}
                                    required
                                    labelId="anatomical-location-label"
                                    id="anatomicalLocation"
                                    name="anatomicalLocation"
                                    fullWidth
                                    onChange={changeAnatomicalLocation}
                                    value={values.anatomicalLocation}
                                >
                                    {!types ? null :
                                        types.map(({ id, type }) => (
                                            <MenuItem key={id} value={id}>
                                                {type}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <InputLabel id="sub-location-label">Sub-Location</InputLabel>
                                <Select
                                    error={errorSubLocation !== ""}
                                    required
                                    labelId="sub-location-label"
                                    id="subLocation"
                                    name="subLocation"
                                    fullWidth
                                    onChange={handleInputChange}
                                    value={values.subLocation}
                                >
                                    {!subLocationOptions ? null :
                                        subLocationOptions.map(({ id, subtype }) => (
                                            <MenuItem key={id} value={id}>
                                                {subtype}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={errorComments !== ""}
                                    helperText={errorComments}
                                    id="additionalComments"
                                    name="additionalComments"
                                    label="Additional Comments"
                                    fullWidth
                                    multiline={true}
                                    value={values.additionalComments}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormLabel labelPlacement="start">Urgency</FormLabel>
                                <RadioGroup
                                    row
                                    id="urgency"
                                    name="urgency"
                                    value={values.urgency}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: 0 }}
                                >
                                    <FormControlLabel value="1" control={<Radio required={true} />} label="1" />
                                    <FormControlLabel value="2" control={<Radio required={true} />} label="2" />
                                    <FormControlLabel value="3" control={<Radio required={true} />} label="3" />
                                    <FormControlLabel value="4" control={<Radio required={true} />} label="4" />
                                </RadioGroup>
                                <p style={{ margin: 0 }}><small><b>1</b> (2-3 hours) <b>2</b> (24 hours) <b>3</b> (24-72 hours) <b>4</b> (2 Weeks)</small></p>
                            </Grid>
                            <Grid item xs={12} sm={12} style={{ marginTop: 24, textAlign: "center" }}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={openPopup}
                                    color="primary"
                                    style={{ margin: 0 }}
                                >
                                    Submit</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                    {/* Modal window for confirmation popup */}
                    <Modal
                        display="flexbox"
                        justifyContent="center"
                        alignItems="center"
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        values={values}
                        isolationPrecautionText={isolationPrecautionText}
                        mobilityText={mobilityText}
                        sedationText={sedationText}
                        anatomicalText={anatomicalText}
                        specialRequirementsBody={specialRequirementsBody}
                    />
                </form>
            </div>
        </div>
    );
}