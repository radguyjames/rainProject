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

export const OrderingClinician_ClinicianName = ({
  formEditMode,
  field,
  handleClickOpenDialog,
  clinicianName,
  handleChangeTextField_OrderingClinician_ClinicianName,
}) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <TextField
        size="small"
        disabled={formEditMode === 0 ? true : false}
        style={{ marginRight: "13.4px" }}
        label="Clinician Name"
        multiline
        rowsMax={4}
        value={clinicianName}
        onChange={handleChangeTextField_OrderingClinician_ClinicianName}
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
            Clinician Name (print first & last)
          </Typography>
        </Button>
        <input
          style={{ display: "none" }}
          accept="image/*"
          id="attachment-required-OrderingClinician_ClinicianName"
          type="file"
          disabled={
            !field.objFieldRules.boolAttachmentSupported ||
            !field.objFieldRules.boolAttachmentRequired ||
            formEditMode === 0
          }
        />
        <label
          htmlFor="attachment-required-OrderingClinician_ClinicianName"
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
