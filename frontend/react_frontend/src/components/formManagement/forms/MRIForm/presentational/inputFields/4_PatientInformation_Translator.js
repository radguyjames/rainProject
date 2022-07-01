import React from "react";

// Styles
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { AttachFile as AttachFileIcon } from "@material-ui/icons";

export const PatientInformation_Translator = ({
  formEditMode,
  field,
  handleClickOpenDialog,
  languageRequired,
  handleChangeCheckbox_PatientInformation_Translator,
  handleChangeTextField_PatientInformation_Translator,
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
            Translator
          </Typography>
        </Button>
        <input
          style={{ display: "none" }}
          accept="image/*"
          id="attachment-required-PatientInformation_Translator"
          type="file"
          disabled={
            !field.objFieldRules.boolAttachmentSupported ||
            !field.objFieldRules.boolAttachmentRequired ||
            formEditMode === 0
          }
        />
        <label
          htmlFor="attachment-required-PatientInformation_Translator"
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
      <Box width={1} display="flex" flexDirection="column">
        <Box display="flex" alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                name="Language Required"
                onChange={handleChangeCheckbox_PatientInformation_Translator}
                checked={field.strFieldValue}
                disabled={formEditMode === 0 ? true : false}
              />
            }
            label={
              <Typography noWrap style={{ fontSize: "13.4px" }}>
                Language Required:
              </Typography>
            }
          />
          <TextField
            size="small"
            fullWidth
            label="Language Required"
            multiline
            rowsMax={4}
            style={{ marginRight: "13.4px" }}
            value={languageRequired}
            onChange={handleChangeTextField_PatientInformation_Translator}
            disabled={
              field.strFieldValue === false || formEditMode === 0 ? true : false
            }
            error={field.strFieldValue === true && languageRequired === ""}
            // helperText={
            //   field.strFieldValue === true && languageRequired === ""
            //     ? "Required"
            //     : ""
            // }
          />
        </Box>
      </Box>
    </Box>
  );
};
