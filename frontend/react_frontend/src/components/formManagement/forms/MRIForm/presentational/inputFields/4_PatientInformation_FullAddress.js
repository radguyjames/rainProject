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

export const PatientInformation_FullAddress = ({
  formEditMode,
  field,
  handleClickOpenDialog,
  fullAddress,
  handleChangeTextField_PatientInformation_FullAddress,
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
            Full Address:
          </Typography>
        </Button>
        <input
          style={{ display: "none" }}
          accept="image/*"
          id="attachment-required-PatientInformation_FullAddress"
          type="file"
          disabled={
            !field.objFieldRules.boolAttachmentSupported ||
            !field.objFieldRules.boolAttachmentRequired ||
            formEditMode === 0
          }
        />
        <label
          htmlFor="attachment-required-PatientInformation_FullAddress"
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
        label="FullAddress"
        fullWidth
        multiline
        rows={4}
        style={{ marginRight: "13.4px" }}
        value={fullAddress}
        onChange={handleChangeTextField_PatientInformation_FullAddress}
        disabled={formEditMode === 0 ? true : false}
      />
    </Box>
  );
};
