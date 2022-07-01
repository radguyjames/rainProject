import React, { useState } from "react";

// Components
import { LogoAndTitle } from "../presentational/nonInputFields/logoAndTitle/LogoAndTitle";
import { FieldRulesDialog } from "../presentational/FieldRulesDialog";
import { PatientInformation_Title } from "../presentational/nonInputFields/4_PatientInformation_Title";
import { PatientInformation_Footer } from "../presentational/nonInputFields/4_PatientInformation_Footer";
import { Scheduling_Title } from "../presentational/nonInputFields/5_Scheduling_Title";
import { SedationFormRequired } from "../presentational/nonInputFields/8_SedationFormRequired";
import { SedationFormRequired2 } from "../presentational/nonInputFields/8_SedationFormRequired2";
import { ExamInformation } from "../presentational/nonInputFields/10_ExamInformation";
import { PreAppointmentScreening_Title } from "../presentational/nonInputFields/15_PreAppointmentScreening_Title";
import { PreAppointmentScreening_Heading } from "../presentational/nonInputFields/15_PreAppointmentScreening_Heading";
import { OrderingClinician_Title } from "../presentational/nonInputFields/16_OrderingClinician_Title";
import { Footer } from "../presentational/nonInputFields/Footer";
import { FootNote } from "../presentational/nonInputFields/FootNote";

// Styles
import { Box, Grid } from "@material-ui/core";

