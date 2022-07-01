import React from "react";

// Styles
import {
  Box,
  Button,
  Typography,
  FormControlLabel,
  FormGroup,
  Checkbox,
  TextField,
  IconButton,
} from "@material-ui/core";
import { AttachFile as AttachFileIcon } from "@material-ui/icons";

export const EDOutpatientFollowUpWith = ({
  formEditMode,
  field,
  handleClickOpenDialog,
  timeOrderPlaced,
  handleChangeCheckbox_EDOutpatientFollowUpWith,
  handleChangeTextField_EDOutpatientFollowUpWith,
}) => {
  // data array
  const arrCheckboxTexts = [
    "Time order placed:",
    "ED Physician",
    "Primary Care Provider",
  ];

  return (
    <Box display="flex" alignItems="center">
      <Box flexShrink={1}>
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
              style={{
                display: "flex",
                fontSize: "13.4px",
                fontWeight: "bold",
                textAlign: "start",
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
              ED Outpatient Follow up with:
            </Typography>
          </Button>
          <input
            style={{ display: "none" }}
            accept="image/*"
            id="attachment-required-EDOutpatientFollowUpWith"
            type="file"
            disabled={
              !field.objFieldRules.boolAttachmentSupported ||
              !field.objFieldRules.boolAttachmentRequired ||
              formEditMode === 0
            }
          />
          <label
            htmlFor="attachment-required-EDOutpatientFollowUpWith"
            style={{ width: "26px" }}
          >
            <IconButton
              component="span"
              style={
                field.objFieldRules.boolAttachmentRequired
                  ? {
                      visibility: "visible",
                      paddingLeft: "0px",
                      paddingRight: "8px",
                    }
                  : { visibility: "hidden" }
              }
            >
              <AttachFileIcon style={{ fontSize: "20px" }} />
            </IconButton>
          </label>
        </Box>
      </Box>
      <Box width={1} display="flex" flexDirection="column">
        {arrCheckboxTexts.map((item, index) => (
          <FormGroup key={index}>
            {index === 0 ? (
              <Box display="flex" alignItems="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      name={item}
                      onChange={handleChangeCheckbox_EDOutpatientFollowUpWith}
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
                <TextField
                  size="small"
                  fullWidth
                  label="Time"
                  multiline
                  rowsMax={4}
                  style={{ marginRight: "13.4px" }}
                  value={timeOrderPlaced}
                  onChange={handleChangeTextField_EDOutpatientFollowUpWith}
                  disabled={
                    field.strFieldValue[0]["Time order placed:"] === false ||
                    formEditMode === 0
                      ? true
                      : false
                  }
                  error={
                    field.strFieldValue[0]["Time order placed:"] === true &&
                    timeOrderPlaced === ""
                  }
                  // helperText={
                  //   field.strFieldValue[0]["Time order placed:"] === true &&
                  //   timeOrderPlaced === ""
                  //     ? "Required"
                  //     : ""
                  // }
                />
              </Box>
            ) : (
              <FormControlLabel
                control={
                  <Checkbox
                    name={item}
                    onChange={handleChangeCheckbox_EDOutpatientFollowUpWith}
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
            )}
          </FormGroup>
        ))}
      </Box>
    </Box>
  );
};
