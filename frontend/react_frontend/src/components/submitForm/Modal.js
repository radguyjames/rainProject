import React, { useState } from 'react'
import {
    Grid,
    Button,
    Checkbox,
    FormControlLabel,
    ButtonGroup,
    Paper
} from '@material-ui/core'

/**
 * Sets style of modal page.
 * @type {{"border-radius": string, padding: string, transform: string, backgroundColor: string, top: string, alignItems: string, left: string, flexDirection: string, display: string, position: string, justifyContent: string, zIndex: number}}
 */
const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    backgroundColor: '#FFF',
    'border-radius': '4px',
    // paddingTop: '8px',
    zIndex: 1000,
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: "center",
    // alignItems: "center"
}

/**
 * Sets style for overlaying the current page.
 * @type {{backgroundColor: string, top: number, left: number, bottom: number, position: string, right: number, zIndex: number}}
 */
const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0, .7)',
    zIndex: 1000
}

/**
 * Sets style of input value.
 * @type {{paddingLeft: number, fontWeight: string}}
 */
const BOLD = {
    fontWeight: 'bold',
}

const SPACED = {
    marginTop: "8px"
}

/**
 * Represents confirm page before submitting the form.
 * @param open The open value indicates whether the modal is opened.
 * @param onClose The onClose function.
 * @param values The input values from users.
 * @param isolationPrecautionText The isolation precaution requirement.
 * @param mobilityText The mobility requirement.
 * @param sedationText The sedation requirement.
 * @param anatomicalText The anatomical location.
 * @param specialRequirementsBody The sedation special requirements.
 * @returns {JSX.Element|null}
 * @constructor
 */
