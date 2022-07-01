import React from "react";

// Styles
import {
  Box,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  IconButton,
} from "@material-ui/core";
import { AttachFile as AttachFileIcon } from "@material-ui/icons";

export const InpatientED = ({
  formEditMode,
  field,
  handleClickOpenDialog,
  site,
  wardRoom,
  handleChangeCheckbox_InpatientED,
  handleChangeTextField_InpatientED,
}) => {
  return (
    <Box display="flex" flexDirection="column">
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
              Inpatient/ED
            </Typography>
          </Button>
          <input
            style={{ display: "none" }}
            accept="image/*"
            id="attachment-required-InpatientED"
            type="file"
            disabled={
              !field.objFieldRules.boolAttachmentSupported ||
              !field.objFieldRules.boolAttachmentRequired ||
              formEditMode === 0
            }
          />
          <label
            htmlFor="attachment-required-InpatientED"
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
          control={
            <Checkbox
              name="InpatientED"
              onChange={handleChangeCheckbox_InpatientED}
              checked={field.strFieldValue[0]["Inpatient"]}
              disabled={formEditMode === 0 ? true : false}
            />
          }
          label={
            <Typography
              noWrap
              style={
                field.strFieldValue[0]["Inpatient"] === false ||
                formEditMode === 0
                  ? { fontSize: "13.4px", color: "rgba(0,0,0,0.38)" }
                  : { fontSize: "13.4px" }
              }
            >
              Site
            </Typography>
          }
        />
        <TextField
          size="small"
          name="Site"
          fullWidth
          label="Site"
          multiline
          rowsMax={4}
          style={{ marginRight: "13.4px" }}
          value={site}
          onChange={handleChangeTextField_InpatientED}
          disabled={
            field.strFieldValue[0]["Inpatient"] === false || formEditMode === 0
              ? true
              : false
          }
          error={field.strFieldValue[0]["Inpatient"] === true && site === ""}
          // helperText={
          //   field.strFieldValue[0]["Inpatient"] === true && site === ""
          //     ? "Required"
          //     : ""
          // }
        />
      </Box>
      <Box display="flex" alignItems="center">
        <Box mr={2}>
          <Typography
            noWrap
            style={
              field.strFieldValue[0]["Inpatient"] === false ||
              formEditMode === 0
                ? { fontSize: "13.4px", color: "rgba(0,0,0,0.38)" }
                : { fontSize: "13.4px" }
            }
          >
            Ward / Room #
          </Typography>
        </Box>

        <TextField
          size="small"
          name="Ward / Room #"
          fullWidth
          label="Ward/Room"
          multiline
          rowsMax={4}
          style={{ marginRight: "13.4px" }}
          value={wardRoom}
          onChange={handleChangeTextField_InpatientED}
          disabled={
            field.strFieldValue[0]["Inpatient"] === false || formEditMode === 0
              ? true
              : false
          }
          error={
            field.strFieldValue[0]["Inpatient"] === true && wardRoom === ""
          }
          // helperText={
          //   field.strFieldValue[0]["Inpatient"] === true && wardRoom === ""
          //     ? "Required"
          //     : ""
          // }
        />

        <FormControlLabel
          control={
            <Checkbox
              name="EMS Transport"
              onChange={handleChangeCheckbox_InpatientED}
              checked={field.strFieldValue[3]["EMS Transport"]}
              disabled={
                field.strFieldValue[0]["Inpatient"] === false ||
                formEditMode === 0
                  ? true
                  : false
              }
            />
          }
          label={
            <Typography noWrap style={{ fontSize: "13.4px" }}>
              EMS Transport
            </Typography>
          }
        />
      </Box>
    </Box>
  );
};
