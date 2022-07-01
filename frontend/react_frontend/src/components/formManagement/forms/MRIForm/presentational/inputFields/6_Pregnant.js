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

export const Pregnant = ({
  formEditMode,
  field,
  handleClickOpenDialog,
  LMP,
  handleChangeRadioButton_Pregnant,
  handleChangeTextField_Pregnant,
}) => {
  return (
    <FormControl component="fieldset">
      <RadioGroup
        value={field.strFieldValue}
        onChange={handleChangeRadioButton_Pregnant}
      >
        <Box display="flex" alignItems="center">
          <Box display="flex" alignItems="center">
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
                Pregnant?
              </Typography>
            </Button>
            <input
              style={{ display: "none" }}
              accept="image/*"
              id="attachment-required-Pregnant"
              type="file"
              disabled={
                !field.objFieldRules.boolAttachmentSupported ||
                !field.objFieldRules.boolAttachmentRequired ||
                formEditMode === 0
              }
            />
            <label
              htmlFor="attachment-required-Pregnant"
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
              LMP:
            </Typography>
          </Box>
          <TextField
            size="small"
            disabled={
              field.strFieldValue !== "Y" || formEditMode === 0 ? true : false
            }
            style={{ marginRight: "13.4px" }}
            label="yyyy/mm/dd"
            multiline
            rowsMax={4}
            value={LMP}
            onChange={handleChangeTextField_Pregnant}
            error={
              field.strFieldValue === "Y" && LMP === ""

              // !validatePregnantInput(
              //   field.strFieldValue,
              //   LMP,
              //   PregnantEmptySubmit)
              //
            }
            // helperText={
            //   field.strFieldValue === "Y" && LMP === "" ? "Required" : ""
            // }
          />
        </Box>
      </RadioGroup>
    </FormControl>
  );
};
