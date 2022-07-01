import React, { useState } from "react";

// Components
import { Outpatient } from "./inputFields/1_Outpatient";
import { EDOutpatientFollowUpWith } from "./inputFields/2_EDOutpatientFollowUpWith";
import { EDOutpatientFollowUpWith_PatientContact } from "./inputFields/2_EDOutpatientFollowUpWith_PatientContact";
import { EDOutpatientFollowUpWith_PatientName } from "./inputFields/2_EDOutpatientFollowUpWith_PatientName";
import { InpatientED } from "./inputFields/3_InpatientED";
import { PatientInformation_LastNameFirstName } from "./inputFields/4_PatientInformation_LastNameFirstName";
import { PatientInformation_DOB } from "./inputFields/4_PatientInformation_DOB";
import { PatientInformation_Age } from "./inputFields/4_PatientInformation_Age";
import { PatientInformation_Sex } from "./inputFields/4_PatientInformation_Sex";
import { PatientInformation_MHSC } from "./inputFields/4_PatientInformation_MHSC";
import { PatientInformation_PHIN } from "./inputFields/4_PatientInformation_PHIN";
import { PatientInformation_OtherInsuranceWCB } from "./inputFields/4_PatientInformation_OtherInsuranceWCB";
import { PatientInformation_FullAddress } from "./inputFields/4_PatientInformation_FullAddress";
import { PatientInformation_EmailAddress } from "./inputFields/4_PatientInformation_EmailAddress";
import { PatientInformation_DaytimeMobile } from "./inputFields/4_PatientInformation_DaytimeMobile";
import { PatientInformation_EmergencyContactNextOfKin } from "./inputFields/4_PatientInformation_EmergencyContactNextOfKin";
import { PatientInformation_Translator } from "./inputFields/4_PatientInformation_Translator";
import { Scheduling_Urgency } from "./inputFields/5_Scheduling_Urgency";
import { Scheduling_Transport } from "./inputFields/5_Scheduling_Transport";
import { Pregnant } from "./inputFields/6_Pregnant";
import { Claustrophobia } from "./inputFields/7_Claustrophobia";
import { RequiresSedation } from "./inputFields/8_RequiresSedation";
import { InfectionControlPrecautions } from "./inputFields/9_InfectionControlPrecautions";
import { ExamInformation_Weight } from "./inputFields/10_ExamInformation_Weight";
import { ExamInformation_Height } from "./inputFields/10_ExamInformation_Height";
import { ExamInformation_AllergiesRelatedToImaging } from "./inputFields/10_ExamInformation_AllergiesRelatedToImaging";
import { ExamInformation_PediatricPatients } from "./inputFields/10_ExamInformation_PediatricPatients";
import { ExamInformation_AnatomicalLocationExaminationRequested } from "./inputFields/11_ExamInformation_AnatomicalLocationExaminationRequested";
import { ExamInformation_PreviousRelevantExams } from "./inputFields/12_ExamInformation_PreviousRelevantExams";
import { RelevantClinicalSurgicalHistory } from "./inputFields/13_RelevantClinicalSurgicalHistory";
import { ForIVContrastExams } from "./inputFields/14_ForIVContrastExams";
import { PreAppointmentScreening_PacemakerDefibrillator } from "./inputFields/15_PreAppointmentScreening_PacemakerDefibrillator";
import { PreAppointmentScreening_DrugInfusionPump } from "./inputFields/15_PreAppointmentScreening_DrugInfusionPump";
import { PreAppointmentScreening_NeuroOrSpinalCordStimulator } from "./inputFields/15_PreAppointmentScreening_NeuroOrSpinalCordStimulator";
import { PreAppointmentScreening_SurgicalImplants } from "./inputFields/15_PreAppointmentScreening_SurgicalImplants";
import { PreAppointmentScreening_LoopRecorder } from "./inputFields/15_PreAppointmentScreening_LoopRecorder";
import { PreAppointmentScreening_WelderWorkWithMetalAnyMetalInEyes } from "./inputFields/15_PreAppointmentScreening_WelderWorkWithMetalAnyMetalInEyes";
import { PreAppointmentScreening_STRATAValve } from "./inputFields/15_PreAppointmentScreening_STRATAValve";
import { PreAppointmentScreening_BulletShrapnelOrOtherMetalForeignBody } from "./inputFields/15_PreAppointmentScreening_BulletShrapnelOrOtherMetalForeignBody";
import { PreAppointmentScreening_CochlearImplant } from "./inputFields/15_PreAppointmentScreening_CochlearImplant";
import { PreAppointmentScreening_Other } from "./inputFields/15_PreAppointmentScreening_Other";
import { OrderingClinician_ClinicianSignature } from "./inputFields/16_OrderingClinician_ClinicianSignature";
import { OrderingClinician_ClinicianName } from "./inputFields/16_OrderingClinician_ClinicianName";
import { OrderingClinician_Billing } from "./inputFields/16_OrderingClinician_Billing";
import { OrderingClinician_Fax } from "./inputFields/16_OrderingClinician_Fax";
import { OrderingClinician_24hrCriticalResultsContact } from "./inputFields/16_OrderingClinician_24hrCriticalResultsContact";
import { OrderingClinician_Address } from "./inputFields/16_OrderingClinician_Address";
import { OrderingClinician_Phone } from "./inputFields/16_OrderingClinician_Phone";
import { OrderingClinician_DateOrdered } from "./inputFields/16_OrderingClinician_DateOrdered";
import { OrderingClinician_TimeOrdered } from "./inputFields/16_OrderingClinician_TimeOrdered";
import { OrderingClinician_CopyToClinicianName } from "./inputFields/16_OrderingClinician_CopyToClinicianName";
import { OrderingClinician_CopyToLocation } from "./inputFields/16_OrderingClinician_CopyToLocation";
import { OrderingClinician_CopyToPhone } from "./inputFields/16_OrderingClinician_CopyToPhone";
import { OrderingClinician_CopyToFax } from "./inputFields/16_OrderingClinician_CopyToFax";

