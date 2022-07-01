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

export const ExamInformation_AnatomicalLocationExaminationRequested = ({
  formEditMode,
  field,
  handleClickOpenDialog,
  anatomicalLocation,
  handleChangeTextField_ExamInformation_AnatomicalLocationExaminationRequested,
}) => {
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" alignItems="center">
        <Button
          disabled={formEditMode === 0 ? false : true}
          style={{
            paddingLeft: "0px",
            paddingRight: "2px",
            textTransform: "none",
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
            Anatomical location / examination requested:
          </Typography>
        </Button>
        <input
          style={{ display: "none" }}
          accept="image/*"
          id="attachment-required-ExamInformation_AnatomicalLocationExaminationRequested"
          type="file"
          disabled={
            !field.objFieldRules.boolAttachmentSupported ||
            !field.objFieldRules.boolAttachmentRequired ||
            formEditMode === 0
          }
        />
        <label
          htmlFor="attachment-required-ExamInformation_AnatomicalLocationExaminationRequested"
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
        label="Anatomical Location / Examination Requested"
        multiline
        rows={4}
        style={{ marginRight: "13.4px" }}
        value={anatomicalLocation}
        onChange={
          handleChangeTextField_ExamInformation_AnatomicalLocationExaminationRequested
        }
        disabled={formEditMode === 0 ? true : false}
      />
    </Box>
  );
};
