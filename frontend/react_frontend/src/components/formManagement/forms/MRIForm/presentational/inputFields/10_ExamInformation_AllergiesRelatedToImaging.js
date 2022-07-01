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

export const ExamInformation_AllergiesRelatedToImaging = ({
  formEditMode,
  field,
  handleClickOpenDialog,
  allergies,
  handleChangeTextField_ExamInformation_AllergiesRelatedToImaging,
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
            Allergies related to imaging? (contrast, latex, sedative
            medication):
          </Typography>
        </Button>
        <input
          style={{ display: "none" }}
          accept="image/*"
          id="attachment-required-ExamInformation_AllergiesRelatedToImaging"
          type="file"
          disabled={
            !field.objFieldRules.boolAttachmentSupported ||
            !field.objFieldRules.boolAttachmentRequired ||
            formEditMode === 0
          }
        />
        <label
          htmlFor="attachment-required-ExamInformation_AllergiesRelatedToImaging"
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
        label="Related Allergies"
        multiline
        rowsMax={4}
        style={{ marginRight: "13.4px" }}
        value={allergies}
        onChange={
          handleChangeTextField_ExamInformation_AllergiesRelatedToImaging
        }
        disabled={formEditMode === 0 ? true : false}
      />
    </Box>
  );
};