// Styles
import {
  FormControl,
  Button,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Switch,
} from "@material-ui/core";

export const FieldRulesDialog = ({
  // shared function
  handleChangeFieldRules,

  // form data
  formEditMode,
  field,

  // Outpatient field
  specification,
  handleChangeRadioButton_Outpatient,
  handleChangeTextField_Outpatient,

  // EDOutpatientFollowUpWith field
  timeOrderPlaced,
  handleChangeCheckbox_EDOutpatientFollowUpWith,
  handleChangeTextField_EDOutpatientFollowUpWith,

  // EDOutpatientFollowUpWith Patient Contact field
  patientContact,
  handleChangeTextField_EDOutpatientFollowUpWith_PatientContact,

  // EDOutpatientFollowUpWith Patient Name field
  patientName,
  handleChangeTextField_EDOutpatientFollowUpWith_PatientName,

  // InpatientED field
  site,
  wardRoom,
  handleChangeCheckbox_InpatientED,
  handleChangeTextField_InpatientED,

  // PatientInformation Last Name First Name field
  lastNameFirstName,
  handleChangeTextField_PatientInformation_LastNameFirstName,

  // PatientInformation DOB field
  DOB,
  handleChangeTextField_PatientInformation_DOB,

  // PatientInformation Age field
  age,
  handleChangeTextField_PatientInformation_Age,

  // PatientInformation Sex field
  handleChangeRadioButton_PatientInformation_Sex,

  // PatientInformation MHSC field
  MHSC,
  handleChangeTextField_PatientInformation_MHSC,

  // PatientInformation PHIN field
  PHIN,
  handleChangeTextField_PatientInformation_PHIN,

  // PatientInformation Other Insurance WCB field
  WCB,
  handleChangeRadioButton_PatientInformation_OtherInsuranceWCB,
  handleChangeTextField_PatientInformation_OtherInsuranceWCB,

  // PatientInformation Full Address field
  fullAddress,
  handleChangeTextField_PatientInformation_FullAddress,

  // PatientInformation Email Address field
  emailAddress,
  handleChangeTextField_PatientInformation_EmailAddress,

  // PatientInformation Daytime Mobile field
  daytime,
  mobile,
  handleChangeTextField_PatientInformation_DaytimeMobile,

  // PatientInformation Emergency Contact Next Of Kin field
  emergencyContactNextOfKin,
  handleChangeTextField_PatientInformation_EmergencyContactNextOfKin,

  // PatientInformation Translator field
  languageRequired,
  handleChangeCheckbox_PatientInformation_Translator,
  handleChangeTextField_PatientInformation_Translator,

  // Scheduling Urgency field
  requestedDate,
  handleChangeRadioButton_Scheduling_Urgency,
  handleChangeTextField_Scheduling_Urgency,

  // Scheduling Transport field
  handleChangeCheckbox_Scheduling_Transport,

  // Pregnant field
  LMP,
  handleChangeRadioButton_Pregnant,
  handleChangeTextField_Pregnant,

  // Claustrophobia field
  handleChangeRadioButton_Claustrophobia,

  // Requires Sedation field
  handleChangeRadioButton_RequiresSedation,

  // InfectionControlPrecautions field
  specification2,
  handleChangeRadioButton_InfectionControlPrecautions,
  handleChangeTextField_InfectionControlPrecautions,

  // ExamInformation Weight field
  weight,
  handleChangeTextField_ExamInformation_Weight,

  // ExamInformation Height field
  height,
  handleChangeTextField_ExamInformation_Height,

  // ExamInformation Allergies Related To Imaging field
  allergies,
  handleChangeTextField_ExamInformation_AllergiesRelatedToImaging,

  // ExamInformation Pediatric Patients field
  headCircumferencePercentile,
  handleChangeTextField_ExamInformation_PediatricPatients,

  // ExamInformation Anatomical Location Examination Requested field
  anatomicalLocation,
  handleChangeTextField_ExamInformation_AnatomicalLocationExaminationRequested,

  // ExamInformation Previous Relevant Exams field
  previousRelevantExams,
  handleChangeTextField_ExamInformation_PreviousRelevantExams,

  // Relevant Clinical Surgical History field
  relevantClinicalSurgicalHistory,
  handleChangeCheckbox_RelevantClinicalSurgicalHistory,
  handleChangeTextField_RelevantClinicalSurgicalHistory,

  // For IV Contrast Exams field
  SCr,
  eGFR,
  Date,
  handleChangeTextField_ForIVContrastExams,
  handleChangeRadioButton_ForIVContrastExams,
  handleChangeRadioButton_ForIVContrastExams2,

  // Pre-appointment Screening Pacemaker Defibrillator field
  handleChangeRadioButton_PreAppointmentScreening_PacemakerDefibrillator,

  // Pre-appointment Screening Drug Infusion Pump field
  handleChangeRadioButton_PreAppointmentScreening_DrugInfusionPump,

  // Pre-appointment Screening Neuro Or Spinal Cord Stimulator field
  handleChangeRadioButton_PreAppointmentScreening_NeuroOrSpinalCordStimulator,

  // Pre-appointment Screening Surgical Implants field
  handleChangeRadioButton_PreAppointmentScreening_SurgicalImplants,

  // Pre-appointment Screening Loop Recorder field
  handleChangeRadioButton_PreAppointmentScreening_LoopRecorder,

  // Pre-appointment Screening Welder Work With Metal Any Metal In Eyes field
  handleChangeRadioButton_PreAppointmentScreening_WelderWorkWithMetalAnyMetalInEyes,

  // Pre-appointment Screening STRATA Valve field
  handleChangeRadioButton_PreAppointmentScreening_STRATAValve,

  // Pre-appointment Screening Bullet Shrapnel Or Other Metal Foreign Body field
  handleChangeRadioButton_PreAppointmentScreening_BulletShrapnelOrOtherMetalForeignBody,

  // Pre-appointment Screening Cochlear Implant field
  handleChangeRadioButton_PreAppointmentScreening_CochlearImplant,

  // Pre-appointment Screening Other field
  other,
  handleChangeRadioButton_PreAppointmentScreening_Other,
  handleChangeTextField_PreAppointmentScreening_Other,

  // Ordering Clinician Clinician Signature field
  clinicianSignature,
  handleChangeTextField_OrderingClinician_ClinicianSignature,

  // Ordering Clinician Clinician Name field
  clinicianName,
  handleChangeTextField_OrderingClinician_ClinicianName,

  // Ordering Clinician Billing field
  billing,
  handleChangeTextField_OrderingClinician_Billing,

  // Ordering Clinician Fax field
  fax,
  handleChangeTextField_OrderingClinician_Fax,

  // Ordering Clinician 24hr Critical Results Contact field
  _24hrCriticalResultsContact,
  handleChangeTextField_OrderingClinician_24hrCriticalResultsContact,

  // Ordering Clinician Address field
  address,
  handleChangeTextField_OrderingClinician_Address,

  // Ordering Clinician Phone field
  phone,
  handleChangeTextField_OrderingClinician_Phone,

  // Ordering Clinician Date Ordered field
  dateOrdered,
  handleChangeTextField_OrderingClinician_DateOrdered,

  // Ordering Clinician Time Ordered field
  timeOrdered,
  handleChangeTextField_OrderingClinician_TimeOrdered,

  // Ordering Clinician Copy To Clinician Name field
  copyToClinicianName,
  handleChangeTextField_OrderingClinician_CopyToClinicianName,

  // Ordering Clinician Copy To Location field
  copyToLocation,
  handleChangeTextField_OrderingClinician_CopyToLocation,

  // Ordering Clinician Copy To Phone field
  copyToPhone,
  handleChangeTextField_OrderingClinician_CopyToPhone,

  // Ordering Clinician Copy To Fax field
  copyToFax,
  handleChangeTextField_OrderingClinician_CopyToFax,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleClickCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Grid container direction="column">
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={openDialog}
        onClose={handleClickCloseDialog}
      >
        <DialogTitle>Validation Rules</DialogTitle>
        <DialogContent>
          <form style={{ display: "flex", flexDirection: "column" }}>
            <FormControl style={{ margin: "8px", minWidth: "120px" }}>
              <FormControlLabel
                control={<Switch id={field.strFieldName} />}
                label="Required"
                labelPlacement="start"
                name="required"
                checked={field.objFieldRules.boolRequired}
                onChange={handleChangeFieldRules}
              />
            </FormControl>
            <FormControl style={{ margin: "8px", minWidth: "120px" }}>
              <FormControlLabel
                control={<Switch id={field.strFieldName} />}
                label="Attachment required"
                labelPlacement="start"
                name="attachmentRequired"
                checked={field.objFieldRules.boolAttachmentRequired}
                onChange={handleChangeFieldRules}
                disabled={!field.objFieldRules.boolAttachmentSupported}
              />
            </FormControl>
            <FormControl style={{ margin: "8px", minWidth: "120px" }}>
              <FormControlLabel
                control={<Switch id={field.strFieldName} />}
                label="Bypass allowed"
                labelPlacement="start"
                name="bypassAllowed"
                checked={
                  !field.objFieldRules.boolRequired &&
                  !field.objFieldRules.boolAttachmentRequired
                    ? (field.objFieldRules.boolBypassAllowed = false) // ?
                    : field.objFieldRules.boolBypassAllowed
                }
                onChange={handleChangeFieldRules}
                disabled={
                  !field.objFieldRules.boolRequired &&
                  !field.objFieldRules.boolAttachmentRequired
                }
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseDialog} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {field.strFieldName === "Outpatient" && (
        <Outpatient
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          specification={specification}
          handleChangeRadioButton_Outpatient={
            handleChangeRadioButton_Outpatient
          }
          handleChangeTextField_Outpatient={handleChangeTextField_Outpatient}
        />
      )}
      {field.strFieldName === "EDOutpatientFollowUpWith" && (
        <EDOutpatientFollowUpWith
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          timeOrderPlaced={timeOrderPlaced}
          handleChangeCheckbox_EDOutpatientFollowUpWith={
            handleChangeCheckbox_EDOutpatientFollowUpWith
          }
          handleChangeTextField_EDOutpatientFollowUpWith={
            handleChangeTextField_EDOutpatientFollowUpWith
          }
        />
      )}
      {field.strFieldName === "EDOutpatientFollowUpWith_PatientContact" && (
        <EDOutpatientFollowUpWith_PatientContact
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          patientContact={patientContact}
          handleChangeTextField_EDOutpatientFollowUpWith_PatientContact={
            handleChangeTextField_EDOutpatientFollowUpWith_PatientContact
          }
        />
      )}
      {field.strFieldName === "EDOutpatientFollowUpWith_PatientName" && (
        <EDOutpatientFollowUpWith_PatientName
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          patientName={patientName}
          handleChangeTextField_EDOutpatientFollowUpWith_PatientName={
            handleChangeTextField_EDOutpatientFollowUpWith_PatientName
          }
        />
      )}
      {field.strFieldName === "InpatientED" && (
        <InpatientED
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          site={site}
          wardRoom={wardRoom}
          handleChangeCheckbox_InpatientED={handleChangeCheckbox_InpatientED}
          handleChangeTextField_InpatientED={handleChangeTextField_InpatientED}
        />
      )}
      {field.strFieldName === "PatientInformation_LastNameFirstName" && (
        <PatientInformation_LastNameFirstName
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          lastNameFirstName={lastNameFirstName}
          handleChangeTextField_PatientInformation_LastNameFirstName={
            handleChangeTextField_PatientInformation_LastNameFirstName
          }
        />
      )}
      {field.strFieldName === "PatientInformation_DOB" && (
        <PatientInformation_DOB
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          DOB={DOB}
          handleChangeTextField_PatientInformation_DOB={
            handleChangeTextField_PatientInformation_DOB
          }
        />
      )}
      {field.strFieldName === "PatientInformation_Age" && (
        <PatientInformation_Age
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          age={age}
          handleChangeTextField_PatientInformation_Age={
            handleChangeTextField_PatientInformation_Age
          }
        />
      )}
      {field.strFieldName === "PatientInformation_Sex" && (
        <PatientInformation_Sex
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          handleChangeRadioButton_PatientInformation_Sex={
            handleChangeRadioButton_PatientInformation_Sex
          }
        />
      )}
      {field.strFieldName === "PatientInformation_MHSC" && (
        <PatientInformation_MHSC
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          MHSC={MHSC}
          handleChangeTextField_PatientInformation_MHSC={
            handleChangeTextField_PatientInformation_MHSC
          }
        />
      )}
      {field.strFieldName === "PatientInformation_PHIN" && (
        <PatientInformation_PHIN
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          PHIN={PHIN}
          handleChangeTextField_PatientInformation_PHIN={
            handleChangeTextField_PatientInformation_PHIN
          }
        />
      )}
      {field.strFieldName === "PatientInformation_OtherInsuranceWCB" && (
        <PatientInformation_OtherInsuranceWCB
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          WCB={WCB}
          handleChangeRadioButton_PatientInformation_OtherInsuranceWCB={
            handleChangeRadioButton_PatientInformation_OtherInsuranceWCB
          }
          handleChangeTextField_PatientInformation_OtherInsuranceWCB={
            handleChangeTextField_PatientInformation_OtherInsuranceWCB
          }
        />
      )}
      {field.strFieldName === "PatientInformation_FullAddress" && (
        <PatientInformation_FullAddress
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          fullAddress={fullAddress}
          handleChangeTextField_PatientInformation_FullAddress={
            handleChangeTextField_PatientInformation_FullAddress
          }
        />
      )}
      {field.strFieldName === "PatientInformation_EmailAddress" && (
        <PatientInformation_EmailAddress
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          emailAddress={emailAddress}
          handleChangeTextField_PatientInformation_EmailAddress={
            handleChangeTextField_PatientInformation_EmailAddress
          }
        />
      )}
      {field.strFieldName === "PatientInformation_DaytimeMobile" && (
        <PatientInformation_DaytimeMobile
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          daytime={daytime}
          mobile={mobile}
          handleChangeTextField_PatientInformation_DaytimeMobile={
            handleChangeTextField_PatientInformation_DaytimeMobile
          }
        />
      )}
      {field.strFieldName ===
        "PatientInformation_EmergencyContactNextOfKin" && (
        <PatientInformation_EmergencyContactNextOfKin
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          emergencyContactNextOfKin={emergencyContactNextOfKin}
          handleChangeTextField_PatientInformation_EmergencyContactNextOfKin={
            handleChangeTextField_PatientInformation_EmergencyContactNextOfKin
          }
        />
      )}
      {field.strFieldName === "PatientInformation_Translator" && (
        <PatientInformation_Translator
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          languageRequired={languageRequired}
          handleChangeCheckbox_PatientInformation_Translator={
            handleChangeCheckbox_PatientInformation_Translator
          }
          handleChangeTextField_PatientInformation_Translator={
            handleChangeTextField_PatientInformation_Translator
          }
        />
      )}
      {field.strFieldName === "Scheduling_Urgency" && (
        <Scheduling_Urgency
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          requestedDate={requestedDate}
          handleChangeRadioButton_Scheduling_Urgency={
            handleChangeRadioButton_Scheduling_Urgency
          }
          handleChangeTextField_Scheduling_Urgency={
            handleChangeTextField_Scheduling_Urgency
          }
        />
      )}
      {field.strFieldName === "Scheduling_Transport" && (
        <Scheduling_Transport
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          handleChangeCheckbox_Scheduling_Transport={
            handleChangeCheckbox_Scheduling_Transport
          }
        />
      )}
      {field.strFieldName === "Pregnant" && (
        <Pregnant
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          LMP={LMP}
          handleChangeRadioButton_Pregnant={handleChangeRadioButton_Pregnant}
          handleChangeTextField_Pregnant={handleChangeTextField_Pregnant}
        />
      )}
      {field.strFieldName === "Claustrophobia" && (
        <Claustrophobia
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          handleChangeRadioButton_Claustrophobia={
            handleChangeRadioButton_Claustrophobia
          }
        />
      )}
      {field.strFieldName === "RequiresSedation" && (
        <RequiresSedation
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          handleChangeRadioButton_RequiresSedation={
            handleChangeRadioButton_RequiresSedation
          }
        />
      )}
      {field.strFieldName === "InfectionControlPrecautions" && (
        <InfectionControlPrecautions
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          specification2={specification2}
          handleChangeRadioButton_InfectionControlPrecautions={
            handleChangeRadioButton_InfectionControlPrecautions
          }
          handleChangeTextField_InfectionControlPrecautions={
            handleChangeTextField_InfectionControlPrecautions
          }
        />
      )}
      {field.strFieldName === "ExamInformation_Weight" && (
        <ExamInformation_Weight
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          weight={weight}
          handleChangeTextField_ExamInformation_Weight={
            handleChangeTextField_ExamInformation_Weight
          }
        />
      )}
      {field.strFieldName === "ExamInformation_Height" && (
        <ExamInformation_Height
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          height={height}
          handleChangeTextField_ExamInformation_Height={
            handleChangeTextField_ExamInformation_Height
          }
        />
      )}
      {field.strFieldName === "ExamInformation_AllergiesRelatedToImaging" && (
        <ExamInformation_AllergiesRelatedToImaging
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          allergies={allergies}
          handleChangeTextField_ExamInformation_AllergiesRelatedToImaging={
            handleChangeTextField_ExamInformation_AllergiesRelatedToImaging
          }
        />
      )}
      {field.strFieldName === "ExamInformation_PediatricPatients" && (
        <ExamInformation_PediatricPatients
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          headCircumferencePercentile={headCircumferencePercentile}
          handleChangeTextField_ExamInformation_PediatricPatients={
            handleChangeTextField_ExamInformation_PediatricPatients
          }
        />
      )}
      {field.strFieldName ===
        "ExamInformation_AnatomicalLocationExaminationRequested" && (
        <ExamInformation_AnatomicalLocationExaminationRequested
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          anatomicalLocation={anatomicalLocation}
          handleChangeTextField_ExamInformation_AnatomicalLocationExaminationRequested={
            handleChangeTextField_ExamInformation_AnatomicalLocationExaminationRequested
          }
        />
      )}
      {field.strFieldName === "ExamInformation_PreviousRelevantExams" && (
        <ExamInformation_PreviousRelevantExams
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          previousRelevantExams={previousRelevantExams}
          handleChangeTextField_ExamInformation_PreviousRelevantExams={
            handleChangeTextField_ExamInformation_PreviousRelevantExams
          }
        />
      )}
      {field.strFieldName === "RelevantClinicalSurgicalHistory" && (
        <RelevantClinicalSurgicalHistory
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          relevantClinicalSurgicalHistory={relevantClinicalSurgicalHistory}
          handleChangeCheckbox_RelevantClinicalSurgicalHistory={
            handleChangeCheckbox_RelevantClinicalSurgicalHistory
          }
          handleChangeTextField_RelevantClinicalSurgicalHistory={
            handleChangeTextField_RelevantClinicalSurgicalHistory
          }
        />
      )}
      {field.strFieldName === "ForIVContrastExams" && (
        <ForIVContrastExams
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          SCr={SCr}
          eGFR={eGFR}
          Date={Date}
          handleChangeTextField_ForIVContrastExams={
            handleChangeTextField_ForIVContrastExams
          }
          handleChangeRadioButton_ForIVContrastExams={
            handleChangeRadioButton_ForIVContrastExams
          }
          handleChangeRadioButton_ForIVContrastExams2={
            handleChangeRadioButton_ForIVContrastExams2
          }
        />
      )}
      {field.strFieldName ===
        "PreAppointmentScreening_PacemakerDefibrillator" && (
        <PreAppointmentScreening_PacemakerDefibrillator
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          handleChangeRadioButton_PreAppointmentScreening_PacemakerDefibrillator={
            handleChangeRadioButton_PreAppointmentScreening_PacemakerDefibrillator
          }
        />
      )}
      {field.strFieldName === "PreAppointmentScreening_DrugInfusionPump" && (
        <PreAppointmentScreening_DrugInfusionPump
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          handleChangeRadioButton_PreAppointmentScreening_DrugInfusionPump={
            handleChangeRadioButton_PreAppointmentScreening_DrugInfusionPump
          }
        />
      )}
      {field.strFieldName ===
        "PreAppointmentScreening_NeuroOrSpinalCordStimulator" && (
        <PreAppointmentScreening_NeuroOrSpinalCordStimulator
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          handleChangeRadioButton_PreAppointmentScreening_NeuroOrSpinalCordStimulator={
            handleChangeRadioButton_PreAppointmentScreening_NeuroOrSpinalCordStimulator
          }
        />
      )}
      {field.strFieldName === "PreAppointmentScreening_SurgicalImplants" && (
        <PreAppointmentScreening_SurgicalImplants
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          handleChangeRadioButton_PreAppointmentScreening_SurgicalImplants={
            handleChangeRadioButton_PreAppointmentScreening_SurgicalImplants
          }
        />
      )}
      {field.strFieldName === "PreAppointmentScreening_LoopRecorder" && (
        <PreAppointmentScreening_LoopRecorder
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          handleChangeRadioButton_PreAppointmentScreening_LoopRecorder={
            handleChangeRadioButton_PreAppointmentScreening_LoopRecorder
          }
        />
      )}
      {field.strFieldName ===
        "PreAppointmentScreening_WelderWorkWithMetalAnyMetalInEyes" && (
        <PreAppointmentScreening_WelderWorkWithMetalAnyMetalInEyes
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          handleChangeRadioButton_PreAppointmentScreening_WelderWorkWithMetalAnyMetalInEyes={
            handleChangeRadioButton_PreAppointmentScreening_WelderWorkWithMetalAnyMetalInEyes
          }
        />
      )}
      {field.strFieldName === "PreAppointmentScreening_STRATAValve" && (
        <PreAppointmentScreening_STRATAValve
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          handleChangeRadioButton_PreAppointmentScreening_STRATAValve={
            handleChangeRadioButton_PreAppointmentScreening_STRATAValve
          }
        />
      )}
      {field.strFieldName ===
        "PreAppointmentScreening_BulletShrapnelOrOtherMetalForeignBody" && (
        <PreAppointmentScreening_BulletShrapnelOrOtherMetalForeignBody
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          handleChangeRadioButton_PreAppointmentScreening_BulletShrapnelOrOtherMetalForeignBody={
            handleChangeRadioButton_PreAppointmentScreening_BulletShrapnelOrOtherMetalForeignBody
          }
        />
      )}
      {field.strFieldName === "PreAppointmentScreening_CochlearImplant" && (
        <PreAppointmentScreening_CochlearImplant
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          handleChangeRadioButton_PreAppointmentScreening_CochlearImplant={
            handleChangeRadioButton_PreAppointmentScreening_CochlearImplant
          }
        />
      )}
      {field.strFieldName === "PreAppointmentScreening_Other" && (
        <PreAppointmentScreening_Other
          formEditMode={formEditMode}
          field={field}
          other={other}
          handleClickOpenDialog={handleClickOpenDialog}
          handleChangeRadioButton_PreAppointmentScreening_Other={
            handleChangeRadioButton_PreAppointmentScreening_Other
          }
          handleChangeTextField_PreAppointmentScreening_Other={
            handleChangeTextField_PreAppointmentScreening_Other
          }
        />
      )}
      {field.strFieldName === "OrderingClinician_ClinicianSignature" && (
        <OrderingClinician_ClinicianSignature
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          clinicianSignature={clinicianSignature}
          handleChangeTextField_OrderingClinician_ClinicianSignature={
            handleChangeTextField_OrderingClinician_ClinicianSignature
          }
        />
      )}
      {field.strFieldName === "OrderingClinician_ClinicianName" && (
        <OrderingClinician_ClinicianName
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          clinicianName={clinicianName}
          handleChangeTextField_OrderingClinician_ClinicianName={
            handleChangeTextField_OrderingClinician_ClinicianName
          }
        />
      )}
      {field.strFieldName === "OrderingClinician_Billing" && (
        <OrderingClinician_Billing
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          billing={billing}
          handleChangeTextField_OrderingClinician_Billing={
            handleChangeTextField_OrderingClinician_Billing
          }
        />
      )}
      {field.strFieldName === "OrderingClinician_Fax" && (
        <OrderingClinician_Fax
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          fax={fax}
          handleChangeTextField_OrderingClinician_Fax={
            handleChangeTextField_OrderingClinician_Fax
          }
        />
      )}
      {field.strFieldName ===
        "OrderingClinician_24hrCriticalResultsContact" && (
        <OrderingClinician_24hrCriticalResultsContact
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          _24hrCriticalResultsContact={_24hrCriticalResultsContact}
          handleChangeTextField_OrderingClinician_24hrCriticalResultsContact={
            handleChangeTextField_OrderingClinician_24hrCriticalResultsContact
          }
        />
      )}
      {field.strFieldName === "OrderingClinician_Address" && (
        <OrderingClinician_Address
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          address={address}
          handleChangeTextField_OrderingClinician_Address={
            handleChangeTextField_OrderingClinician_Address
          }
        />
      )}
      {field.strFieldName === "OrderingClinician_Phone" && (
        <OrderingClinician_Phone
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          phone={phone}
          handleChangeTextField_OrderingClinician_Phone={
            handleChangeTextField_OrderingClinician_Phone
          }
        />
      )}
      {field.strFieldName === "OrderingClinician_DateOrdered" && (
        <OrderingClinician_DateOrdered
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          dateOrdered={dateOrdered}
          handleChangeTextField_OrderingClinician_DateOrdered={
            handleChangeTextField_OrderingClinician_DateOrdered
          }
        />
      )}
      {field.strFieldName === "OrderingClinician_TimeOrdered" && (
        <OrderingClinician_TimeOrdered
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          timeOrdered={timeOrdered}
          handleChangeTextField_OrderingClinician_TimeOrdered={
            handleChangeTextField_OrderingClinician_TimeOrdered
          }
        />
      )}
      {field.strFieldName === "OrderingClinician_CopyToClinicianName" && (
        <OrderingClinician_CopyToClinicianName
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          copyToClinicianName={copyToClinicianName}
          handleChangeTextField_OrderingClinician_CopyToClinicianName={
            handleChangeTextField_OrderingClinician_CopyToClinicianName
          }
        />
      )}
      {field.strFieldName === "OrderingClinician_CopyToLocation" && (
        <OrderingClinician_CopyToLocation
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          copyToLocation={copyToLocation}
          handleChangeTextField_OrderingClinician_CopyToLocation={
            handleChangeTextField_OrderingClinician_CopyToLocation
          }
        />
      )}
      {field.strFieldName === "OrderingClinician_CopyToPhone" && (
        <OrderingClinician_CopyToPhone
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          copyToPhone={copyToPhone}
          handleChangeTextField_OrderingClinician_CopyToPhone={
            handleChangeTextField_OrderingClinician_CopyToPhone
          }
        />
      )}
      {field.strFieldName === "OrderingClinician_CopyToFax" && (
        <OrderingClinician_CopyToFax
          formEditMode={formEditMode}
          field={field}
          handleClickOpenDialog={handleClickOpenDialog}
          copyToFax={copyToFax}
          handleChangeTextField_OrderingClinician_CopyToFax={
            handleChangeTextField_OrderingClinician_CopyToFax
          }
        />
      )}
    </Grid>
  );
};
