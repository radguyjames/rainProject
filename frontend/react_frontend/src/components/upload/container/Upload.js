import React, { useState, useRef } from "react";

// Dev Tools, 3rd Party Tools
import axios from "axios";
import Dropzone from "react-dropzone-uploader";

// Styles
import "react-dropzone-uploader/dist/styles.css";
import {
  Container,
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Tooltip,
} from "@material-ui/core";
import {
  HighlightOff as HighlightOffIcon,
  AddCircleOutline as AddCircleOutlineIcon,
} from "@material-ui/icons";

let _fetchedFormType = {};
let UploadedFiles = [];
let formCheck = {};
export const Upload = () => {
  const targetSelect = useRef(null);
  const [fetchedFormType, setFetchedFormType] = useState({});
  const handleChangeFormType = (e) => {
    setFetchedFormType({
      ...fetchedFormType,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpload = async ({ file, meta }) => {
    function hasSameKeys(a, b) {
      return (
        Object.keys(a).length === Object.keys(b).length &&
        Object.keys(a).every((k) => b.hasOwnProperty(k))
      );
    }

    let uploadData = new FormData();
    uploadData.append("filename", meta.name);
    uploadData.append("file", file);

    const options = {
      method: "POST",
      url: "/api/file/fetchPDFContent",
      data: uploadData,
    };

    let formTypeRecognized = false;
    await axios(options)
      .then((response) => {
        if (hasSameKeys(response.data, { formType: "" })) {
          // setFetchedFormType({
          //   ...fetchedFormType,
          //   [`${meta.name}_${meta.id}`]: 0,
          // });
          _fetchedFormType[`${meta.name}_${meta.id}`] = 0;
          setFetchedFormType(_fetchedFormType);
        }
        if (
          hasSameKeys(response.data, {
            "24 hr": "",
            Address: "",
            Allergies: "",
            "Anatomical location / examination requested": "",
            "Billing #": "",
            "Bullet / shrapnel or other metal foreign body": "",
            "Cancer Care Pathway": "",
            Claustrophobia: "",
            "Clinician name": "",
            "Cochlear implant?": "",
            "Copy to - clinician name": "",
            "Copy to - fax #": "",
            "Copy to - location": "",
            "Copy to - phone #": "",
            "Date ordered": "",
            "Drug infusion pump / glucose monitoring device": "",
            "ED physician": "",
            "EMS transport": "",
            "Fax #": "",
            Height: "",
            "Infection control - specify": "",
            "Infection control precautions?": "",
            "Inpatient/ED": "",
            LMP: "",
            "Language required": "",
            "Loop recorder?": "",
            "Neuro or spinal cord?": "",
            Other: "",
            "Other - pre-appointment screening": "",
            "Other insurance": "",
            Outpatient: "",
            "PICC / CVC / Port?": "",
            "Pacemaker?": "",
            "Patient contact #": "",
            "Patient info - DOB": "",
            "Patient info - MHSC": "",
            "Patient info - PHIN": "",
            "Patient info - WCB #": "",
            "Patient info - age": "",
            "Patient info - full address": "",
            "Patient info - last name / first name": "",
            "Patient name": "",
            "Pediatric head circumference percentile": "",
            "Phone #": "",
            "Preferred Site - Specify": "",
            Pregnant: "",
            "Previous back surgery": "",
            "Previous relevant exams": "",
            "Primary care provider": "",
            "Relevant Clinical / Surgical History": "",
            "Renal - date": "",
            "Renal disease": "",
            "Requires sedation": "",
            "Requsted Date": "",
            SCr: "",
            "STRATA valve?": "",
            Sex: "",
            Site: "",
            "Surgical implants?": "",
            "Time order placed": "",
            "Time order placed - text box": "",
            "Time ordered (24 hr": "",
            Translator: "",
            "Transport - ambulatory": "",
            "Transport - bed/stretcher": "",
            "Transport - lift required": "",
            "Transport - wheelchair": "",
            Urgency: "",
            "Ward/room #": "",
            Weight: "",
            "Welder / works with metal / any metal in eyes?": "",
            eGFR: "",
            "email address": "",
            "emergency contact / next of kin": "",
            "phone daytime": "",
            "phone mobile": "",
          })
        ) {
          _fetchedFormType[`${meta.name}_${meta.id}`] = 1;
          setFetchedFormType(_fetchedFormType);
          formTypeRecognized = true;
        }
      })
      .catch((e) => {
        // console.log(e);
      });

    if (formTypeRecognized) {
      let fetchingForm = new FormData();
      fetchingForm.append("formName", "MRI");
      const options_fetchingForm = {
        method: "POST",
        url: "/api/formmanagement/form",
        data: fetchingForm,
      };

      await axios(options_fetchingForm)
        .then((response_fetchingForm) => {
          formCheck.form = response_fetchingForm.data;
        })
        .catch((e) => {});
    }

    // console.log("formCheck", formCheck);

    return {
      url: ".doesntexist",
      // meta: { ["status"]: "headers_received" },
      // meta: { status: "headers_received" },
    };
  };

  const previewComponent = ({ fileWithMeta }) => {
    return (
      <Paper
        elevation={3}
        style={{
          width: "100%",
          margin: "6px 16px",
          padding: "6px 16px",
        }}
      >
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={2}>
            <Box display="flex" alignItems="center">
              <Box
                style={
                  true
                    ? { backgroundColor: "#f57c00" }
                    : { backgroundColor: "blue" }
                }
                color="info.contrastText"
                mx={1}
                px={1}
              >
                <Typography>{true ? "Pending" : "Coding"}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <Typography>{fileWithMeta.meta.name}</Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <FormControl required fullWidth variant="outlined" size="small">
              <InputLabel>Form Type</InputLabel>
              <Select
                ref={targetSelect}
                name={`${fileWithMeta.meta.name}_${fileWithMeta.meta.id}`}
                value={
                  fetchedFormType[
                    `${fileWithMeta.meta.name}_${fileWithMeta.meta.id}`
                  ]
                }
                onChange={handleChangeFormType}
                label="Form Type *"
              >
                <MenuItem value={0}>Unsupported</MenuItem>
                <MenuItem value={1}>MRI</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1} display="flex" alignItems="center" justify="center">
            <Box
              width={1}
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Typography style={{ textTransform: "uppercase" }}>
                {fileWithMeta.meta.status === "error_upload"
                  ? "success"
                  : "processing..."}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <IconButton onClick={fileWithMeta.remove}>
                <HighlightOffIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    );
  };

  const inputWithFilesContent = (files) => {
    UploadedFiles = files;
    return (
      <Typography style={{ color: "#000" }}>
        Uploaded: {files.length} Remaining: {50 - files.length}
      </Typography>
    );
  };
  const [enableUploadButton, setEnableUploadButton] = useState(false);

  const handleChangeStatus = ({ meta }) => {
    setFetchedFormType({
      ...fetchedFormType,
      ["forceRefresh"]: meta.id,
    });
    // console.log(fetchedFormType);

    for (let i = 0; i < UploadedFiles.length; i++) {
      if (
        UploadedFiles[i].meta.status === "error_upload" ||
        UploadedFiles[i].meta.status === "removed"
      ) {
        UploadedFiles[i].allow = true;
      } else {
        UploadedFiles[i].allow = false;
        setEnableUploadButton(false);
      }
    }

    let flag = true;
    for (let i = 0; i < UploadedFiles.length; i++) {
      flag = flag && UploadedFiles[i].allow;
    }
    setEnableUploadButton(flag);
  };
  return (
    <div>
      <Container fixed style={{ marginTop: "16px" }}>
        <Box mb={2} display="flex" alignItems="center">
          <Typography style={{ fontWeight: "bold" }}>
            Upload PDF Form(s)
          </Typography>
        </Box>
        <Dropzone
          inputWithFilesContent={inputWithFilesContent}
          PreviewComponent={previewComponent}
          getUploadParams={handleUpload}
          onChangeStatus={handleChangeStatus}
          multiple={true}
          maxFiles={50}
          accept="application/pdf"
          inputContent={(files, extra) =>
            extra.reject
              ? "Only pdf files allowed!"
              : "Drag and drop pdf file(s) here or click to upload"
          }
          styles={{
            dropzone: {
              overflow: "auto",
              height: "460px",
              background: "#f0f0f0",
            },
            inputLabel: {
              color: "#626262",
              fontFamily: "Roboto, Helvetica, Arial, sans-serif",
              fontSize: "1.9rem",
            },
            dropzoneReject: {
              borderColor: "#F19373",
              backgroundColor: "#F1BDAB",
            },
          }}
        />
        <Box>
          <Typography style={{ fontSize: "13.4px" }}>
            * Unsupported form(s) will be ignored.
          </Typography>
        </Box>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Tooltip title="Click after all files finished processing">
            <Button
              disabled={UploadedFiles.length > 0 && !enableUploadButton}
              variant="contained"
              color="primary"
            >
              Upload
            </Button>
          </Tooltip>
        </Box>
      </Container>

      <Container fixed style={{ marginTop: "16px" }}>
        <Box mb={2} display="flex" alignItems="center">
          <Typography style={{ fontWeight: "bold" }}>
            Create Form(s) On The Fly
          </Typography>
          <IconButton>
            <AddCircleOutlineIcon />
          </IconButton>
        </Box>
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={2}>
            <Box display="flex" alignItems="center">
              <Box
                style={{ backgroundColor: "grey" }}
                color="info.contrastText"
                mx={1}
                px={1}
              >
                <Typography>N/A</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <TextField label="Name"></TextField>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <FormControl required fullWidth variant="outlined" size="small">
              <InputLabel>Form Type</InputLabel>
              <Select label="Form Type *">
                <MenuItem value={0}>MRI</MenuItem>
                <MenuItem value={1}>DI</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2} display="flex" alignItems="center" justify="center">
            <Box display="flex" alignItems="center" justifyContent="center">
              <Button variant="contained" color="primary">
                Create
              </Button>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <IconButton>
                <HighlightOffIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
