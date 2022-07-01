import React from "react";

// Styles
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@material-ui/core";
import { AttachFile as AttachFileIcon } from "@material-ui/icons";

export const PatientInformation_EmergencyContactNextOfKin = ({
  formEditMode,
  field,
  handleClickOpenDialog,
  emergencyContactNextOfKin,
  handleChangeTextField_PatientInformation_EmergencyContactNextOfKin,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <Box display="flex">
        <Button
          disabled={formEditMode === 0 ? false : true}
          style={{
            paddingLeft: "0px",
            paddingRight: "2px",
            textTransform: "capitalize",
            minWidth: "0px",
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
            Emergency Contact / Next
            <span style={{ textTransform: "none" }}>&nbsp;of&nbsp;</span> Kin:
          </Typography>
        </Button>
        <input
          style={{ display: "none" }}
          accept="image/*"
          id="attachment-required-PatientInformation_EmergencyContactNextOfKin"
          type="file"
          disabled={
            !field.objFieldRules.boolAttachmentSupported ||
            !field.objFieldRules.boolAttachmentRequired ||
            formEditMode === 0
          }
        />
        <label
          htmlFor="attachment-required-PatientInformation_EmergencyContactNextOfKin"
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
      <TextField
        size="small"
        fullWidth
        label="Emergency Contact / Next of Kin"
        multiline
        rowsMax={4}
        style={{ marginRight: "13.4px" }}
        value={emergencyContactNextOfKin}
        onChange={
          handleChangeTextField_PatientInformation_EmergencyContactNextOfKin
        }
        disabled={formEditMode === 0 ? true : false}
      />
    </Box>
  );
};
