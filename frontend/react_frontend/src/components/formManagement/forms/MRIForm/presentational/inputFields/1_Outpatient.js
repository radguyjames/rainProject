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

export const Outpatient = ({
  formEditMode,
  field,
  handleClickOpenDialog,
  specification,
  handleChangeRadioButton_Outpatient,
  handleChangeTextField_Outpatient,
}) => {
  return (
    <FormControl component="fieldset">
      <RadioGroup
        value={field.strFieldValue}
        onChange={handleChangeRadioButton_Outpatient}
      >
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
                Outpatient:
              </Typography>
            </Button>
            <input
              style={{ display: "none" }}
              accept="*"
              id="attachment-required-Outpatient"
              type="file"
              disabled={
                !field.objFieldRules.boolAttachmentSupported ||
                !field.objFieldRules.boolAttachmentRequired ||
                formEditMode === 0
              }
            />
            <label
              htmlFor="attachment-required-Outpatient"
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
            value="1st appt. available (Winnipeg Only)"
            control={<Radio disabled={formEditMode === 0 ? true : false} />}
            label={
              <Typography style={{ fontSize: "13.4px" }}>
                1st appt. available (Winnipeg Only)
              </Typography>
            }
          />
        </Box>
        <FormControlLabel
          value="Will travel within Manitoba for 1st available appt."
          control={<Radio disabled={formEditMode === 0 ? true : false} />}
          label={
            <Typography style={{ fontSize: "13.4px" }}>
              Will travel within Manitoba for 1st available appt.
            </Typography>
          }
        />
        <Box display="flex" alignItems="center">
          <FormControlLabel
            value="2"
            control={<Radio disabled={formEditMode === 0 ? true : false} />}
            label={
              <Typography noWrap style={{ fontSize: "13.4px" }}>
                Preferred Site - Specify:
              </Typography>
            }
          />
          <TextField
            size="small"
            disabled={
              field.strFieldValue !== "2" || formEditMode === 0 ? true : false
            }
            style={{ marginRight: "13.4px" }}
            fullWidth
            label="Preferred Site"
            multiline
            rowsMax={4}
            value={specification}
            onChange={handleChangeTextField_Outpatient}
            error={
              field.strFieldValue === "2" && specification === ""

              // !validateOutpatientInput(
              //   field.strFieldValue,
              //   specification,
              //   outpatientEmptySubmit)
              //
            }
            // helperText={
            //   field.strFieldValue === "2" && specification === ""
            //     ? "Required"
            //     : ""
            // }
          />
        </Box>
      </RadioGroup>
    </FormControl>
  );
};
