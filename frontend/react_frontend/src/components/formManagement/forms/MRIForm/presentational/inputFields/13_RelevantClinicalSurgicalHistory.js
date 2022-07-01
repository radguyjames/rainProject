import React from "react";

// Styles
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { AttachFile as AttachFileIcon } from "@material-ui/icons";

export const RelevantClinicalSurgicalHistory = ({
  formEditMode,
  field,
  handleClickOpenDialog,
  relevantClinicalSurgicalHistory,
  handleChangeCheckbox_RelevantClinicalSurgicalHistory,
  handleChangeTextField_RelevantClinicalSurgicalHistory,
}) => {
  return (
    <Box display="flex" flexDirection="column">
      <Box pl={1} display="flex" alignItems="center" borderBottom={1}>
        <Button
          disabled={formEditMode === 0 ? false : true}
          style={{
            paddingLeft: "0px",
            paddingRight: "2px",
            textTransform: "uppercase",
            minWidth: "0px",
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
            Relevant Clinical / Surgical History:
          </Typography>
        </Button>
        <input
          style={{ display: "none" }}
          accept="image/*"
          id="attachment-required-RelevantClinicalSurgicalHistory"
          type="file"
          disabled={
            !field.objFieldRules.boolAttachmentSupported ||
            !field.objFieldRules.boolAttachmentRequired ||
            formEditMode === 0
          }
        />
        <label
          htmlFor="attachment-required-RelevantClinicalSurgicalHistory"
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

      <Box px={1} display="flex" flexDirection="column">
        <Box display="flex" alignItems="center">
          <Box mr={4} display="flex" alignItems="center">
            <Typography
              noWrap
              style={
                formEditMode === 0
                  ? {
                      marginRight: "16px",
                      fontSize: "13.4px",
                      fontWeight: "bold",
                      color: "rgba(0,0,0,0.38)",
                    }
                  : {
                      marginRight: "16px",
                      fontSize: "13.4px",
                      fontWeight: "bold",
                    }
              }
            >
              Cancer Care Pathway
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  name="Cancer Care Pathway"
                  onChange={
                    handleChangeCheckbox_RelevantClinicalSurgicalHistory
                  }
                  checked={field.strFieldValue[0]["Cancer Care Pathway"]}
                  disabled={formEditMode === 0 ? true : false}
                />
              }
              label={
                <Typography noWrap style={{ fontSize: "13.4px" }}>
                  Y
                </Typography>
              }
            />
          </Box>

          <Box display="flex" alignItems="center">
            <Typography
              noWrap
              style={
                formEditMode === 0
                  ? {
                      marginRight: "16px",
                      fontSize: "13.4px",
                      fontWeight: "bold",
                      color: "rgba(0,0,0,0.38)",
                    }
                  : {
                      marginRight: "16px",
                      fontSize: "13.4px",
                      fontWeight: "bold",
                    }
              }
            >
              Previous Back Surgery?
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  name="Previous Back Surgery"
                  onChange={
                    handleChangeCheckbox_RelevantClinicalSurgicalHistory
                  }
                  checked={field.strFieldValue[1]["Previous Back Surgery"]}
                  disabled={formEditMode === 0 ? true : false}
                />
              }
              label={
                <Typography noWrap style={{ fontSize: "13.4px" }}>
                  Y
                </Typography>
              }
            />
          </Box>
        </Box>
        <TextField
          size="small"
          label="History"
          multiline
          rows={4}
          style={{ marginRight: "13.4px" }}
          value={relevantClinicalSurgicalHistory}
          onChange={handleChangeTextField_RelevantClinicalSurgicalHistory}
          disabled={formEditMode === 0 ? true : false}
        />
      </Box>
    </Box>
  );
};
