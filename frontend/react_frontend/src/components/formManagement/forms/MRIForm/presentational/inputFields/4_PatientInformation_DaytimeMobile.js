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

export const PatientInformation_DaytimeMobile = ({
  formEditMode,
  field,
  handleClickOpenDialog,
  daytime,
  mobile,
  handleChangeTextField_PatientInformation_DaytimeMobile,
}) => {
  // data array
  const arrTextField = [
    { label: "Daytime", value: daytime },
    { label: "Mobile:", value: mobile },
  ];

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
            Phone:
          </Typography>
        </Button>
        <input
          style={{ display: "none" }}
          accept="image/*"
          id="attachment-required-PatientInformation_DaytimeMobile"
          type="file"
          disabled={
            !field.objFieldRules.boolAttachmentSupported ||
            !field.objFieldRules.boolAttachmentRequired ||
            formEditMode === 0
          }
        />
        <label
          htmlFor="attachment-required-PatientInformation_DaytimeMobile"
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
      {arrTextField.map((item, index) => (
        <Box key={index} display="flex" alignItems="center">
          <Box mr={2}>
            <Typography
              style={
                formEditMode === 0
                  ? { fontSize: "13.4px", color: "rgba(0,0,0,0.38)" }
                  : { fontSize: "13.4px" }
              }
            >
              {item.label}
            </Typography>
          </Box>
          <TextField
            size="small"
            label={index === 0 ? item.label : "Mobile"}
            name={index === 0 ? item.label : "Mobile"}
            multiline
            rowsMax={4}
            style={{ marginRight: "13.4px" }}
            value={item.value}
            onChange={handleChangeTextField_PatientInformation_DaytimeMobile}
            disabled={formEditMode === 0 ? true : false}
          />
        </Box>
      ))}
    </Box>
  );
};
