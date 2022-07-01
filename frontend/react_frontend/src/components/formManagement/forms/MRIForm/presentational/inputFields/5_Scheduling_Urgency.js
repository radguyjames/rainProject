import React from "react";

// Styles
import {
  FormControl,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Typography,
  Box,
  IconButton,
} from "@material-ui/core";
import { AttachFile as AttachFileIcon } from "@material-ui/icons";

export const Scheduling_Urgency = ({
  formEditMode,
  field,
  handleClickOpenDialog,
  requestedDate,
  handleChangeRadioButton_Scheduling_Urgency,
  handleChangeTextField_Scheduling_Urgency,
}) => {
  // data array
  const arrRadioButtonTexts = ["Emergent", "Urgent", "Elective"];

  return (
    <FormControl component="fieldset">
      <RadioGroup
        value={field.strFieldValue}
        onChange={handleChangeRadioButton_Scheduling_Urgency}
      >
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
                Urgency:
              </Typography>
            </Button>
            <input
              style={{ display: "none" }}
              accept="image/*"
              id="attachment-required-Scheduling_Urgency"
              type="file"
              disabled={
                !field.objFieldRules.boolAttachmentSupported ||
                !field.objFieldRules.boolAttachmentRequired ||
                formEditMode === 0
              }
            />
            <label
              htmlFor="attachment-required-Scheduling_Urgency"
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
          {arrRadioButtonTexts.map((item, index) => (
            <FormControlLabel
              key={index}
              value={item}
              control={<Radio disabled={formEditMode === 0 ? true : false} />}
              label={
                <Typography noWrap style={{ fontSize: "13.4px" }}>
                  {item}
                  {index === 0 && (
                    <span style={{ fontSize: "12px" }}>
                      &nbsp;(contact radiologist directly)
                    </span>
                  )}
                </Typography>
              }
            />
          ))}
          <Box mr={2}>
            <Typography
              noWrap
              style={
                field.strFieldValue !== "Elective" || formEditMode === 0
                  ? { fontSize: "13.4px", color: "rgba(0,0,0,0.38)" }
                  : { fontSize: "13.4px" }
              }
            >
              Requested Date:
            </Typography>
          </Box>
          <TextField
            size="small"
            disabled={
              field.strFieldValue !== "Elective" || formEditMode === 0
                ? true
                : false
            }
            style={{ marginRight: "13.4px", paddingRight: "8px" }}
            fullWidth
            label="Requested Date:"
            multiline
            rowsMax={4}
            value={requestedDate}
            onChange={handleChangeTextField_Scheduling_Urgency}
            error={
              field.strFieldValue === "Elective" && requestedDate === ""

              // !validateScheduling_UrgencyInput(
              //   field.strFieldValue,
              //   requestedDate,
              //   Scheduling_UrgencyEmptySubmit)
              //
            }
            // helperText={
            //   field.strFieldValue === "Elective" && requestedDate === ""
            //     ? "Required"
            //     : ""
            // }
          />
        </Box>
      </RadioGroup>
    </FormControl>
  );
};
