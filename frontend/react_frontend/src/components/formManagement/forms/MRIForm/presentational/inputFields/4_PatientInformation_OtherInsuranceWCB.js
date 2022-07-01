import React from "react";

// Styles
import {
  FormControl,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  TextField,
  Box,
  IconButton,
} from "@material-ui/core";
import { AttachFile as AttachFileIcon } from "@material-ui/icons";

export const PatientInformation_OtherInsuranceWCB = ({
  formEditMode,
  field,
  handleClickOpenDialog,
  WCB,
  handleChangeRadioButton_PatientInformation_OtherInsuranceWCB,
  handleChangeTextField_PatientInformation_OtherInsuranceWCB,
}) => {
  // data array
  const arrRadioButtonTexts = ["Yes", "No"];

  return (
    <Box display="flex" alignItems="center">
      <Box display="flex">
        <Button
          disabled={formEditMode === 0 ? false : true}
          style={{
            paddingLeft: "0px",
            paddingRight: "2px",
            textTransform: "capitalize",
          }}
          onClick={handleClickOpenDialog}
        >
          <Typography
            noWrap
            style={{
              display: "flex",
              fontSize: "13.4px",
            }}
          >
            <span
              style={
                field.objFieldRules.boolRequired
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
            >
              *
            </span>
            Other Insurance?
          </Typography>
        </Button>
        <input
          style={{ display: "none" }}
          accept="image/*"
          id="attachment-required-PatientInformation_OtherInsuranceWCB"
          type="file"
          disabled={
            !field.objFieldRules.boolAttachmentSupported ||
            !field.objFieldRules.boolAttachmentRequired ||
            formEditMode === 0
          }
        />
        <label
          htmlFor="attachment-required-PatientInformation_OtherInsuranceWCB"
          style={{ width: "26px" }}
        >
          <IconButton
            component="span"
            style={
              field.objFieldRules.boolAttachmentRequired
                ? {
                    visibility: "visible",
                    paddingLeft: "0px",
                    paddingRight: "0px",
                  }
                : { visibility: "hidden" }
            }
          >
            <AttachFileIcon style={{ fontSize: "20px" }} />
          </IconButton>
        </label>
      </Box>
      <Box>
        <FormControl component="fieldset">
          <RadioGroup
            value={field.strFieldValue}
            onChange={
              handleChangeRadioButton_PatientInformation_OtherInsuranceWCB
            }
          >
            <Box display="flex" alignItems="center">
              {arrRadioButtonTexts.map((item, index) => (
                <FormControlLabel
                  key={index}
                  value={item}
                  control={
                    <Radio disabled={formEditMode === 0 ? true : false} />
                  }
                  label={
                    <Typography style={{ fontSize: "13.4px" }}>
                      {item}
                    </Typography>
                  }
                />
              ))}
            </Box>
          </RadioGroup>
        </FormControl>
      </Box>
      <Box mr={2}>
        <Typography
          noWrap
          style={
            field.strFieldValue === "N" || formEditMode === 0
              ? { fontSize: "13.4px", color: "rgba(0,0,0,0.38)" }
              : { fontSize: "13.4px" }
          }
        >
          WCB #
        </Typography>
      </Box>
      <TextField
        size="small"
        disabled={
          field.strFieldValue !== "Yes" || formEditMode === 0 ? true : false
        }
        style={{ marginRight: "13.4px" }}
        fullWidth
        label="WCB #"
        multiline
        rowsMax={4}
        value={WCB}
        onChange={handleChangeTextField_PatientInformation_OtherInsuranceWCB}
        error={field.strFieldValue === "Yes" && WCB === ""}
        // helperText={
        //   field.strFieldValue === "Yes" && WCB === "" ? "Required" : ""
        // }
      />
    </Box>
  );
};