export const MRIForm = ({ formData, formEditMode }) => {
  const [arrAllFields, setArrAllFields] = useState(formData.arrFields);

  /* #region  Outpatient field */
  let Outpatient = [...arrAllFields];
  const [specification, setSpecification] = useState(
    Outpatient[0].strFieldAdditionalText
  );
  const handleChangeTextField_Outpatient = (e) => {
    setSpecification(e.target.value);
    Outpatient[0].strFieldAdditionalText = e.target.value;
    if (Outpatient[0].strFieldValue === "2") {
      Outpatient[0].strFieldValueFormatted =
        Outpatient[0].strFieldAdditionalText;
    }
    setArrAllFields(Outpatient);
    // console.log(Outpatient[0].strFieldValueFormatted);
  };
  const handleChangeRadioButton_Outpatient = (e) => {
    Outpatient[0].strFieldValue = e.target.value;
    if (e.target.value === "2") {
      Outpatient[0].strFieldValueFormatted =
        Outpatient[0].strFieldAdditionalText;
      // handleOutpatientEmptySubmit(e.target.value === "");
    } else {
      Outpatient[0].strFieldValueFormatted = e.target.value;
    }
    setArrAllFields(Outpatient);
    // console.log(Outpatient[0].strFieldValueFormatted);
  };

  // submit validation
  const [outpatientEmptySubmit, setOutpatientEmptySubmit] = useState(false);
  const handleOutpatientEmptySubmit = (bool) => {
    setOutpatientEmptySubmit(bool);
  };

  // filling validation
  const validateOutpatientInput = (
    OutpatientInput,
    specification,
    emptySubmit
  ) => {
    return emptySubmit
      ? false
      : OutpatientInput === 2
      ? specification === ""
        ? false
        : true
      : true;
  };
  /* #endregion */

  /* #region  EDOutpatientFollowUpWith field */
  let EDOutpatientFollowUpWith = [...arrAllFields];
  const [timeOrderPlaced, setTimeOrderPlaced] = useState(
    EDOutpatientFollowUpWith[1].strFieldAdditionalText
  );
  const handleChangeTextField_EDOutpatientFollowUpWith = (e) => {
    setTimeOrderPlaced(e.target.value);
    EDOutpatientFollowUpWith[1].strFieldAdditionalText = e.target.value;
    if (
      EDOutpatientFollowUpWith[1].strFieldValue[0]["Time order placed:"] ===
      true
    ) {
      EDOutpatientFollowUpWith[1].strFieldValueFormatted[0] =
        EDOutpatientFollowUpWith[1].strFieldAdditionalText;
    }
    setArrAllFields(EDOutpatientFollowUpWith);
    // console.log(EDOutpatientFollowUpWith[1].strFieldValueFormatted);
  };
  const handleChangeCheckbox_EDOutpatientFollowUpWith = (e) => {
    if (e.target.name === "Time order placed:") {
      EDOutpatientFollowUpWith[1].strFieldValue[0]["Time order placed:"] =
        e.target.checked;
      EDOutpatientFollowUpWith[1].strFieldValueFormatted[0] = e.target.checked
        ? EDOutpatientFollowUpWith[1].strFieldAdditionalText
        : "";
    }
    if (e.target.name === "ED Physician") {
      EDOutpatientFollowUpWith[1].strFieldValue[1]["ED Physician"] =
        e.target.checked;
      EDOutpatientFollowUpWith[1].strFieldValueFormatted[1] = e.target.checked
        ? "ED Physician"
        : "";
    }
    if (e.target.name === "Primary Care Provider") {
      EDOutpatientFollowUpWith[1].strFieldValue[2]["Primary Care Provider"] =
        e.target.checked;
      EDOutpatientFollowUpWith[1].strFieldValueFormatted[2] = e.target.checked
        ? "Primary Care Provider"
        : "";
    }
    setArrAllFields(EDOutpatientFollowUpWith);
    // console.log(EDOutpatientFollowUpWith[1].strFieldValueFormatted);
  };
  /* #endregion */

  /* #region  EDOutpatientFollowUpWith Patient Contact field */
  let EDOutpatientFollowUpWith_PatientContact = [...arrAllFields];
  const [patientContact, setPatientContact] = useState(
    EDOutpatientFollowUpWith_PatientContact[2].strFieldValue
  );
  const handleChangeTextField_EDOutpatientFollowUpWith_PatientContact = (e) => {
    setPatientContact(e.target.value);
    EDOutpatientFollowUpWith_PatientContact[2].strFieldValue = e.target.value;
    setArrAllFields(EDOutpatientFollowUpWith_PatientContact);
    // console.log(EDOutpatientFollowUpWith_PatientContact[2].strFieldValue);
  };
  /* #endregion */

  /* #region  EDOutpatientFollowUpWith Patient Name field */
  let EDOutpatientFollowUpWith_PatientName = [...arrAllFields];
  const [patientName, setPatientName] = useState(
    EDOutpatientFollowUpWith_PatientName[3].strFieldValue
  );
  const handleChangeTextField_EDOutpatientFollowUpWith_PatientName = (e) => {
    setPatientName(e.target.value);
    EDOutpatientFollowUpWith_PatientName[3].strFieldValue = e.target.value;
    setArrAllFields(EDOutpatientFollowUpWith_PatientName);
    // console.log(EDOutpatientFollowUpWith_PatientName[3].strFieldValue);
  };
  /* #endregion */

  /* #region  InpatientED field */
  let InpatientED = [...arrAllFields];
  const [site, setSite] = useState(InpatientED[4].strFieldValue[1]["Site"]);
  const [wardRoom, setWardRoom] = useState(
    InpatientED[4].strFieldValue[2]["Ward / Room #"]
  );
  const handleChangeTextField_InpatientED = (e) => {
    if (e.target.name === "Site") {
      setSite(e.target.value);
      InpatientED[4].strFieldValue[1]["Site"] = e.target.value;
      if (InpatientED[4].strFieldValue[0]["Inpatient"] === true) {
        InpatientED[4].strFieldValueFormatted[1] = e.target.value;
      }
    }
    if (e.target.name === "Ward / Room #") {
      setWardRoom(e.target.value);
      InpatientED[4].strFieldValue[2]["Ward / Room #"] = e.target.value;
      if (InpatientED[4].strFieldValue[0]["Inpatient"] === true) {
        InpatientED[4].strFieldValueFormatted[2] = e.target.value;
      }
    }
    setArrAllFields(InpatientED);
    // console.log(InpatientED[4].strFieldValueFormatted);
  };
  const handleChangeCheckbox_InpatientED = (e) => {
    if (e.target.name === "InpatientED") {
      InpatientED[4].strFieldValue[0]["Inpatient"] = e.target.checked;
    }
    if (e.target.name === "EMS Transport") {
      InpatientED[4].strFieldValue[3]["EMS Transport"] = e.target.checked;
      InpatientED[4].strFieldValueFormatted[3] = e.target.checked
        ? "EMS Transport"
        : "";
    }
    setArrAllFields(InpatientED);
    // console.log(InpatientED[4].strFieldValueFormatted);
  };
  /* #endregion */

  /* #region  PatientInformation Last Name First Name field */
  let PatientInformation_LastNameFirstName = [...arrAllFields];
  const [lastNameFirstName, setLastNameFirstName] = useState(
    PatientInformation_LastNameFirstName[5].strFieldValue
  );
  const handleChangeTextField_PatientInformation_LastNameFirstName = (e) => {
    setLastNameFirstName(e.target.value);
    PatientInformation_LastNameFirstName[5].strFieldValue = e.target.value;
    setArrAllFields(PatientInformation_LastNameFirstName);
    // console.log(PatientInformation_LastNameFirstName[5].strFieldValue);
  };
  /* #endregion */

  /* #region  PatientInformation DOB field */
  let PatientInformation_DOB = [...arrAllFields];
  const [DOB, setDOB] = useState(PatientInformation_DOB[6].strFieldValue);
  const handleChangeTextField_PatientInformation_DOB = (e) => {
    setDOB(e.target.value);
    PatientInformation_DOB[6].strFieldValue = e.target.value;
    setArrAllFields(PatientInformation_DOB);
    // console.log(PatientInformation_DOB[6].strFieldValue);
  };
  /* #endregion */

  /* #region  PatientInformation Age field */
  let PatientInformation_Age = [...arrAllFields];
  const [age, setAge] = useState(PatientInformation_Age[7].strFieldValue);
  const handleChangeTextField_PatientInformation_Age = (e) => {
    setAge(e.target.value);
    PatientInformation_Age[7].strFieldValue = e.target.value;
    setArrAllFields(PatientInformation_Age);
    // console.log(PatientInformation_Age[7].strFieldValue);
  };
  /* #endregion */

  /* #region  PatientInformation Sex field */
  let PatientInformation_Sex = [...arrAllFields];
  const handleChangeRadioButton_PatientInformation_Sex = (e) => {
    PatientInformation_Sex[8].strFieldValue = e.target.value;
    PatientInformation_Sex[8].strFieldValueFormatted = e.target.value;
    setArrAllFields(PatientInformation_Sex);
    // console.log(PatientInformation_Sex[8].strFieldValueFormatted);
  };
  /* #endregion */

  /* #region  PatientInformation MHSC field */
  let PatientInformation_MHSC = [...arrAllFields];
  const [MHSC, setMHSC] = useState(PatientInformation_MHSC[9].strFieldValue);
  const handleChangeTextField_PatientInformation_MHSC = (e) => {
    setMHSC(e.target.value);
    PatientInformation_MHSC[9].strFieldValue = e.target.value;
    setArrAllFields(PatientInformation_MHSC);
    // console.log(PatientInformation_MHSC[9].strFieldValue);
  };
  /* #endregion */

  /* #region  PatientInformation PHIN field */
  let PatientInformation_PHIN = [...arrAllFields];
  const [PHIN, setPHIN] = useState(PatientInformation_PHIN[10].strFieldValue);
  const handleChangeTextField_PatientInformation_PHIN = (e) => {
    setPHIN(e.target.value);
    PatientInformation_PHIN[10].strFieldValue = e.target.value;
    setArrAllFields(PatientInformation_PHIN);
    // console.log(PatientInformation_PHIN[10].strFieldValue);
  };
  /* #endregion */

  /* #region  PatientInformation Other Insurance WCB field */
  let PatientInformation_OtherInsuranceWCB = [...arrAllFields];
  const [WCB, setWCB] = useState(
    PatientInformation_OtherInsuranceWCB[11].strFieldAdditionalText
  );
  const handleChangeTextField_PatientInformation_OtherInsuranceWCB = (e) => {
    setWCB(e.target.value);
    PatientInformation_OtherInsuranceWCB[11].strFieldAdditionalText =
      e.target.value;
    if (PatientInformation_OtherInsuranceWCB[11].strFieldValue === "Yes") {
      PatientInformation_OtherInsuranceWCB[11].strFieldValueFormatted =
        PatientInformation_OtherInsuranceWCB[11].strFieldAdditionalText;
    }
    setArrAllFields(PatientInformation_OtherInsuranceWCB);
    // console.log(
    //   PatientInformation_OtherInsuranceWCB[11].strFieldValueFormatted
    // );
  };
  const handleChangeRadioButton_PatientInformation_OtherInsuranceWCB = (e) => {
    PatientInformation_OtherInsuranceWCB[11].strFieldValue = e.target.value;
    if (e.target.value === "Yes") {
      PatientInformation_OtherInsuranceWCB[11].strFieldValueFormatted =
        PatientInformation_OtherInsuranceWCB[11].strFieldAdditionalText;
      // handlePatientInformation_OtherInsuranceWCBEmptySubmit(e.target.value === "");
    } else {
      PatientInformation_OtherInsuranceWCB[11].strFieldValueFormatted =
        e.target.value;
    }
    setArrAllFields(PatientInformation_OtherInsuranceWCB);
    // console.log(
    //   PatientInformation_OtherInsuranceWCB[11].strFieldValueFormatted
    // );
  };
  /* #endregion */

  /* #region  PatientInformation Full Address field */
  let PatientInformation_FullAddress = [...arrAllFields];
  const [fullAddress, setFullAddress] = useState(
    PatientInformation_FullAddress[12].strFieldValue
  );
  const handleChangeTextField_PatientInformation_FullAddress = (e) => {
    setFullAddress(e.target.value);
    PatientInformation_FullAddress[12].strFieldValue = e.target.value;
    setArrAllFields(PatientInformation_FullAddress);
    // console.log(PatientInformation_FullAddress[12].strFieldValue);
  };
  /* #endregion */

  /* #region  PatientInformation Email Address field */
  let PatientInformation_EmailAddress = [...arrAllFields];
  const [emailAddress, setEmailAddress] = useState(
    PatientInformation_EmailAddress[13].strFieldValue
  );
  const handleChangeTextField_PatientInformation_EmailAddress = (e) => {
    setEmailAddress(e.target.value);
    PatientInformation_EmailAddress[13].strFieldValue = e.target.value;
    setArrAllFields(PatientInformation_EmailAddress);
    // console.log(PatientInformation_EmailAddress[13].strFieldValue);
  };
  /* #endregion */

  /* #region  PatientInformation Daytime Mobile field */
  let PatientInformation_DaytimeMobile = [...arrAllFields];
  const [daytime, setDaytime] = useState(
    PatientInformation_DaytimeMobile[14].strFieldValue[0]["Daytime"]
  );
  const [mobile, setMobile] = useState(
    PatientInformation_DaytimeMobile[14].strFieldValue[1]["Mobile"]
  );
  const handleChangeTextField_PatientInformation_DaytimeMobile = (e) => {
    if (e.target.name === "Daytime") {
      setDaytime(e.target.value);
      PatientInformation_DaytimeMobile[14].strFieldValue[0]["Daytime"] =
        e.target.value;
      PatientInformation_DaytimeMobile[14].strFieldValueFormatted[0] =
        e.target.value;
    }
    if (e.target.name === "Mobile") {
      setMobile(e.target.value);
      PatientInformation_DaytimeMobile[14].strFieldValue[1]["Mobile"] =
        e.target.value;
      PatientInformation_DaytimeMobile[14].strFieldValueFormatted[1] =
        e.target.value;
    }
    setArrAllFields(PatientInformation_DaytimeMobile);
    // console.log(PatientInformation_DaytimeMobile[14].strFieldValueFormatted);
  };
  /* #endregion */

  /* #region  PatientInformation Emergency Contact Next Of Kin field */
  let PatientInformation_EmergencyContactNextOfKin = [...arrAllFields];
  const [emergencyContactNextOfKin, setEmergencyContactNextOfKin] = useState(
    PatientInformation_EmergencyContactNextOfKin[15].strFieldValue
  );
  const handleChangeTextField_PatientInformation_EmergencyContactNextOfKin = (
    e
  ) => {
    setEmergencyContactNextOfKin(e.target.value);
    PatientInformation_EmergencyContactNextOfKin[15].strFieldValue =
      e.target.value;
    setArrAllFields(PatientInformation_EmergencyContactNextOfKin);
    // console.log(PatientInformation_EmergencyContactNextOfKin[15].strFieldValue);
  };
  /* #endregion */

  /* #region  PatientInformation Translator field */
  let PatientInformation_Translator = [...arrAllFields];
  const [languageRequired, setLanguageRequired] = useState(
    PatientInformation_Translator[16].strFieldAdditionalText
  );
  const handleChangeTextField_PatientInformation_Translator = (e) => {
    setLanguageRequired(e.target.value);
    PatientInformation_Translator[16].strFieldAdditionalText = e.target.value;
    if (PatientInformation_Translator[16].strFieldValue === true) {
      PatientInformation_Translator[16].strFieldValueFormatted =
        PatientInformation_Translator[16].strFieldAdditionalText;
    }
    setArrAllFields(PatientInformation_Translator);
    // console.log(PatientInformation_Translator[16].strFieldValueFormatted);
  };
  const handleChangeCheckbox_PatientInformation_Translator = (e) => {
    if (e.target.name === "Language Required") {
      PatientInformation_Translator[16].strFieldValue = e.target.checked;
      PatientInformation_Translator[16].strFieldValueFormatted = e.target
        .checked
        ? PatientInformation_Translator[16].strFieldAdditionalText
        : "";
    }
    setArrAllFields(PatientInformation_Translator);
    // console.log(PatientInformation_Translator[16].strFieldValueFormatted);
  };
  /* #endregion */

  /* #region  Scheduling Urgency field */
  let Scheduling_Urgency = [...arrAllFields];
  const [requestedDate, setRequestedDate] = useState(
    Scheduling_Urgency[17].strFieldAdditionalText
  );
  const handleChangeTextField_Scheduling_Urgency = (e) => {
    setRequestedDate(e.target.value);
    Scheduling_Urgency[17].strFieldAdditionalText = e.target.value;
    if (Scheduling_Urgency[17].strFieldValue === "Elective") {
      Scheduling_Urgency[17].strFieldValueFormatted =
        Scheduling_Urgency[17].strFieldAdditionalText;
    }
    setArrAllFields(Scheduling_Urgency);
    // console.log(Scheduling_Urgency[17].strFieldValueFormatted);
  };
  const handleChangeRadioButton_Scheduling_Urgency = (e) => {
    Scheduling_Urgency[17].strFieldValue = e.target.value;
    if (e.target.value === "Elective") {
      Scheduling_Urgency[17].strFieldValueFormatted =
        Scheduling_Urgency[17].strFieldAdditionalText;
      // handleScheduling_UrgencyEmptySubmit(e.target.value === "");
    } else {
      Scheduling_Urgency[17].strFieldValueFormatted = e.target.value;
    }
    setArrAllFields(Scheduling_Urgency);
    // console.log(Scheduling_Urgency[17].strFieldValueFormatted);
  };

  // submit validation
  const [
    Scheduling_UrgencyEmptySubmit,
    setScheduling_UrgencyEmptySubmit,
  ] = useState(false);
  const handleScheduling_UrgencyEmptySubmit = (bool) => {
    setScheduling_UrgencyEmptySubmit(bool);
  };

  // filling validation
  const validateScheduling_UrgencyInput = (
    Scheduling_UrgencyInput,
    RequestedDate,
    emptySubmit
  ) => {
    return emptySubmit
      ? false
      : Scheduling_UrgencyInput === 2
      ? RequestedDate === ""
        ? false
        : true
      : true;
  };
  /* #endregion */

  /* #region  Scheduling Transport field */
  let Scheduling_Transport = [...arrAllFields];
  const handleChangeCheckbox_Scheduling_Transport = (e) => {
    if (e.target.name === "Ambulatory") {
      Scheduling_Transport[18].strFieldValue[0]["Ambulatory"] =
        e.target.checked;
      Scheduling_Transport[18].strFieldValueFormatted[0] = e.target.checked
        ? "Ambulatory"
        : "";
    }
    if (e.target.name === "Wheelchair") {
      Scheduling_Transport[18].strFieldValue[1]["Wheelchair"] =
        e.target.checked;
      Scheduling_Transport[18].strFieldValueFormatted[1] = e.target.checked
        ? "Wheelchair"
        : "";
    }
    if (e.target.name === "Bed/Stretcher") {
      Scheduling_Transport[18].strFieldValue[2]["Bed/Stretcher"] =
        e.target.checked;
      Scheduling_Transport[18].strFieldValueFormatted[2] = e.target.checked
        ? "Bed/Stretcher"
        : "";
    }
    if (e.target.name === "Lift Required") {
      Scheduling_Transport[18].strFieldValue[3]["Lift Required"] =
        e.target.checked;
      Scheduling_Transport[18].strFieldValueFormatted[3] = e.target.checked
        ? "Lift Required"
        : "";
    }
    setArrAllFields(Scheduling_Transport);
    // console.log(Scheduling_Transport[18].strFieldValueFormatted);
  };
  /* #endregion */

  /* #region  Pregnant field */
  let Pregnant = [...arrAllFields];
  const [LMP, setLMP] = useState(Pregnant[19].strFieldAdditionalText);
  const handleChangeTextField_Pregnant = (e) => {
    setLMP(e.target.value);
    Pregnant[19].strFieldAdditionalText = e.target.value;
    if (Pregnant[19].strFieldValue === "Y") {
      Pregnant[19].strFieldValueFormatted = Pregnant[19].strFieldAdditionalText;
    }
    setArrAllFields(Pregnant);
    // console.log(Pregnant[19].strFieldValueFormatted);
  };
  const handleChangeRadioButton_Pregnant = (e) => {
    Pregnant[19].strFieldValue = e.target.value;
    if (e.target.value === "Y") {
      Pregnant[19].strFieldValueFormatted = Pregnant[19].strFieldAdditionalText;
      // handlePregnantEmptySubmit(e.target.value === "");
    } else {
      Pregnant[19].strFieldValueFormatted = e.target.value;
    }
    setArrAllFields(Pregnant);
    // console.log(Pregnant[19].strFieldValueFormatted);
  };

  // submit validation
  const [PregnantEmptySubmit, setPregnantEmptySubmit] = useState(false);
  const handlePregnantEmptySubmit = (bool) => {
    setPregnantEmptySubmit(bool);
  };

  // filling validation
  const validatePregnantInput = (PregnantInput, specification, emptySubmit) => {
    return emptySubmit
      ? false
      : PregnantInput === 2
      ? specification === ""
        ? false
        : true
      : true;
  };
  /* #endregion */

  /* #region  Claustrophobia field */
  let Claustrophobia = [...arrAllFields];
  const handleChangeRadioButton_Claustrophobia = (e) => {
    Claustrophobia[20].strFieldValue = e.target.value;
    Claustrophobia[20].strFieldValueFormatted = e.target.value;
    setArrAllFields(Claustrophobia);
    // console.log(Claustrophobia[20].strFieldValueFormatted);
  };
  /* #endregion */

  /* #region  Requires Sedation field */
  let RequiresSedation = [...arrAllFields];
  const handleChangeRadioButton_RequiresSedation = (e) => {
    RequiresSedation[21].strFieldValue = e.target.value;
    RequiresSedation[21].strFieldValueFormatted = e.target.value;
    setArrAllFields(RequiresSedation);
    // console.log(RequiresSedation[21].strFieldValueFormatted);
  };
  /* #endregion */

  /* #region  Infection Control Precautions field */
  let InfectionControlPrecautions = [...arrAllFields];
  const [specification2, setspecification2] = useState(
    InfectionControlPrecautions[22].strFieldAdditionalText
  );
  const handleChangeTextField_InfectionControlPrecautions = (e) => {
    setspecification2(e.target.value);
    InfectionControlPrecautions[22].strFieldAdditionalText = e.target.value;
    if (InfectionControlPrecautions[22].strFieldValue === "Y") {
      InfectionControlPrecautions[22].strFieldValueFormatted =
        InfectionControlPrecautions[22].strFieldAdditionalText;
    }
    setArrAllFields(InfectionControlPrecautions);
    // console.log(InfectionControlPrecautions[22].strFieldValueFormatted);
  };
  const handleChangeRadioButton_InfectionControlPrecautions = (e) => {
    InfectionControlPrecautions[22].strFieldValue = e.target.value;
    if (e.target.value === "Y") {
      InfectionControlPrecautions[22].strFieldValueFormatted =
        InfectionControlPrecautions[22].strFieldAdditionalText;
      // handleInfectionControlPrecautionsEmptySubmit(e.target.value === "");
    } else {
      InfectionControlPrecautions[22].strFieldValueFormatted = e.target.value;
    }
    setArrAllFields(InfectionControlPrecautions);
    // console.log(InfectionControlPrecautions[22].strFieldValueFormatted);
  };

  /* #region  ExamInformation Weight field */
  let ExamInformation_Weight = [...arrAllFields];
  const [weight, setWeight] = useState(
    ExamInformation_Weight[23].strFieldValue
  );
  const handleChangeTextField_ExamInformation_Weight = (e) => {
    setWeight(e.target.value);
    ExamInformation_Weight[23].strFieldValue = e.target.value;
    setArrAllFields(ExamInformation_Weight);
    // console.log(ExamInformation_Weight[23].strFieldValue);
  };
  /* #endregion */

  /* #region  ExamInformation Height field */
  let ExamInformation_Height = [...arrAllFields];
  const [height, setHeight] = useState(
    ExamInformation_Height[24].strFieldValue
  );
  const handleChangeTextField_ExamInformation_Height = (e) => {
    setHeight(e.target.value);
    ExamInformation_Height[24].strFieldValue = e.target.value;
    setArrAllFields(ExamInformation_Height);
    // console.log(ExamInformation_Height[24].strFieldValue);
  };
  /* #endregion */

  /* #region  ExamInformation Allergies Related To Imaging field */
  let ExamInformation_AllergiesRelatedToImaging = [...arrAllFields];
  const [allergies, setAllergies] = useState(
    ExamInformation_AllergiesRelatedToImaging[25].strFieldValue
  );
  const handleChangeTextField_ExamInformation_AllergiesRelatedToImaging = (
    e
  ) => {
    setAllergies(e.target.value);
    ExamInformation_AllergiesRelatedToImaging[25].strFieldValue =
      e.target.value;
    setArrAllFields(ExamInformation_AllergiesRelatedToImaging);
    // console.log(ExamInformation_AllergiesRelatedToImaging[25].strFieldValue);
  };
  /* #endregion */

  /* #region  ExamInformation Pediatric Patients field */
  let ExamInformation_PediatricPatients = [...arrAllFields];
  const [
    headCircumferencePercentile,
    setHeadCircumferencePercentile,
  ] = useState(ExamInformation_PediatricPatients[26].strFieldValue);
  const handleChangeTextField_ExamInformation_PediatricPatients = (e) => {
    setHeadCircumferencePercentile(e.target.value);
    ExamInformation_PediatricPatients[26].strFieldValue = e.target.value;
    setArrAllFields(ExamInformation_PediatricPatients);
    // console.log(ExamInformation_PediatricPatients[26].strFieldValue);
  };
  /* #endregion */

  /* #region  ExamInformation Anatomical Location Examination Requested field */
  let ExamInformation_AnatomicalLocationExaminationRequested = [
    ...arrAllFields,
  ];
  const [anatomicalLocation, setAnatomicalLocation] = useState(
    ExamInformation_AnatomicalLocationExaminationRequested[27].strFieldValue
  );
  const handleChangeTextField_ExamInformation_AnatomicalLocationExaminationRequested = (
    e
  ) => {
    setAnatomicalLocation(e.target.value);
    ExamInformation_AnatomicalLocationExaminationRequested[27].strFieldValue =
      e.target.value;
    setArrAllFields(ExamInformation_AnatomicalLocationExaminationRequested);
    // console.log(
    //   ExamInformation_AnatomicalLocationExaminationRequested[27].strFieldValue
    // );
  };
  /* #endregion */

  /* #region  ExamInformation Previous Relevant Exams field */
  let ExamInformation_PreviousRelevantExams = [...arrAllFields];
  const [previousRelevantExams, setPreviousRelevantExams] = useState(
    ExamInformation_PreviousRelevantExams[28].strFieldValue
  );
  const handleChangeTextField_ExamInformation_PreviousRelevantExams = (e) => {
    setPreviousRelevantExams(e.target.value);
    ExamInformation_PreviousRelevantExams[28].strFieldValue = e.target.value;
    setArrAllFields(ExamInformation_PreviousRelevantExams);
    // console.log(ExamInformation_PreviousRelevantExams[28].strFieldValue);
  };
  /* #endregion */

  /* #region  Relevant Clinical Surgical History field */
  let RelevantClinicalSurgicalHistory = [...arrAllFields];
  const [
    relevantClinicalSurgicalHistory,
    setRelevantClinicalSurgicalHistory,
  ] = useState(
    RelevantClinicalSurgicalHistory[29].strFieldValue[2][
      "relevantClinicalSurgicalHistory"
    ]
  );
  const handleChangeTextField_RelevantClinicalSurgicalHistory = (e) => {
    setRelevantClinicalSurgicalHistory(e.target.value);
    RelevantClinicalSurgicalHistory[29].strFieldValue[2][
      "relevantClinicalSurgicalHistory"
    ] = e.target.value;
    RelevantClinicalSurgicalHistory[29].strFieldValueFormatted[2] =
      e.target.value;

    setArrAllFields(RelevantClinicalSurgicalHistory);
    // console.log(RelevantClinicalSurgicalHistory[29].strFieldValueFormatted);
  };
  const handleChangeCheckbox_RelevantClinicalSurgicalHistory = (e) => {
    if (e.target.name === "Cancer Care Pathway") {
      RelevantClinicalSurgicalHistory[29].strFieldValue[0][
        "Cancer Care Pathway"
      ] = e.target.checked;
      RelevantClinicalSurgicalHistory[29].strFieldValueFormatted[0] = e.target
        .checked
        ? "Cancer Care Pathway"
        : "";
    }
    if (e.target.name === "Previous Back Surgery") {
      RelevantClinicalSurgicalHistory[29].strFieldValue[1][
        "Previous Back Surgery"
      ] = e.target.checked;
      RelevantClinicalSurgicalHistory[29].strFieldValueFormatted[1] = e.target
        .checked
        ? "Previous Back Surgery"
        : "";
    }
    setArrAllFields(RelevantClinicalSurgicalHistory);
    // console.log(RelevantClinicalSurgicalHistory[29].strFieldValueFormatted);
  };
  /* #endregion */

  /* #region  For IV Contrast Exams field */
  let ForIVContrastExams = [...arrAllFields];
  const [SCr, setSCr] = useState(
    ForIVContrastExams[30].strFieldAdditionalText[0]
  );
  const [eGFR, seteGFR] = useState(
    ForIVContrastExams[30].strFieldAdditionalText[1]
  );
  const [Date, setDate] = useState(
    ForIVContrastExams[30].strFieldAdditionalText[2]
  );
  const handleChangeTextField_ForIVContrastExams = (e) => {
    if (e.target.name === "SCr") {
      setSCr(e.target.value);
      ForIVContrastExams[30].strFieldAdditionalText[0] = e.target.value;
      if (ForIVContrastExams[30].strFieldValue === "Y") {
        ForIVContrastExams[30].strFieldValueFormatted[0] =
          ForIVContrastExams[30].strFieldAdditionalText[0];
      }
    }
    if (e.target.name === "eGFR") {
      seteGFR(e.target.value);
      ForIVContrastExams[30].strFieldAdditionalText[1] = e.target.value;
      if (ForIVContrastExams[30].strFieldValue === "Y") {
        ForIVContrastExams[30].strFieldValueFormatted[1] =
          ForIVContrastExams[30].strFieldAdditionalText[1];
      }
    }
    if (e.target.name === "Date") {
      setDate(e.target.value);
      ForIVContrastExams[30].strFieldAdditionalText[2] = e.target.value;
      if (ForIVContrastExams[30].strFieldValue === "Y") {
        ForIVContrastExams[30].strFieldValueFormatted[2] =
          ForIVContrastExams[30].strFieldAdditionalText[2];
      }
    }
    setArrAllFields(ForIVContrastExams);
    // console.log(ForIVContrastExams[30].strFieldValueFormatted);
  };
  const handleChangeRadioButton_ForIVContrastExams2 = (e) => {
    ForIVContrastExams[30].strFieldValue2 = e.target.value;
    if (e.target.value === "Y") {
      ForIVContrastExams[30].strFieldAdditionalText[3] = "PICC/ CVC/ Port";
      ForIVContrastExams[30].strFieldValueFormatted[3] =
        ForIVContrastExams[30].strFieldAdditionalText[3];
      // handleForIVContrastExamsEmptySubmit(e.target.value === "");
    } else {
      ForIVContrastExams[30].strFieldAdditionalText[3] = "Not PICC/ CVC/ Port";
      ForIVContrastExams[30].strFieldValueFormatted[3] =
        ForIVContrastExams[30].strFieldAdditionalText[3];
    }
    setArrAllFields(ForIVContrastExams);
    // console.log(ForIVContrastExams[30].strFieldValueFormatted);
  };
  const handleChangeRadioButton_ForIVContrastExams = (e) => {
    ForIVContrastExams[30].strFieldValue = e.target.value;
    if (e.target.value === "Y") {
      ForIVContrastExams[30].strFieldValueFormatted =
        ForIVContrastExams[30].strFieldAdditionalText;
      // handleForIVContrastExamsEmptySubmit(e.target.value === "");
    } else {
      ForIVContrastExams[30].strFieldValueFormatted = ["", "", "", ""];
    }
    setArrAllFields(ForIVContrastExams);
    // console.log(ForIVContrastExams[30].strFieldValueFormatted);
  };

  /* #region  Pre-appointment Screening Pacemaker Defibrillator field */
  let PreAppointmentScreening_PacemakerDefibrillator = [...arrAllFields];
  const handleChangeRadioButton_PreAppointmentScreening_PacemakerDefibrillator = (
    e
  ) => {
    PreAppointmentScreening_PacemakerDefibrillator[31].strFieldValue =
      e.target.value;
    PreAppointmentScreening_PacemakerDefibrillator[31].strFieldValueFormatted =
      e.target.value;
    setArrAllFields(PreAppointmentScreening_PacemakerDefibrillator);
    // console.log(
    //   PreAppointmentScreening_PacemakerDefibrillator[31].strFieldValueFormatted
    // );
  };
  /* #endregion */

  /* #region  Pre-appointment Screening Drug Infusion Pump field */
  let PreAppointmentScreening_DrugInfusionPump = [...arrAllFields];
  const handleChangeRadioButton_PreAppointmentScreening_DrugInfusionPump = (
    e
  ) => {
    PreAppointmentScreening_DrugInfusionPump[32].strFieldValue = e.target.value;
    PreAppointmentScreening_DrugInfusionPump[32].strFieldValueFormatted =
      e.target.value;
    setArrAllFields(PreAppointmentScreening_DrugInfusionPump);
    // console.log(
    //   PreAppointmentScreening_DrugInfusionPump[32].strFieldValueFormatted
    // );
  };
  /* #endregion */

  /* #region  Pre-appointment Screening Neuro Or Spinal Cord Stimulator field */
  let PreAppointmentScreening_NeuroOrSpinalCordStimulator = [...arrAllFields];
  const handleChangeRadioButton_PreAppointmentScreening_NeuroOrSpinalCordStimulator = (
    e
  ) => {
    PreAppointmentScreening_NeuroOrSpinalCordStimulator[33].strFieldValue =
      e.target.value;
    PreAppointmentScreening_NeuroOrSpinalCordStimulator[33].strFieldValueFormatted =
      e.target.value;
    setArrAllFields(PreAppointmentScreening_NeuroOrSpinalCordStimulator);
    // console.log(
    //   PreAppointmentScreening_NeuroOrSpinalCordStimulator[33]
    //     .strFieldValueFormatted
    // );
  };
  /* #endregion */

  /* #region  Pre-appointment Screening Surgical Implants field */
  let PreAppointmentScreening_SurgicalImplants = [...arrAllFields];
  const handleChangeRadioButton_PreAppointmentScreening_SurgicalImplants = (
    e
  ) => {
    PreAppointmentScreening_SurgicalImplants[34].strFieldValue = e.target.value;
    PreAppointmentScreening_SurgicalImplants[34].strFieldValueFormatted =
      e.target.value;
    setArrAllFields(PreAppointmentScreening_SurgicalImplants);
    // console.log(
    //   PreAppointmentScreening_SurgicalImplants[34].strFieldValueFormatted
    // );
  };
  /* #endregion */

  /* #region  Pre-appointment Screening Loop Recorder field */
  let PreAppointmentScreening_LoopRecorder = [...arrAllFields];
  const handleChangeRadioButton_PreAppointmentScreening_LoopRecorder = (e) => {
    PreAppointmentScreening_LoopRecorder[35].strFieldValue = e.target.value;
    PreAppointmentScreening_LoopRecorder[35].strFieldValueFormatted =
      e.target.value;
    setArrAllFields(PreAppointmentScreening_LoopRecorder);
    // console.log(
    //   PreAppointmentScreening_LoopRecorder[35].strFieldValueFormatted
    // );
  };
  /* #endregion */

  /* #region  Pre-appointment Screening Welder Work With Metal Any Metal In Eyes field */
  let PreAppointmentScreening_WelderWorkWithMetalAnyMetalInEyes = [
    ...arrAllFields,
  ];
  const handleChangeRadioButton_PreAppointmentScreening_WelderWorkWithMetalAnyMetalInEyes = (
    e
  ) => {
    PreAppointmentScreening_WelderWorkWithMetalAnyMetalInEyes[36].strFieldValue =
      e.target.value;
    PreAppointmentScreening_WelderWorkWithMetalAnyMetalInEyes[36].strFieldValueFormatted =
      e.target.value;
    setArrAllFields(PreAppointmentScreening_WelderWorkWithMetalAnyMetalInEyes);
    // console.log(
    //   PreAppointmentScreening_WelderWorkWithMetalAnyMetalInEyes[36]
    //     .strFieldValueFormatted
    // );
  };
  /* #endregion */

  /* #region  Pre-appointment Screening STRATA valve field */
  let PreAppointmentScreening_STRATAValve = [...arrAllFields];
  const handleChangeRadioButton_PreAppointmentScreening_STRATAValve = (e) => {
    PreAppointmentScreening_STRATAValve[37].strFieldValue = e.target.value;
    PreAppointmentScreening_STRATAValve[37].strFieldValueFormatted =
      e.target.value;
    setArrAllFields(PreAppointmentScreening_STRATAValve);
    // console.log(PreAppointmentScreening_STRATAValve[37].strFieldValueFormatted);
  };
  /* #endregion */

  /* #region  Pre-appointment Screening Bullet Shrapnel Or Other Metal Foreign Body field */
  let PreAppointmentScreening_BulletShrapnelOrOtherMetalForeignBody = [
    ...arrAllFields,
  ];
  const handleChangeRadioButton_PreAppointmentScreening_BulletShrapnelOrOtherMetalForeignBody = (
    e
  ) => {
    PreAppointmentScreening_BulletShrapnelOrOtherMetalForeignBody[38].strFieldValue =
      e.target.value;
    PreAppointmentScreening_BulletShrapnelOrOtherMetalForeignBody[38].strFieldValueFormatted =
      e.target.value;
    setArrAllFields(
      PreAppointmentScreening_BulletShrapnelOrOtherMetalForeignBody
    );
    // console.log(
    //   PreAppointmentScreening_BulletShrapnelOrOtherMetalForeignBody[38]
    //     .strFieldValueFormatted
    // );
  };
  /* #endregion */

  /* #region  Pre-appointment Screening Cochlear Implant field */
  let PreAppointmentScreening_CochlearImplant = [...arrAllFields];
  const handleChangeRadioButton_PreAppointmentScreening_CochlearImplant = (
    e
  ) => {
    PreAppointmentScreening_CochlearImplant[39].strFieldValue = e.target.value;
    PreAppointmentScreening_CochlearImplant[39].strFieldValueFormatted =
      e.target.value;
    setArrAllFields(PreAppointmentScreening_CochlearImplant);
    // console.log(
    //   PreAppointmentScreening_CochlearImplant[39].strFieldValueFormatted
    // );
  };
  /* #endregion */

  /* #region  Pre-appointment Screening Other field */
  let PreAppointmentScreening_Other = [...arrAllFields];
  const [other, setOther] = useState(
    PreAppointmentScreening_Other[40].strFieldAdditionalText
  );
  const handleChangeTextField_PreAppointmentScreening_Other = (e) => {
    setOther(e.target.value);
    PreAppointmentScreening_Other[40].strFieldAdditionalText = e.target.value;
    if (PreAppointmentScreening_Other[40].strFieldValue === "Y") {
      PreAppointmentScreening_Other[40].strFieldValueFormatted =
        PreAppointmentScreening_Other[40].strFieldAdditionalText;
    }
    setArrAllFields(PreAppointmentScreening_Other);
    // console.log(PreAppointmentScreening_Other[40].strFieldValueFormatted);
  };
  const handleChangeRadioButton_PreAppointmentScreening_Other = (e) => {
    PreAppointmentScreening_Other[40].strFieldValue = e.target.value;
    if (e.target.value === "Y") {
      PreAppointmentScreening_Other[40].strFieldValueFormatted =
        PreAppointmentScreening_Other[40].strFieldAdditionalText;
      // handlePreAppointmentScreening_OtherEmptySubmit(e.target.value === "");
    } else {
      PreAppointmentScreening_Other[40].strFieldValueFormatted = e.target.value;
    }
    setArrAllFields(PreAppointmentScreening_Other);
    // console.log(PreAppointmentScreening_Other[40].strFieldValueFormatted);
  };

  // submit validation
  const [
    PreAppointmentScreening_OtherEmptySubmit,
    setPreAppointmentScreening_OtherEmptySubmit,
  ] = useState(false);
  const handlePreAppointmentScreening_OtherEmptySubmit = (bool) => {
    setPreAppointmentScreening_OtherEmptySubmit(bool);
  };

  // filling validation
  const validatePreAppointmentScreening_OtherInput = (
    PreAppointmentScreening_OtherInput,
    specification,
    emptySubmit
  ) => {
    return emptySubmit
      ? false
      : PreAppointmentScreening_OtherInput === 2
      ? specification === ""
        ? false
        : true
      : true;
  };
  /* #endregion */

  /* #region  Ordering Clinician Clinician Signature field */
  let OrderingClinician_ClinicianSignature = [...arrAllFields];
  const [clinicianSignature, setClinicianSignature] = useState(
    OrderingClinician_ClinicianSignature[41].strFieldValue
  );
  const handleChangeTextField_OrderingClinician_ClinicianSignature = (e) => {
    setClinicianSignature(e.target.value);
    OrderingClinician_ClinicianSignature[41].strFieldValue = e.target.value;
    setArrAllFields(OrderingClinician_ClinicianSignature);
    // console.log(OrderingClinician_ClinicianSignature[41].strFieldValue);
  };
  /* #endregion */

  /* #region  Ordering Clinician Clinician Name field */
  let OrderingClinician_ClinicianName = [...arrAllFields];
  const [clinicianName, setClinicianName] = useState(
    OrderingClinician_ClinicianName[42].strFieldValue
  );
  const handleChangeTextField_OrderingClinician_ClinicianName = (e) => {
    setClinicianName(e.target.value);
    OrderingClinician_ClinicianName[42].strFieldValue = e.target.value;
    setArrAllFields(OrderingClinician_ClinicianName);
    // console.log(OrderingClinician_ClinicianName[42].strFieldValue);
  };
  /* #endregion */

  /* #region  Ordering Clinician Billing field */
  let OrderingClinician_Billing = [...arrAllFields];
  const [billing, setBilling] = useState(
    OrderingClinician_Billing[43].strFieldValue
  );
  const handleChangeTextField_OrderingClinician_Billing = (e) => {
    setBilling(e.target.value);
    OrderingClinician_Billing[43].strFieldValue = e.target.value;
    setArrAllFields(OrderingClinician_Billing);
    // console.log(OrderingClinician_Billing[43].strFieldValue);
  };
  /* #endregion */

  /* #region  Ordering Clinician Fax field */
  let OrderingClinician_Fax = [...arrAllFields];
  const [fax, setFax] = useState(OrderingClinician_Fax[44].strFieldValue);
  const handleChangeTextField_OrderingClinician_Fax = (e) => {
    setFax(e.target.value);
    OrderingClinician_Fax[44].strFieldValue = e.target.value;
    setArrAllFields(OrderingClinician_Fax);
    // console.log(OrderingClinician_Fax[44].strFieldValue);
  };
  /* #endregion */

  /* #region  Ordering Clinician 24hr Critical Results Contact field */
  let OrderingClinician_24hrCriticalResultsContact = [...arrAllFields];
  const [_24hrCriticalResultsContact, set24hrCriticalResultsContact] = useState(
    OrderingClinician_24hrCriticalResultsContact[45].strFieldValue
  );
  const handleChangeTextField_OrderingClinician_24hrCriticalResultsContact = (
    e
  ) => {
    set24hrCriticalResultsContact(e.target.value);
    OrderingClinician_24hrCriticalResultsContact[45].strFieldValue =
      e.target.value;
    setArrAllFields(OrderingClinician_24hrCriticalResultsContact);
    // console.log(OrderingClinician_24hrCriticalResultsContact[45].strFieldValue);
  };
  /* #endregion */

  /* #region  Ordering Clinician Address field */
  let OrderingClinician_Address = [...arrAllFields];
  const [address, setAddress] = useState(
    OrderingClinician_Address[46].strFieldValue
  );
  const handleChangeTextField_OrderingClinician_Address = (e) => {
    setAddress(e.target.value);
    OrderingClinician_Address[46].strFieldValue = e.target.value;
    setArrAllFields(OrderingClinician_Address);
    // console.log(OrderingClinician_Address[46].strFieldValue);
  };
  /* #endregion */

  /* #region  Ordering Clinician Phone field */
  let OrderingClinician_Phone = [...arrAllFields];
  const [phone, setPhone] = useState(OrderingClinician_Phone[47].strFieldValue);
  const handleChangeTextField_OrderingClinician_Phone = (e) => {
    setPhone(e.target.value);
    OrderingClinician_Phone[47].strFieldValue = e.target.value;
    setArrAllFields(OrderingClinician_Phone);
    // console.log(OrderingClinician_Phone[47].strFieldValue);
  };
  /* #endregion */

  /* #region  Ordering Clinician Date Ordered field */
  let OrderingClinician_DateOrdered = [...arrAllFields];
  const [dateOrdered, setDateOrdered] = useState(
    OrderingClinician_DateOrdered[48].strFieldValue
  );
  const handleChangeTextField_OrderingClinician_DateOrdered = (e) => {
    setDateOrdered(e.target.value);
    OrderingClinician_DateOrdered[48].strFieldValue = e.target.value;
    setArrAllFields(OrderingClinician_DateOrdered);
    // console.log(OrderingClinician_DateOrdered[48].strFieldValue);
  };
  /* #endregion */

  /* #region  Ordering Clinician Time Ordered field */
  let OrderingClinician_TimeOrdered = [...arrAllFields];
  const [timeOrdered, setTimeOrdered] = useState(
    OrderingClinician_TimeOrdered[49].strFieldValue
  );
  const handleChangeTextField_OrderingClinician_TimeOrdered = (e) => {
    setTimeOrdered(e.target.value);
    OrderingClinician_TimeOrdered[49].strFieldValue = e.target.value;
    setArrAllFields(OrderingClinician_TimeOrdered);
    // console.log(OrderingClinician_TimeOrdered[49].strFieldValue);
  };
  /* #endregion */

  /* #region  Ordering Clinician Copy To Clinician Name field */
  let OrderingClinician_CopyToClinicianName = [...arrAllFields];
  const [copyToClinicianName, setCopyToClinicianName] = useState(
    OrderingClinician_CopyToClinicianName[50].strFieldValue
  );
  const handleChangeTextField_OrderingClinician_CopyToClinicianName = (e) => {
    setCopyToClinicianName(e.target.value);
    OrderingClinician_CopyToClinicianName[50].strFieldValue = e.target.value;
    setArrAllFields(OrderingClinician_CopyToClinicianName);
    // console.log(OrderingClinician_CopyToClinicianName[50].strFieldValue);
  };
  /* #endregion */

  /* #region  Ordering Clinician Copy To Location field */
  let OrderingClinician_CopyToLocation = [...arrAllFields];
  const [copyToLocation, setCopyToLocation] = useState(
    OrderingClinician_CopyToLocation[51].strFieldValue
  );
  const handleChangeTextField_OrderingClinician_CopyToLocation = (e) => {
    setCopyToLocation(e.target.value);
    OrderingClinician_CopyToLocation[51].strFieldValue = e.target.value;
    setArrAllFields(OrderingClinician_CopyToLocation);
    // console.log(OrderingClinician_CopyToLocation[51].strFieldValue);
  };
  /* #endregion */

  /* #region  Ordering Clinician Copy To Phone field */
  let OrderingClinician_CopyToPhone = [...arrAllFields];
  const [copyToPhone, setCopyToPhone] = useState(
    OrderingClinician_CopyToPhone[52].strFieldValue
  );
  const handleChangeTextField_OrderingClinician_CopyToPhone = (e) => {
    setCopyToPhone(e.target.value);
    OrderingClinician_CopyToPhone[52].strFieldValue = e.target.value;
    setArrAllFields(OrderingClinician_CopyToPhone);
    // console.log(OrderingClinician_CopyToPhone[52].strFieldValue);
  };
  /* #endregion */

  /* #region  Ordering Clinician Copy To Fax field */
  let OrderingClinician_CopyToFax = [...arrAllFields];
  const [copyToFax, setCopyToFax] = useState(
    OrderingClinician_CopyToFax[53].strFieldValue
  );
  const handleChangeTextField_OrderingClinician_CopyToFax = (e) => {
    setCopyToFax(e.target.value);
    OrderingClinician_CopyToFax[53].strFieldValue = e.target.value;
    setArrAllFields(OrderingClinician_CopyToFax);
    // console.log(OrderingClinician_CopyToFax[53].strFieldValue);
  };
  /* #endregion */

  /* #region  Change field rules - shared function */
  const handleChangeFieldRules = (e) => {
    let currentField;
    let savingField;
    if (e.target.id === "Outpatient") {
      currentField = Outpatient[0].objFieldRules;
      savingField = Outpatient;
    }
    if (e.target.id === "EDOutpatientFollowUpWith") {
      currentField = EDOutpatientFollowUpWith[1].objFieldRules;
      savingField = EDOutpatientFollowUpWith;
    }
    if (e.target.id === "EDOutpatientFollowUpWith_PatientContact") {
      currentField = EDOutpatientFollowUpWith_PatientContact[2].objFieldRules;
      savingField = EDOutpatientFollowUpWith_PatientContact;
    }
    if (e.target.id === "EDOutpatientFollowUpWith_PatientName") {
      currentField = EDOutpatientFollowUpWith_PatientName[3].objFieldRules;
      savingField = EDOutpatientFollowUpWith_PatientName;
    }
    if (e.target.id === "InpatientED") {
      currentField = InpatientED[4].objFieldRules;
      savingField = InpatientED;
    }
    if (e.target.id === "PatientInformation_LastNameFirstName") {
      currentField = PatientInformation_LastNameFirstName[5].objFieldRules;
      savingField = PatientInformation_LastNameFirstName;
    }
    if (e.target.id === "PatientInformation_DOB") {
      currentField = PatientInformation_DOB[6].objFieldRules;
      savingField = PatientInformation_DOB;
    }
    if (e.target.id === "PatientInformation_Age") {
      currentField = PatientInformation_Age[7].objFieldRules;
      savingField = PatientInformation_Age;
    }
    if (e.target.id === "PatientInformation_Sex") {
      currentField = PatientInformation_Sex[8].objFieldRules;
      savingField = PatientInformation_Sex;
    }
    if (e.target.id === "PatientInformation_MHSC") {
      currentField = PatientInformation_MHSC[9].objFieldRules;
      savingField = PatientInformation_MHSC;
    }
    if (e.target.id === "PatientInformation_PHIN") {
      currentField = PatientInformation_PHIN[10].objFieldRules;
      savingField = PatientInformation_PHIN;
    }
    if (e.target.id === "PatientInformation_OtherInsuranceWCB") {
      currentField = PatientInformation_OtherInsuranceWCB[11].objFieldRules;
      savingField = PatientInformation_OtherInsuranceWCB;
    }
    if (e.target.id === "PatientInformation_FullAddress") {
      currentField = PatientInformation_FullAddress[12].objFieldRules;
      savingField = PatientInformation_FullAddress;
    }
    if (e.target.id === "PatientInformation_EmailAddress") {
      currentField = PatientInformation_EmailAddress[13].objFieldRules;
      savingField = PatientInformation_EmailAddress;
    }
    if (e.target.id === "PatientInformation_DaytimeMobile") {
      currentField = PatientInformation_DaytimeMobile[14].objFieldRules;
      savingField = PatientInformation_DaytimeMobile;
    }
    if (e.target.id === "PatientInformation_EmergencyContactNextOfKin") {
      currentField =
        PatientInformation_EmergencyContactNextOfKin[15].objFieldRules;
      savingField = PatientInformation_EmergencyContactNextOfKin;
    }
    if (e.target.id === "PatientInformation_Translator") {
      currentField = PatientInformation_Translator[16].objFieldRules;
      savingField = PatientInformation_Translator;
    }
    if (e.target.id === "Scheduling_Urgency") {
      currentField = Scheduling_Urgency[17].objFieldRules;
      savingField = Scheduling_Urgency;
    }
    if (e.target.id === "Scheduling_Transport") {
      currentField = Scheduling_Transport[18].objFieldRules;
      savingField = Scheduling_Transport;
    }
    if (e.target.id === "Pregnant") {
      currentField = Pregnant[19].objFieldRules;
      savingField = Pregnant;
    }
    if (e.target.id === "Claustrophobia") {
      currentField = Claustrophobia[20].objFieldRules;
      savingField = Claustrophobia;
    }
    if (e.target.id === "RequiresSedation") {
      currentField = RequiresSedation[21].objFieldRules;
      savingField = RequiresSedation;
    }
    if (e.target.id === "InfectionControlPrecautions") {
      currentField = InfectionControlPrecautions[22].objFieldRules;
      savingField = InfectionControlPrecautions;
    }
    if (e.target.id === "ExamInformation_Weight") {
      currentField = ExamInformation_Weight[23].objFieldRules;
      savingField = ExamInformation_Weight;
    }
    if (e.target.id === "ExamInformation_Height") {
      currentField = ExamInformation_Height[24].objFieldRules;
      savingField = ExamInformation_Height;
    }
    if (e.target.id === "ExamInformation_AllergiesRelatedToImaging") {
      currentField =
        ExamInformation_AllergiesRelatedToImaging[25].objFieldRules;
      savingField = ExamInformation_AllergiesRelatedToImaging;
    }
    if (e.target.id === "ExamInformation_PediatricPatients") {
      currentField = ExamInformation_PediatricPatients[26].objFieldRules;
      savingField = ExamInformation_PediatricPatients;
    }
    if (
      e.target.id === "ExamInformation_AnatomicalLocationExaminationRequested"
    ) {
      currentField =
        ExamInformation_AnatomicalLocationExaminationRequested[27]
          .objFieldRules;
      savingField = ExamInformation_AnatomicalLocationExaminationRequested;
    }
    if (e.target.id === "ExamInformation_PreviousRelevantExams") {
      currentField = ExamInformation_PreviousRelevantExams[28].objFieldRules;
      savingField = ExamInformation_PreviousRelevantExams;
    }
    if (e.target.id === "RelevantClinicalSurgicalHistory") {
      currentField = RelevantClinicalSurgicalHistory[29].objFieldRules;
      savingField = RelevantClinicalSurgicalHistory;
    }
    if (e.target.id === "ForIVContrastExams") {
      currentField = ForIVContrastExams[30].objFieldRules;
      savingField = ForIVContrastExams;
    }
    if (e.target.id === "PreAppointmentScreening_PacemakerDefibrillator") {
      currentField =
        PreAppointmentScreening_PacemakerDefibrillator[31].objFieldRules;
      savingField = PreAppointmentScreening_PacemakerDefibrillator;
    }
    if (e.target.id === "PreAppointmentScreening_DrugInfusionPump") {
      currentField = PreAppointmentScreening_DrugInfusionPump[32].objFieldRules;
      savingField = PreAppointmentScreening_DrugInfusionPump;
    }
    if (e.target.id === "PreAppointmentScreening_NeuroOrSpinalCordStimulator") {
      currentField =
        PreAppointmentScreening_NeuroOrSpinalCordStimulator[33].objFieldRules;
      savingField = PreAppointmentScreening_NeuroOrSpinalCordStimulator;
    }
    if (e.target.id === "PreAppointmentScreening_SurgicalImplants") {
      currentField = PreAppointmentScreening_SurgicalImplants[34].objFieldRules;
      savingField = PreAppointmentScreening_SurgicalImplants;
    }
    if (e.target.id === "PreAppointmentScreening_LoopRecorder") {
      currentField = PreAppointmentScreening_LoopRecorder[35].objFieldRules;
      savingField = PreAppointmentScreening_LoopRecorder;
    }
    if (
      e.target.id ===
      "PreAppointmentScreening_WelderWorkWithMetalAnyMetalInEyes"
    ) {
      currentField =
        PreAppointmentScreening_WelderWorkWithMetalAnyMetalInEyes[36]
          .objFieldRules;
      savingField = PreAppointmentScreening_WelderWorkWithMetalAnyMetalInEyes;
    }
    if (e.target.id === "PreAppointmentScreening_STRATAValve") {
      currentField = PreAppointmentScreening_STRATAValve[37].objFieldRules;
      savingField = PreAppointmentScreening_STRATAValve;
    }
    if (
      e.target.id ===
      "PreAppointmentScreening_BulletShrapnelOrOtherMetalForeignBody"
    ) {
      currentField =
        PreAppointmentScreening_BulletShrapnelOrOtherMetalForeignBody[38]
          .objFieldRules;
      savingField = PreAppointmentScreening_BulletShrapnelOrOtherMetalForeignBody;
    }
    if (e.target.id === "PreAppointmentScreening_CochlearImplant") {
      currentField = PreAppointmentScreening_CochlearImplant[39].objFieldRules;
      savingField = PreAppointmentScreening_CochlearImplant;
    }
    if (e.target.id === "PreAppointmentScreening_Other") {
      currentField = PreAppointmentScreening_Other[40].objFieldRules;
      savingField = PreAppointmentScreening_Other;
    }
    if (e.target.id === "OrderingClinician_ClinicianSignature") {
      currentField = OrderingClinician_ClinicianSignature[41].objFieldRules;
      savingField = OrderingClinician_ClinicianSignature;
    }
    if (e.target.id === "OrderingClinician_ClinicianName") {
      currentField = OrderingClinician_ClinicianName[42].objFieldRules;
      savingField = OrderingClinician_ClinicianName;
    }
    if (e.target.id === "OrderingClinician_Billing") {
      currentField = OrderingClinician_Billing[43].objFieldRules;
      savingField = OrderingClinician_Billing;
    }
    if (e.target.id === "OrderingClinician_Fax") {
      currentField = OrderingClinician_Fax[44].objFieldRules;
      savingField = OrderingClinician_Fax;
    }
    if (e.target.id === "OrderingClinician_24hrCriticalResultsContact") {
      currentField =
        OrderingClinician_24hrCriticalResultsContact[45].objFieldRules;
      savingField = OrderingClinician_24hrCriticalResultsContact;
    }
    if (e.target.id === "OrderingClinician_Address") {
      currentField = OrderingClinician_Address[46].objFieldRules;
      savingField = OrderingClinician_Address;
    }
    if (e.target.id === "OrderingClinician_Phone") {
      currentField = OrderingClinician_Phone[47].objFieldRules;
      savingField = OrderingClinician_Phone;
    }
    if (e.target.id === "OrderingClinician_DateOrdered") {
      currentField = OrderingClinician_DateOrdered[48].objFieldRules;
      savingField = OrderingClinician_DateOrdered;
    }
    if (e.target.id === "OrderingClinician_TimeOrdered") {
      currentField = OrderingClinician_TimeOrdered[49].objFieldRules;
      savingField = OrderingClinician_TimeOrdered;
    }
    if (e.target.id === "OrderingClinician_CopyToClinicianName") {
      currentField = OrderingClinician_CopyToClinicianName[50].objFieldRules;
      savingField = OrderingClinician_CopyToClinicianName;
    }
    if (e.target.id === "OrderingClinician_CopyToLocation") {
      currentField = OrderingClinician_CopyToLocation[51].objFieldRules;
      savingField = OrderingClinician_CopyToLocation;
    }
    if (e.target.id === "OrderingClinician_CopyToPhone") {
      currentField = OrderingClinician_CopyToPhone[52].objFieldRules;
      savingField = OrderingClinician_CopyToPhone;
    }
    if (e.target.id === "OrderingClinician_CopyToFax") {
      currentField = OrderingClinician_CopyToFax[53].objFieldRules;
      savingField = OrderingClinician_CopyToFax;
    }

    if (e.target.name === "required") {
      currentField.boolRequired = e.target.checked;
    }
    if (e.target.name === "attachmentRequired") {
      currentField.boolAttachmentRequired = e.target.checked;
    }
    if (e.target.name === "bypassAllowed") {
      currentField.boolBypassAllowed = e.target.checked;
    }
    setArrAllFields(savingField);
  };
  /* #endregion */

  return (
    <Grid container style={{ padding: "40px 36px" }}>
      <Grid item xs={5} style={{ borderRight: "1px solid" }}>
        <Grid item>
          <Box pl={1} borderBottom={1}>
            <LogoAndTitle />
          </Box>
        </Grid>
        <Grid item>
          <Box pl={1} borderBottom={1}>
            <FieldRulesDialog
              handleChangeFieldRules={handleChangeFieldRules}
              formEditMode={formEditMode}
              field={Outpatient[0]}
              specification={specification}
              handleChangeRadioButton_Outpatient={
                handleChangeRadioButton_Outpatient
              }
              handleChangeTextField_Outpatient={
                handleChangeTextField_Outpatient
              }
            />
          </Box>
        </Grid>
        <Grid item>
          <Box pl={1}>
            <FieldRulesDialog
              handleChangeFieldRules={handleChangeFieldRules}
              formEditMode={formEditMode}
              field={EDOutpatientFollowUpWith[1]}
              timeOrderPlaced={timeOrderPlaced}
              handleChangeCheckbox_EDOutpatientFollowUpWith={
                handleChangeCheckbox_EDOutpatientFollowUpWith
              }
              handleChangeTextField_EDOutpatientFollowUpWith={
                handleChangeTextField_EDOutpatientFollowUpWith
              }
            />
          </Box>
        </Grid>
        <Grid item>
          <Box pl={1}>
            <FieldRulesDialog
              handleChangeFieldRules={handleChangeFieldRules}
              formEditMode={formEditMode}
              field={EDOutpatientFollowUpWith_PatientContact[2]}
              patientContact={patientContact}
              handleChangeTextField_EDOutpatientFollowUpWith_PatientContact={
                handleChangeTextField_EDOutpatientFollowUpWith_PatientContact
              }
            />
          </Box>
        </Grid>
        <Grid item>
          <Box pl={1} borderBottom={1}>
            <FieldRulesDialog
              handleChangeFieldRules={handleChangeFieldRules}
              formEditMode={formEditMode}
              field={EDOutpatientFollowUpWith_PatientName[3]}
              patientName={patientName}
              handleChangeTextField_EDOutpatientFollowUpWith_PatientName={
                handleChangeTextField_EDOutpatientFollowUpWith_PatientName
              }
            />
          </Box>
        </Grid>
        <Grid item>
          <Box pl={1}>
            <FieldRulesDialog
              handleChangeFieldRules={handleChangeFieldRules}
              formEditMode={formEditMode}
              field={InpatientED[4]}
              site={site}
              wardRoom={wardRoom}
              handleChangeCheckbox_InpatientED={
                handleChangeCheckbox_InpatientED
              }
              handleChangeTextField_InpatientED={
                handleChangeTextField_InpatientED
              }
            />
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={7}>
        <Grid item>
          <Box pr={1} style={{ paddingLeft: "13.4px" }}>
            <PatientInformation_Title />
          </Box>
        </Grid>
        <Grid item xs>
          <Box pr={1} style={{ paddingLeft: "13.4px" }}>
            <FieldRulesDialog
              handleChangeFieldRules={handleChangeFieldRules}
              formEditMode={formEditMode}
              field={PatientInformation_LastNameFirstName[5]}
              lastNameFirstName={lastNameFirstName}
              handleChangeTextField_PatientInformation_LastNameFirstName={
                handleChangeTextField_PatientInformation_LastNameFirstName
              }
            />
          </Box>
        </Grid>
        <Grid item xs>
          <Box
            display="flex"
            alignItems="center"
            pr={1}
            style={{ paddingLeft: "13.4px" }}
          >
            <FieldRulesDialog
              handleChangeFieldRules={handleChangeFieldRules}
              formEditMode={formEditMode}
              field={PatientInformation_DOB[6]}
              DOB={DOB}
              handleChangeTextField_PatientInformation_DOB={
                handleChangeTextField_PatientInformation_DOB
              }
            />
            <FieldRulesDialog
              handleChangeFieldRules={handleChangeFieldRules}
              formEditMode={formEditMode}
              field={PatientInformation_Age[7]}
              age={age}
              handleChangeTextField_PatientInformation_Age={
                handleChangeTextField_PatientInformation_Age
              }
            />
          </Box>
        </Grid>
        <Grid item>
          <Box pr={1} style={{ paddingLeft: "13.4px" }}>
            <FieldRulesDialog
              handleChangeFieldRules={handleChangeFieldRules}
              formEditMode={formEditMode}
              field={PatientInformation_Sex[8]}
              handleChangeRadioButton_PatientInformation_Sex={
                handleChangeRadioButton_PatientInformation_Sex
              }
            />
          </Box>
        </Grid>
        <Grid item>
          <Box pr={1} style={{ paddingLeft: "13.4px" }}>
            <FieldRulesDialog
              handleChangeFieldRules={handleChangeFieldRules}
              formEditMode={formEditMode}
              field={PatientInformation_MHSC[9]}
              MHSC={MHSC}
              handleChangeTextField_PatientInformation_MHSC={
                handleChangeTextField_PatientInformation_MHSC
              }
            />
          </Box>
        </Grid>
        <Grid item>
          <Box pr={1} style={{ paddingLeft: "13.4px" }}>
            <FieldRulesDialog
              handleChangeFieldRules={handleChangeFieldRules}
              formEditMode={formEditMode}
              field={PatientInformation_PHIN[10]}
              PHIN={PHIN}
              handleChangeTextField_PatientInformation_PHIN={
                handleChangeTextField_PatientInformation_PHIN
              }
            />
          </Box>
        </Grid>
        <Grid item xs>
          <Box pr={1} style={{ paddingLeft: "13.4px" }}>
            <FieldRulesDialog
              handleChangeFieldRules={handleChangeFieldRules}
              formEditMode={formEditMode}
              field={PatientInformation_OtherInsuranceWCB[11]}
              WCB={WCB}
              handleChangeRadioButton_PatientInformation_OtherInsuranceWCB={
                handleChangeRadioButton_PatientInformation_OtherInsuranceWCB
              }
              handleChangeTextField_PatientInformation_OtherInsuranceWCB={
                handleChangeTextField_PatientInformation_OtherInsuranceWCB
              }
            />
          </Box>
        </Grid>
        <Grid item xs>
          <Box pr={1} borderBottom={1} style={{ paddingLeft: "13.4px" }}>
            <FieldRulesDialog
              handleChangeFieldRules={handleChangeFieldRules}
              formEditMode={formEditMode}
              field={PatientInformation_FullAddress[12]}
              fullAddress={fullAddress}
              handleChangeTextField_PatientInformation_FullAddress={
                handleChangeTextField_PatientInformation_FullAddress
              }
            />
          </Box>
        </Grid>
        <Grid item xs>
          <Box pr={1} style={{ paddingLeft: "13.4px" }}>
            <FieldRulesDialog
              handleChangeFieldRules={handleChangeFieldRules}
              formEditMode={formEditMode}
              field={PatientInformation_EmailAddress[13]}
              emailAddress={emailAddress}
              handleChangeTextField_PatientInformation_EmailAddress={
                handleChangeTextField_PatientInformation_EmailAddress
              }
            />
          </Box>
        </Grid>
        <Grid item xs>
          <Box pr={1} style={{ paddingLeft: "13.4px" }}>
            <FieldRulesDialog
              handleChangeFieldRules={handleChangeFieldRules}
              formEditMode={formEditMode}
              field={PatientInformation_DaytimeMobile[14]}
              daytime={daytime}
              mobile={mobile}
              handleChangeTextField_PatientInformation_DaytimeMobile={
                handleChangeTextField_PatientInformation_DaytimeMobile
              }
            />
          </Box>
        </Grid>
        <Grid item xs>
          <Box pr={1} style={{ paddingLeft: "13.4px" }}>
            <FieldRulesDialog
              handleChangeFieldRules={handleChangeFieldRules}
              formEditMode={formEditMode}
              field={PatientInformation_EmergencyContactNextOfKin[15]}
              emergencyContactNextOfKin={emergencyContactNextOfKin}
              handleChangeTextField_PatientInformation_EmergencyContactNextOfKin={
                handleChangeTextField_PatientInformation_EmergencyContactNextOfKin
              }
            />
          </Box>
        </Grid>
        <Grid item xs>
          <Box pr={1} style={{ paddingLeft: "13.4px" }}>
            <FieldRulesDialog
              handleChangeFieldRules={handleChangeFieldRules}
              formEditMode={formEditMode}
              field={PatientInformation_Translator[16]}
              languageRequired={languageRequired}
              handleChangeCheckbox_PatientInformation_Translator={
                handleChangeCheckbox_PatientInformation_Translator
              }
              handleChangeTextField_PatientInformation_Translator={
                handleChangeTextField_PatientInformation_Translator
              }
            />
          </Box>
        </Grid>
        <Grid item>
          <Box pr={1} style={{ paddingLeft: "13.4px" }}>
            <PatientInformation_Footer />
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid item xs>
          <Box pl={1} border={1} borderBottom={0}>
            <Scheduling_Title />
          </Box>
        </Grid>
        <Grid item xs>
          <Box pl={1} borderLeft={1} borderRight={1}>
            <FieldRulesDialog
              handleChangeFieldRules={handleChangeFieldRules}
              formEditMode={formEditMode}
              field={Scheduling_Urgency[17]}
              requestedDate={requestedDate}
              handleChangeRadioButton_Scheduling_Urgency={
                handleChangeRadioButton_Scheduling_Urgency
              }
              handleChangeTextField_Scheduling_Urgency={
                handleChangeTextField_Scheduling_Urgency
              }
            />
          </Box>
        </Grid>
        <Grid item xs>
          <Box pl={1} borderLeft={1} borderRight={1} borderBottom={1}>
            <FieldRulesDialog
              handleChangeFieldRules={handleChangeFieldRules}
              formEditMode={formEditMode}
              field={Scheduling_Transport[18]}
              handleChangeCheckbox_Scheduling_Transport={
                handleChangeCheckbox_Scheduling_Transport
              }
            />
          </Box>
        </Grid>
        <Grid item xs>
          <Box
            display="flex"
            alignItems="center"
            borderLeft={1}
            borderRight={1}
          >
            <Box pl={1} borderRight={1}>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={Pregnant[19]}
                LMP={LMP}
                handleChangeRadioButton_Pregnant={
                  handleChangeRadioButton_Pregnant
                }
                handleChangeTextField_Pregnant={handleChangeTextField_Pregnant}
              />
            </Box>
            <Box
              pl={1}
              display="flex"
              alignItems="center"
              // style={{ height: "45px" }}
            >
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={Claustrophobia[20]}
                handleChangeRadioButton_Claustrophobia={
                  handleChangeRadioButton_Claustrophobia
                }
              />
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={RequiresSedation[21]}
                handleChangeRadioButton_RequiresSedation={
                  handleChangeRadioButton_RequiresSedation
                }
              />
            </Box>
            {/* <Box borderLeft={1}>
              <SedationFormRequired />
            </Box> */}
          </Box>
        </Grid>
        <Grid item xs>
          <Box pl={1} display="flex" alignItems="center" border={1}>
            <Box width={1}>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={InfectionControlPrecautions[22]}
                specification2={specification2}
                handleChangeRadioButton_InfectionControlPrecautions={
                  handleChangeRadioButton_InfectionControlPrecautions
                }
                handleChangeTextField_InfectionControlPrecautions={
                  handleChangeTextField_InfectionControlPrecautions
                }
              />
            </Box>
            <Box borderLeft={1}>
              <SedationFormRequired2 />
            </Box>
          </Box>
        </Grid>
        <Grid item xs>
          <Box pl={1} borderLeft={1} borderRight={1} borderBottom={1}>
            <ExamInformation />
          </Box>
        </Grid>
        <Grid item xs>
          <Box
            pl={1}
            display="flex"
            alignItems="center"
            borderLeft={1}
            borderRight={1}
            borderBottom={1}
          >
            <Box
              width={199}
              display="flex"
              flexDirection="column"
              borderRight={1}
            >
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={ExamInformation_Weight[23]}
                weight={weight}
                handleChangeTextField_ExamInformation_Weight={
                  handleChangeTextField_ExamInformation_Weight
                }
              />
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={ExamInformation_Height[24]}
                height={height}
                handleChangeTextField_ExamInformation_Height={
                  handleChangeTextField_ExamInformation_Height
                }
              />
            </Box>
            <Box px={1} width={1} display="flex" flexDirection="column">
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={ExamInformation_AllergiesRelatedToImaging[25]}
                allergies={allergies}
                handleChangeTextField_ExamInformation_AllergiesRelatedToImaging={
                  handleChangeTextField_ExamInformation_AllergiesRelatedToImaging
                }
              />
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={ExamInformation_PediatricPatients[26]}
                headCircumferencePercentile={headCircumferencePercentile}
                handleChangeTextField_ExamInformation_PediatricPatients={
                  handleChangeTextField_ExamInformation_PediatricPatients
                }
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs>
          <Box display="flex" alignItems="center">
            <Box
              px={1}
              width={1}
              borderLeft={1}
              borderRight={1}
              borderBottom={1}
            >
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={
                  ExamInformation_AnatomicalLocationExaminationRequested[27]
                }
                anatomicalLocation={anatomicalLocation}
                handleChangeTextField_ExamInformation_AnatomicalLocationExaminationRequested={
                  handleChangeTextField_ExamInformation_AnatomicalLocationExaminationRequested
                }
              />
            </Box>
            <Box px={1} width={1} borderRight={1} borderBottom={1}>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={ExamInformation_PreviousRelevantExams[28]}
                previousRelevantExams={previousRelevantExams}
                handleChangeTextField_ExamInformation_PreviousRelevantExams={
                  handleChangeTextField_ExamInformation_PreviousRelevantExams
                }
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs>
          <Box borderLeft={1} borderRight={1} borderBottom={1}>
            <FieldRulesDialog
              handleChangeFieldRules={handleChangeFieldRules}
              formEditMode={formEditMode}
              field={RelevantClinicalSurgicalHistory[29]}
              relevantClinicalSurgicalHistory={relevantClinicalSurgicalHistory}
              handleChangeCheckbox_RelevantClinicalSurgicalHistory={
                handleChangeCheckbox_RelevantClinicalSurgicalHistory
              }
              handleChangeTextField_RelevantClinicalSurgicalHistory={
                handleChangeTextField_RelevantClinicalSurgicalHistory
              }
            />
          </Box>
        </Grid>
        <Grid item xs>
          <Box borderLeft={1} borderRight={1} borderBottom={1}>
            <FieldRulesDialog
              handleChangeFieldRules={handleChangeFieldRules}
              formEditMode={formEditMode}
              field={ForIVContrastExams[30]}
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
          </Box>
        </Grid>
        <Grid item xs>
          <Box border={1} borderTop={0}>
            <PreAppointmentScreening_Title />
          </Box>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={5}>
            <Box border={1} borderTop={0}>
              <PreAppointmentScreening_Heading />
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box borderRight={1} borderBottom={1}>
              <PreAppointmentScreening_Heading />
            </Box>
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={5}>
            <Box border={1} borderTop={0}>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={PreAppointmentScreening_PacemakerDefibrillator[31]}
                handleChangeRadioButton_PreAppointmentScreening_PacemakerDefibrillator={
                  handleChangeRadioButton_PreAppointmentScreening_PacemakerDefibrillator
                }
              />
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box borderRight={1} borderBottom={1}>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={PreAppointmentScreening_DrugInfusionPump[32]}
                handleChangeRadioButton_PreAppointmentScreening_DrugInfusionPump={
                  handleChangeRadioButton_PreAppointmentScreening_DrugInfusionPump
                }
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={5}>
            <Box border={1} borderTop={0}>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={PreAppointmentScreening_NeuroOrSpinalCordStimulator[33]}
                handleChangeRadioButton_PreAppointmentScreening_NeuroOrSpinalCordStimulator={
                  handleChangeRadioButton_PreAppointmentScreening_NeuroOrSpinalCordStimulator
                }
              />
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box borderRight={1} borderBottom={1}>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={PreAppointmentScreening_SurgicalImplants[34]}
                handleChangeRadioButton_PreAppointmentScreening_SurgicalImplants={
                  handleChangeRadioButton_PreAppointmentScreening_SurgicalImplants
                }
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={5}>
            <Box border={1} borderTop={0}>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={PreAppointmentScreening_LoopRecorder[35]}
                handleChangeRadioButton_PreAppointmentScreening_LoopRecorder={
                  handleChangeRadioButton_PreAppointmentScreening_LoopRecorder
                }
              />
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box borderRight={1} borderBottom={1}>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={
                  PreAppointmentScreening_WelderWorkWithMetalAnyMetalInEyes[36]
                }
                handleChangeRadioButton_PreAppointmentScreening_WelderWorkWithMetalAnyMetalInEyes={
                  handleChangeRadioButton_PreAppointmentScreening_WelderWorkWithMetalAnyMetalInEyes
                }
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={5}>
            <Box border={1} borderTop={0}>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={PreAppointmentScreening_STRATAValve[37]}
                handleChangeRadioButton_PreAppointmentScreening_STRATAValve={
                  handleChangeRadioButton_PreAppointmentScreening_STRATAValve
                }
              />
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box borderRight={1} borderBottom={1}>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={
                  PreAppointmentScreening_BulletShrapnelOrOtherMetalForeignBody[38]
                }
                handleChangeRadioButton_PreAppointmentScreening_BulletShrapnelOrOtherMetalForeignBody={
                  handleChangeRadioButton_PreAppointmentScreening_BulletShrapnelOrOtherMetalForeignBody
                }
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={5}>
            <Box border={1} borderTop={0}>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={PreAppointmentScreening_CochlearImplant[39]}
                handleChangeRadioButton_PreAppointmentScreening_CochlearImplant={
                  handleChangeRadioButton_PreAppointmentScreening_CochlearImplant
                }
              />
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box borderRight={1} borderBottom={1}>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={PreAppointmentScreening_Other[40]}
                other={other}
                handleChangeRadioButton_PreAppointmentScreening_Other={
                  handleChangeRadioButton_PreAppointmentScreening_Other
                }
                handleChangeTextField_PreAppointmentScreening_Other={
                  handleChangeTextField_PreAppointmentScreening_Other
                }
              />
            </Box>
          </Grid>
        </Grid>
        <Grid item xs>
          <Box border={1} borderTop={0}>
            <OrderingClinician_Title />
          </Box>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-evenly"
        >
          <Grid item xs={2}>
            <Box pl={1} borderLeft={1}>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={OrderingClinician_ClinicianSignature[41]}
                clinicianSignature={clinicianSignature}
                handleChangeTextField_OrderingClinician_ClinicianSignature={
                  handleChangeTextField_OrderingClinician_ClinicianSignature
                }
              />
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={OrderingClinician_ClinicianName[42]}
                clinicianName={clinicianName}
                handleChangeTextField_OrderingClinician_ClinicianName={
                  handleChangeTextField_OrderingClinician_ClinicianName
                }
              />
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={OrderingClinician_Billing[43]}
                billing={billing}
                handleChangeTextField_OrderingClinician_Billing={
                  handleChangeTextField_OrderingClinician_Billing
                }
              />
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={OrderingClinician_Fax[44]}
                fax={fax}
                handleChangeTextField_OrderingClinician_Fax={
                  handleChangeTextField_OrderingClinician_Fax
                }
              />
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box pr={1} borderRight={1}>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={OrderingClinician_24hrCriticalResultsContact[45]}
                _24hrCriticalResultsContact={_24hrCriticalResultsContact}
                handleChangeTextField_OrderingClinician_24hrCriticalResultsContact={
                  handleChangeTextField_OrderingClinician_24hrCriticalResultsContact
                }
              />
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-evenly"
        >
          <Grid item xs={5}>
            <Box pl={2} borderLeft={1}>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={OrderingClinician_Address[46]}
                address={address}
                handleChangeTextField_OrderingClinician_Address={
                  handleChangeTextField_OrderingClinician_Address
                }
              />
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={OrderingClinician_Phone[47]}
                phone={phone}
                handleChangeTextField_OrderingClinician_Phone={
                  handleChangeTextField_OrderingClinician_Phone
                }
              />
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={OrderingClinician_DateOrdered[48]}
                dateOrdered={dateOrdered}
                handleChangeTextField_OrderingClinician_DateOrdered={
                  handleChangeTextField_OrderingClinician_DateOrdered
                }
              />
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box borderRight={1}>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={OrderingClinician_TimeOrdered[49]}
                timeOrdered={timeOrdered}
                handleChangeTextField_OrderingClinician_TimeOrdered={
                  handleChangeTextField_OrderingClinician_TimeOrdered
                }
              />
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-evenly"
        >
          <Grid item xs={3}>
            <Box pl={2} borderLeft={1}>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={OrderingClinician_CopyToClinicianName[50]}
                copyToClinicianName={copyToClinicianName}
                handleChangeTextField_OrderingClinician_CopyToClinicianName={
                  handleChangeTextField_OrderingClinician_CopyToClinicianName
                }
              />
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box pl={1}>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={OrderingClinician_CopyToLocation[51]}
                copyToLocation={copyToLocation}
                handleChangeTextField_OrderingClinician_CopyToLocation={
                  handleChangeTextField_OrderingClinician_CopyToLocation
                }
              />
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={OrderingClinician_CopyToPhone[52]}
                copyToPhone={copyToPhone}
                handleChangeTextField_OrderingClinician_CopyToPhone={
                  handleChangeTextField_OrderingClinician_CopyToPhone
                }
              />
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box style={{ paddingRight: "13.4px" }} borderRight={1}>
              <FieldRulesDialog
                handleChangeFieldRules={handleChangeFieldRules}
                formEditMode={formEditMode}
                field={OrderingClinician_CopyToFax[53]}
                copyToFax={copyToFax}
                handleChangeTextField_OrderingClinician_CopyToFax={
                  handleChangeTextField_OrderingClinician_CopyToFax
                }
              />
            </Box>
          </Grid>
        </Grid>
        <Grid item xs>
          <Box border={1}>
            <Footer />
          </Box>
        </Grid>
        <Grid item xs>
          <FootNote />
        </Grid>
      </Grid>
    </Grid>
  );
};
