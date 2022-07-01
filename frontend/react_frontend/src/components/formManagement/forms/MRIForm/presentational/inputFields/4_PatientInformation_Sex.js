import React from "react";

// Styles
import {
  FormControl,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  IconButton,
} from "@material-ui/core";
import { AttachFile as AttachFileIcon } from "@material-ui/icons";

export const PatientInformation_Sex = ({
  formEditMode,
  field,
  handleClickOpenDialog,
  handleChangeRadioButton_PatientInformation_Sex,
}) => {
  // data array
  const arrRadioButtonTexts = ["Male", "Female"];

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
            Sex:
          </Typography>
        </Button>
        <input
          style={{ display: "none" }}
          accept="image/*"
          id="attachment-required-PatientInformation_Sex"
          type="file"
          disabled={
            !field.objFieldRules.boolAttachmentSupported ||
            !field.objFieldRules.boolAttachmentRequired ||
            formEditMode === 0
          }
        />
        <label
          htmlFor="attachment-required-PatientInformation_Sex"
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
      <FormControl component="fieldset">
        <RadioGroup
          value={field.strFieldValue}
          onChange={handleChangeRadioButton_PatientInformation_Sex}
        >
          <Box display="flex" alignItems="center">
            {arrRadioButtonTexts.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item}
                control={<Radio disabled={formEditMode === 0 ? true : false} />}
                label={
                  <Typography style={{ fontSize: "13.4px" }}>{item}</Typography>
                }
              />
            ))}
          </Box>
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
