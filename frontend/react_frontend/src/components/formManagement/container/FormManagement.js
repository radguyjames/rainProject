import React, { useState } from "react";

// Components
import { SingleFormContainer } from "../presentational/SingleFormContainer";
import axios from "axios";

// database simulation
import { Database } from "./Database";
// let formsData = Database;

export const FormManagement = () => {
  const [formsData, setFormsData] = useState(Database);
  let formsData_upload = [...formsData];
  const handleClickUploadButton = async (uploadData) => {
    const options = {
      method: "POST",
      url: "/api/file/fetchPDFContent",
      data: uploadData,
    };

    await axios(options)
      .then((response) => {
        formsData_upload[0].arrFields.map((field) => {
          if (field.pdfParserKey[0] === "Outpatient") {
            if (
              response.data[field.pdfParserKey[0]] === "First appt. available"
            ) {
              field.strFieldValue = "1st appt. available (Winnipeg Only)";
            }
            if (response.data[field.pdfParserKey[0]] === "Will travel") {
              field.strFieldValue =
                "Will travel within Manitoba for 1st available appt.";
            }
            if (response.data[field.pdfParserKey[0]] === "preferred site") {
              field.strFieldValue = "2";
              field.strFieldAdditionalText =
                response.data[field.pdfParserKey[1]];
            }
          }

          if (field.pdfParserKey[2] === "ED physician") {
            if (response.data[field.pdfParserKey[0]] === "Yes") {
              field.strFieldValue[0]["Time order placed:"] = true;
              field.strFieldAdditionalText =
                response.data[field.pdfParserKey[1]];
            } else {
              field.strFieldValue[0]["Time order placed:"] = false;
            }
            if (response.data[field.pdfParserKey[2]] === "Yes") {
              field.strFieldValue[1]["ED Physician"] = true;
            } else {
              field.strFieldValue[1]["ED Physician"] = false;
            }

            if (response.data[field.pdfParserKey[3]] === "Yes") {
              field.strFieldValue[2]["Primary Care Provider"] = true;
            } else {
              field.strFieldValue[2]["Primary Care Provider"] = false;
            }
          }

          if (field.pdfParserKey[0] === "Patient contact #") {
            field.strFieldValue = response.data[field.pdfParserKey[0]];
          }

          if (field.pdfParserKey[0] === "Patient name") {
            field.strFieldValue = response.data[field.pdfParserKey[0]];
          }

          if (field.pdfParserKey[0] === "Inpatient/ED") {
            if (response.data[field.pdfParserKey[0]] === "Yes") {
              field.strFieldValue[0]["Inpatient"] = true;
              field.strFieldValue[1]["Site"] =
                response.data[field.pdfParserKey[1]];
              field.strFieldValue[2]["Ward / Room #"] =
                response.data[field.pdfParserKey[2]];
              if (response.data[field.pdfParserKey[3]] === "Yes") {
                field.strFieldValue[3]["EMS Transport"] = true;
              } else {
                field.strFieldValue[3]["EMS Transport"] = false;
              }
            } else {
              field.strFieldValue[0]["Inpatient"] = false;
              field.strFieldValue[1]["Site"] = "";
              field.strFieldValue[2]["Ward / Room #"] = "";
              field.strFieldValue[3]["EMS Transport"] = false;
            }
          }
        });
        setFormsData(formsData_upload);
        // console.log(response.data);
        // console.log(formsData[0].arrFields);
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  // state
  const [arrAllForms, setArrAllForms] = useState(formsData);

  let arrTempForms = [...arrAllForms];
  const handleChangeEnabled = (e) => {
    let objTempForm = arrTempForms[e.target.id * 1];
    // https://stackoverflow.com/questions/55987953/how-do-i-update-states-onchange-in-an-array-of-object-in-react-hooks
    objTempForm.boolEnabled = e.target.checked;
    setArrAllForms(arrTempForms);
  };

  const handleClickModeButton = (e) => {
    let objTempForm;
    let target;
    if (
      e.target.tagName === "path" &&
      e.target.parentNode.tagName === "svg" &&
      e.target.parentNode.parentNode.tagName === "SPAN" &&
      e.target.parentNode.parentNode.parentNode.tagName === "BUTTON"
    ) {
      target = e.target.parentNode.parentNode.parentNode;
    }
    if (
      e.target.tagName === "svg" &&
      e.target.parentNode.tagName === "SPAN" &&
      e.target.parentNode.parentNode.tagName === "BUTTON"
    ) {
      target = e.target.parentNode.parentNode;
    }
    if (
      e.target.tagName === "SPAN" &&
      e.target.parentNode.tagName === "BUTTON"
    ) {
      target = e.target.parentNode;
    }
    if (e.target.tagName === "BUTTON") {
      target = e.target;
    }
    objTempForm = arrTempForms[target.title * 1];
    objTempForm.intMode = target.id * 1;
    setArrAllForms(arrTempForms);
  };

  const handleClickTestModeButton = (e) => {
    let objTempForm = arrTempForms[e.target.id * 1];
    let target;
    if (
      e.target.tagName === "path" &&
      e.target.parentNode.tagName === "svg" &&
      e.target.parentNode.parentNode.tagName === "SPAN" &&
      e.target.parentNode.parentNode.parentNode.tagName === "SPAN" &&
      e.target.parentNode.parentNode.parentNode.parentNode.tagName === "BUTTON"
    ) {
      target = e.target.parentNode.parentNode.parentNode.parentNode;
    }
    if (
      e.target.tagName === "svg" &&
      e.target.parentNode.tagName === "SPAN" &&
      e.target.parentNode.parentNode.tagName === "SPAN" &&
      e.target.parentNode.parentNode.parentNode.tagName === "BUTTON"
    ) {
      target = e.target.parentNode.parentNode.parentNode;
    }
    if (
      e.target.tagName === "SPAN" &&
      e.target.parentNode.tagName === "SPAN" &&
      e.target.parentNode.parentNode.tagName === "BUTTON"
    ) {
      target = e.target.parentNode.parentNode;
    }
    if (
      e.target.tagName === "SPAN" &&
      e.target.parentNode.tagName === "BUTTON"
    ) {
      target = e.target.parentNode;
    }
    if (e.target.tagName === "BUTTON") {
      target = e.target;
    }

    if (target.name === "clear") {
      for (let i = 0; i < objTempForm.arrFields.length; i++) {
        // Outpatient field
        if (objTempForm.arrFields[i].strFieldName === "Outpatient") {
          objTempForm.arrFields[i].strFieldValue = "";
          objTempForm.arrFields[i].strFieldAdditionalText = "";
        }

        // EDOutpatientFollowUpWith field
        if (
          objTempForm.arrFields[i].strFieldName === "EDOutpatientFollowUpWith"
        ) {
          objTempForm.arrFields[i].strFieldValue = [
            { "Time order placed:": false },
            { "ED Physician": false },
            { "Primary Care Provider": false },
          ];
          objTempForm.arrFields[i].strFieldAdditionalText = "";
        }

        // EDOutpatientFollowUpWith Patient Contact field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "EDOutpatientFollowUpWith_PatientContact"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // EDOutpatientFollowUpWith Patient Name field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "EDOutpatientFollowUpWith_PatientName"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // InpatientED field
        if (objTempForm.arrFields[i].strFieldName === "InpatientED") {
          objTempForm.arrFields[i].strFieldValue = [
            { Inpatient: false },
            { Site: "" },
            { "Ward / Room #": "" },
            { "EMS Transport": false },
          ];
        }

        // PatientInformation Last Name First Name field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "PatientInformation_LastNameFirstName"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // PatientInformation DOB field
        if (
          objTempForm.arrFields[i].strFieldName === "PatientInformation_DOB"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // PatientInformation Age field
        if (
          objTempForm.arrFields[i].strFieldName === "PatientInformation_Age"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // PatientInformation Sex field
        if (
          objTempForm.arrFields[i].strFieldName === "PatientInformation_Sex"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // PatientInformation MHSC field
        if (
          objTempForm.arrFields[i].strFieldName === "PatientInformation_MHSC"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // PatientInformation PHIN field
        if (
          objTempForm.arrFields[i].strFieldName === "PatientInformation_PHIN"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // PatientInformation Other Insurance WCB field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "PatientInformation_OtherInsuranceWCB"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
          objTempForm.arrFields[i].strFieldAdditionalText = "";
        }

        // PatientInformation Full Address field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "PatientInformation_FullAddress"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // PatientInformation Email Address field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "PatientInformation_EmailAddress"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // PatientInformation Daytime Mobile field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "PatientInformation_DaytimeMobile"
        ) {
          objTempForm.arrFields[i].strFieldValue = [
            { Daytime: "" },
            { Mobile: "" },
          ];
        }

        // PatientInformation Emergency Contact Next of Kin field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "PatientInformation_EmergencyContactNextOfKin"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // PatientInformation Translator field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "PatientInformation_Translator"
        ) {
          objTempForm.arrFields[i].strFieldValue = false;
          objTempForm.arrFields[i].strFieldAdditionalText = "";
        }

        // Scheduling Urgency field
        if (objTempForm.arrFields[i].strFieldName === "Scheduling_Urgency") {
          objTempForm.arrFields[i].strFieldValue = "";
          objTempForm.arrFields[i].strFieldAdditionalText = "";
        }

        // Scheduling Transport field
        if (objTempForm.arrFields[i].strFieldName === "Scheduling_Transport") {
          objTempForm.arrFields[i].strFieldValue = [
            { Ambulatory: false },
            { Wheelchair: false },
            { "Bed/Stretcher": false },
            { "Lift Required": false },
          ];
        }

        // Pregnant field
        if (objTempForm.arrFields[i].strFieldName === "Pregnant") {
          objTempForm.arrFields[i].strFieldValue = "";
          objTempForm.arrFields[i].strFieldAdditionalText = "";
        }

        // Claustrophobia field
        if (objTempForm.arrFields[i].strFieldName === "Claustrophobia") {
          objTempForm.arrFields[i].strFieldValue = "";
          objTempForm.arrFields[i].strFieldAdditionalText = "";
        }

        // Requires Sedation field
        if (objTempForm.arrFields[i].strFieldName === "RequiresSedation") {
          objTempForm.arrFields[i].strFieldValue = "";
          objTempForm.arrFields[i].strFieldAdditionalText = "";
        }

        // Infection control precautions field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "InfectionControlPrecautions"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
          objTempForm.arrFields[i].strFieldAdditionalText = "";
        }

        // Exam Information Weight field
        if (
          objTempForm.arrFields[i].strFieldName === "ExamInformation_Weight"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // Exam Information Height field
        if (
          objTempForm.arrFields[i].strFieldName === "ExamInformation_Height"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // Exam Information Allergies Related To Imaging field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "ExamInformation_AllergiesRelatedToImaging"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // Exam Information Pediatric Patients field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "ExamInformation_PediatricPatients"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // Exam Information Anatomical Location Examination Requested field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "ExamInformation_AnatomicalLocationExaminationRequested"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // Exam Information Previous Relevant Exams field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "ExamInformation_PreviousRelevantExams"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // Relevant Clinical Surgical History field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "RelevantClinicalSurgicalHistory"
        ) {
          objTempForm.arrFields[i].strFieldValue = [
            { "Cancer Care Pathway": false },
            { "Previous Back Surgery": false },
            { relevantClinicalSurgicalHistory: "" },
          ];
          objTempForm.arrFields[i].strFieldValueFormatted = ["", "", ""];
        }

        // For IV Contrast Exams field
        if (objTempForm.arrFields[i].strFieldName === "ForIVContrastExams") {
          objTempForm.arrFields[i].strFieldValue = "";
          objTempForm.arrFields[i].strFieldValue2 = "";
          objTempForm.arrFields[i].strFieldValueFormatted = ["", "", "", ""];
        }

        // Pre-appointment Screening Pacemaker Defibrillator field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "PreAppointmentScreening_PacemakerDefibrillator"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // Pre-appointment Screening Drug Inufsion Pump field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "PreAppointmentScreening_DrugInfusionPump"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // Pre-appointment Screening Neuro Or Spinal Cord Stimulator field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "PreAppointmentScreening_NeuroOrSpinalCordStimulator"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // Pre-appointment Screening Surgical Implants field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "PreAppointmentScreening_SurgicalImplants"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // Pre-appointment Screening Loop Recorder field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "PreAppointmentScreening_LoopRecorder"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // Pre-appointment Screening Welder Work With Metal Any Metal In Eyes field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "PreAppointmentScreening_WelderWorkWithMetalAnyMetalInEyes"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // Pre-appointment Screening STRATA valve field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "PreAppointmentScreening_STRATAValve"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // Pre-appointment Screening Bullet Shrapnel Or Other Metal Foreign Body field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "PreAppointmentScreening_BulletShrapnelOrOtherMetalForeignBody"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // Pre-appointment Screening Cochlear Implant field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "PreAppointmentScreening_CochlearImplant"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
        }

        // Pre-appointment Screening Other field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "PreAppointmentScreening_Other"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
          objTempForm.arrFields[i].strFieldAdditionalText = "";
        }

        // Ordering Clinian Clinician Signature field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "OrderingClinician_ClinicianSignature"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
          objTempForm.arrFields[i].strFieldAdditionalText = "";
        }

        // Ordering Clinian Clinician Name field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "OrderingClinician_ClinicianName"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
          objTempForm.arrFields[i].strFieldAdditionalText = "";
        }

        // Ordering Clinian Billing field
        if (
          objTempForm.arrFields[i].strFieldName === "OrderingClinician_Billing"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
          objTempForm.arrFields[i].strFieldAdditionalText = "";
        }

        // Ordering Clinian Fax field
        if (objTempForm.arrFields[i].strFieldName === "OrderingClinician_Fax") {
          objTempForm.arrFields[i].strFieldValue = "";
          objTempForm.arrFields[i].strFieldAdditionalText = "";
        }

        // Ordering Clinian 24hr Critical Results Contact field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "OrderingClinician_24hrCriticalResultsContact"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
          objTempForm.arrFields[i].strFieldAdditionalText = "";
        }

        // Ordering Clinian Address field
        if (
          objTempForm.arrFields[i].strFieldName === "OrderingClinician_Address"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
          objTempForm.arrFields[i].strFieldAdditionalText = "";
        }

        // Ordering Clinian Phone field
        if (
          objTempForm.arrFields[i].strFieldName === "OrderingClinician_Phone"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
          objTempForm.arrFields[i].strFieldAdditionalText = "";
        }

        // Ordering Clinian Date Ordered field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "OrderingClinician_DateOrdered"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
          objTempForm.arrFields[i].strFieldAdditionalText = "";
        }

        // Ordering Clinian Time Ordered field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "OrderingClinician_TimeOrdered"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
          objTempForm.arrFields[i].strFieldAdditionalText = "";
        }

        // Ordering Clinian Copy To Clinician Name field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "OrderingClinician_CopyToClinicianName"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
          objTempForm.arrFields[i].strFieldAdditionalText = "";
        }

        // Ordering Clinian Copy To Location field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "OrderingClinician_CopyToLocation"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
          objTempForm.arrFields[i].strFieldAdditionalText = "";
        }

        // Ordering Clinian Copy To Phone field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "OrderingClinician_CopyToPhone"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
          objTempForm.arrFields[i].strFieldAdditionalText = "";
        }

        // Ordering Clinian Copy To Fax field
        if (
          objTempForm.arrFields[i].strFieldName ===
          "OrderingClinician_CopyToFax"
        ) {
          objTempForm.arrFields[i].strFieldValue = "";
          objTempForm.arrFields[i].strFieldAdditionalText = "";
        }
      }
    }
    setArrAllForms(arrTempForms);
  };

  return (
    <div>
      {arrAllForms.map((formItem, formIndex) => (
        <SingleFormContainer
          key={formIndex}
          currentFormId={formIndex.toString()}
          formTemplateEnabled={formItem.boolEnabled}
          handleChangeEnabled={handleChangeEnabled}
          formName={formItem.strFormName}
          formEditMode={formItem.intMode}
          handleClickModeButton={handleClickModeButton}
          handleClickUploadButton={handleClickUploadButton}
          handleClickTestModeButton={handleClickTestModeButton}
          formData={formsData[formIndex]}
        />
      ))}
    </div>
  );
};
