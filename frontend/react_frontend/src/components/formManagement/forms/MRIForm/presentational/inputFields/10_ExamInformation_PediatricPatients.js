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

export const ExamInformation_PediatricPatients = ({
  formEditMode,
  field,
  handleClickOpenDialog,
  headCircumferencePercentile,
  handleChangeTextField_ExamInformation_PediatricPatients,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <Box display="flex">
        <Button
          disabled={formEditMode === 0 ? false : true}
          style={{
            paddingLeft: "0px",
            paddingRight: "2px",
            textTransform: "none",
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
            Pediatric Patients (≤ 2 years old): provide head circumference
            percentile:
          </Typography>
        </Button>
        <input
          style={{ display: "none" }}
          accept="image/*"
          id="attachment-required-ExamInformation_PediatricPatients"
          type="file"
          disabled={
            !field.objFieldRules.boolAttachmentSupported ||
            !field.objFieldRules.boolAttachmentRequired ||
            formEditMode === 0
          }
        />
        <label
          htmlFor="attachment-required-ExamInformation_PediatricPatients"
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
        label="Head Circumference Percentile"
        multiline
        rowsMax={4}
        style={{ marginRight: "13.4px" }}
        value={headCircumferencePercentile}
        onChange={handleChangeTextField_ExamInformation_PediatricPatients}
        disabled={formEditMode === 0 ? true : false}
      />
    </Box>
  );
};
