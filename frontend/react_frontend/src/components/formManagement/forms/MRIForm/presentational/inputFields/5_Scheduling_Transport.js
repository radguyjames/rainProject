import React from "react";

// Styles
import {
  Box,
  Button,
  Typography,
  FormControlLabel,
  FormGroup,
  Checkbox,
  IconButton,
} from "@material-ui/core";
import { AttachFile as AttachFileIcon } from "@material-ui/icons";

export const Scheduling_Transport = ({
  formEditMode,
  field,
  handleClickOpenDialog,
  handleChangeCheckbox_Scheduling_Transport,
}) => {
  // data array
  const arrCheckboxTexts = [
    "Ambulatory",
    "Wheelchair",
    "Bed/Stretcher",
    "Lift Required",
  ];

  return (
    <Box pl={4} display="flex" alignItems="center">
      <Box display="flex">
        <Button
          disabled={formEditMode === 0 ? false : true}
          style={{
            paddingLeft: "0px",
            paddingRight: "2px",
          }}
          onClick={handleClickOpenDialog}
        >
          <Typography
            noWrap
            style={{
              display: "flex",
              fontSize: "13.4px",
              fontWeight: "bold",
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
            Transport:
          </Typography>
        </Button>
        <input
          style={{ display: "none" }}
          accept="image/*"
          id="attachment-required-Scheduling_Transport"
          type="file"
          disabled={
            !field.objFieldRules.boolAttachmentSupported ||
            !field.objFieldRules.boolAttachmentRequired ||
            formEditMode === 0
          }
        />
        <label
          htmlFor="attachment-required-Scheduling_Transport"
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
      {arrCheckboxTexts.map((item, index) => (
        <FormGroup key={index}>
          <FormControlLabel
            control={
              <Checkbox
                name={item}
                onChange={handleChangeCheckbox_Scheduling_Transport}
                checked={field.strFieldValue[index][item]}
                disabled={formEditMode === 0 ? true : false}
              />
            }
            label={
              <Typography noWrap style={{ fontSize: "13.4px" }}>
                {item}
              </Typography>
            }
          />
        </FormGroup>
      ))}
    </Box>
  );
};
