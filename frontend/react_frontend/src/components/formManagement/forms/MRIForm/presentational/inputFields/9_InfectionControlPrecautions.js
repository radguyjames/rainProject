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

export const InfectionControlPrecautions = ({
  formEditMode,
  field,
  handleClickOpenDialog,
  specification2,
  handleChangeRadioButton_InfectionControlPrecautions,
  handleChangeTextField_InfectionControlPrecautions,
}) => {
  return (
    <FormControl component="fieldset">
      <RadioGroup
        value={field.strFieldValue}
        onChange={handleChangeRadioButton_InfectionControlPrecautions}
      >
        <Box display="flex" alignItems="center">
          <Box display="flex" alignItems="center">
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
                Infection control precautions?
              </Typography>
            </Button>
            <input
              style={{ display: "none" }}
              accept="image/*"
              id="attachment-required-InfectionControlPrecautions"
              type="file"
              disabled={
                !field.objFieldRules.boolAttachmentSupported ||
                !field.objFieldRules.boolAttachmentRequired ||
                formEditMode === 0
              }
            />
            <label
              htmlFor="attachment-required-InfectionControlPrecautions"
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
          <FormControlLabel
            value="Y"
            control={<Radio disabled={formEditMode === 0 ? true : false} />}
            label={<Typography style={{ fontSize: "13.4px" }}>Y</Typography>}
          />

          <FormControlLabel
            value="N"
            control={<Radio disabled={formEditMode === 0 ? true : false} />}
            label={<Typography style={{ fontSize: "13.4px" }}>N</Typography>}
          />
          <Box mr={2}>
            <Typography
              style={
                field.strFieldValue !== "Y" || formEditMode === 0
                  ? { fontSize: "13.4px", color: "rgba(0,0,0,0.38)" }
                  : { fontSize: "13.4px" }
              }
            >
              Specify:
            </Typography>
          </Box>
          <TextField
            size="small"
            fullWidth
            disabled={
              field.strFieldValue !== "Y" || formEditMode === 0 ? true : false
            }
            style={{ marginRight: "13.4px" }}
            label="Infection control precautions"
            multiline
            rowsMax={4}
            value={specification2}
            onChange={handleChangeTextField_InfectionControlPrecautions}
            error={
              field.strFieldValue === "Y" && specification2 === ""

              // !validateInfectionControlPrecautionsInput(
              //   field.strFieldValue,
              //   specification2,
              //   InfectionControlPrecautionsEmptySubmit)
              //
            }
            // helperText={
            //   field.strFieldValue === "Y" && specification2 === ""
            //     ? "Required"
            //     : ""
            // }
          />
        </Box>
      </RadioGroup>
    </FormControl>
  );
};