const Modal = ({ open,
    onClose,
    values,
    isolationPrecautionText,
    mobilityText,
    sedationText,
    anatomicalText,
    specialRequirementsBody
}) => {
    const [isDisabled, setIsDisabled] = useState(true)

    if (!open) return null

    /**
     * Handle Modal close event.
     */
    const handleModalClose = () => {
        setIsDisabled(true);
        onClose();
    }

    return (
        <>
            <div style={OVERLAY_STYLES} onClick={handleModalClose} /> {/* Grey background for the modal window*/}
            <Paper style={MODAL_STYLES}>
                <Grid container spacing={2} alignItems="flex-start" style={{ width: "900px", margin: "0" }}>
                    <Grid item xs={12} style={{
                        display: "flex",
                        justifyContent: "space-around",
                        backgroundColor: '#64B5F6',
                        height: '100px',
                        borderTopLeftRadius: '4px',
                        borderTopRightRadius: '4px',
                        padding: '0'
                    }}
                    >
                        <h1 style={{ margin: "auto" }}>Confirm Patient Information</h1>
                    </Grid>

                    <Grid item container style={{ padding: "24px" }}>
                        <Grid item xs={3} style={SPACED}>
                            <text style={BOLD}>Patient Name:</text>
                        </Grid>
                        <Grid item xs={3} style={SPACED}>
                            <text>{values.patientFirstName} {values.patientLastName}</text>
                        </Grid>

                        <Grid item xs={3} style={SPACED}>
                            <text style={BOLD}>PHIN:</text>
                        </Grid>
                        <Grid item xs={3} style={SPACED}>
                            <text>{values.phin}</text>
                        </Grid>

                        <Grid item xs={3} style={SPACED}>
                            <text style={BOLD}>Ward:</text>
                        </Grid>
                        <Grid item xs={3} style={SPACED}>
                            <text>{values.ward}</text>
                        </Grid>

                        <Grid item xs={3} style={SPACED}>
                            <text style={BOLD}>Isolation Precaution:</text>
                        </Grid>
                        <Grid item xs={3} style={SPACED}>
                            <text>{isolationPrecautionText}</text>
                        </Grid>

                        <Grid item xs={3} style={SPACED}>
                            <text style={BOLD}>Mobility Requirements:</text>
                        </Grid>
                        <Grid item xs={3} style={SPACED}>
                            <text>{mobilityText}</text>
                        </Grid>

                        <Grid item xs={3} style={SPACED}>
                            <text style={BOLD}>Sedation Requirements:</text>
                        </Grid>
                        <Grid item xs={3} style={SPACED}>
                            <text>{sedationText}</text>
                        </Grid>

                        <Grid item xs={3} style={SPACED}>
                            <text style={BOLD}>Weight:</text>
                        </Grid>
                        <Grid item xs={3} style={SPACED}>
                            <text>{values.weight} {values.weightUnits}</text>
                        </Grid>

                        <Grid item xs={3} style={SPACED}>
                            <text style={BOLD}>Height:</text>
                        </Grid>
                        <Grid item xs={3} style={SPACED}>
                            <text>{values.height} {values.heightUnits}</text>
                        </Grid>

                        <Grid item xs={3} style={SPACED}>
                            <text style={BOLD}>Physician Name:</text>
                        </Grid>
                        <Grid item xs={3} style={SPACED}>
                            <text>{values.clinician}</text>
                        </Grid>

                        <Grid item xs={3} style={SPACED}>
                            <text style={BOLD}>Date of Birth:</text>
                        </Grid>
                        <Grid item xs={3} style={SPACED}>
                            <text>{values.dob.toString()}</text>
                        </Grid>

                        <Grid item xs={3} style={SPACED}>
                            <text style={BOLD}>Gender:</text>
                        </Grid>
                        <Grid item xs={3} style={SPACED}>
                            <text>{values.gender}</text>
                        </Grid>

                        <Grid item xs={3} style={SPACED}>
                            <text style={BOLD}>Anatomical Location:</text>
                        </Grid>
                        <Grid item xs={3} style={SPACED}>
                            <text>{anatomicalText}</text>
                        </Grid>

                        <Grid item xs={3} style={SPACED}>
                            <text style={BOLD}>Urgency:</text>
                        </Grid>
                        <Grid item xs={3} style={SPACED}>
                            <text>{values.urgency}</text>
                        </Grid>

                        <Grid item container xs={12}>
                            <Grid item xs={3} style={SPACED}>
                                <text style={BOLD}>Clinical History:</text>
                            </Grid>
                            <Grid item xs={9} style={SPACED}>
                                <text>{values.clinicalInformation}</text>
                            </Grid>
                        </Grid>

                        <Grid item container xs={12}>
                            <Grid item xs={3} style={SPACED}>
                                <text style={BOLD}>Additional Comments:</text>
                            </Grid>
                            <Grid item xs={9} style={SPACED}>
                                <text>{values.additionalComments}</text>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} style={{ display: "flex", justifyContent: "space-around", marginTop: "8px" }}>
                            <ul style={{ listStyleType: 'none', padding: '0' }}>
                                {
                                    specialRequirementsBody.map((message) => {
                                        return <li style={{ color: 'red' }}>{message}</li>
                                    })
                                }
                            </ul>
                        </Grid>

                        <Grid item xs={12} style={{ display: "flex", justifyContent: "space-around" }}>
                            <FormControlLabel
                                control={<Checkbox />}
                                onChange={() => setIsDisabled(!isDisabled)}
                                label='The above information is accurate, and any special requirements have been noted'
                            />
                        </Grid>

                        <Grid item xs={12} style={{ display: "flex", justifyContent: "space-around" }}>
                            <ButtonGroup size="small" variant="contained" style={{ marginTop: "24px" }}>
                                <Button color="primary" type="submit" disabled={isDisabled}>
                                    Submit
                                </Button>
                                <Button color="secondary" onClick={handleModalClose}>
                                    Cancel
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Grid>

                {/* <FormControlLabel
                    control={<Checkbox />}
                    onChange={() => setIsDisabled(!isDisabled)}
                    label='The above information is accurate, and any special requirements have been noted'
                /> */}

                {/* <ButtonGroup size="small" variant="contained" style={{ marginTop: "24px" }}>
                    <Button
                        color="primary"
                        type="submit"
                        disabled={isDisabled}
                    >
                        Submit
                    </Button>
                    <Button
                        color="secondary"
                        onClick={handleModalClose}
                    >
                        Cancel
                    </Button>
                </ButtonGroup> */}
            </Paper>
        </>
    )
}

export default Modal;