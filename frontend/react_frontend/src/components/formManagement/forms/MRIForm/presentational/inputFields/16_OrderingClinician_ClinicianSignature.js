import React from "react";

// Styles
import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { AttachFile as AttachFileIcon } from "@material-ui/icons";

export const OrderingClinician_ClinicianSignature = ({
  formEditMode,
  field,
  handleClickOpenDialog,
  clinicianSignature,
  handleChangeTextField_OrderingClinician_ClinicianSignature,
}) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <TextField
        size="small"
        disabled={formEditMode === 0 ? true : false}
        style={{ marginRight: "13.4px" }}
        label="Clinician Signature"
        multiline
        rowsMax={4}
        value={clinicianSignature}
        onChange={handleChangeTextField_OrderingClinician_ClinicianSignature}
      />

      <Box px={1} flexGrow={1} display="flex" alignItems="center">
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
            Clinician Signature
          </Typography>
        </Button>
        <input
          style={{ display: "none" }}
          accept="image/*"
          id="attachment-required-OrderingClinician_ClinicianSignature"
          type="file"
          disabled={
            !field.objFieldRules.boolAttachmentSupported ||
            !field.objFieldRules.boolAttachmentRequired ||
            formEditMode === 0
          }
        />
        <label
          htmlFor="attachment-required-OrderingClinician_ClinicianSignature"
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
    </Box>
  );
};
