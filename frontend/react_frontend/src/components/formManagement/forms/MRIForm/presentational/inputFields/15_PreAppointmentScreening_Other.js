import React from "react";

// Styles
import {
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  IconButton,
  TextField,
} from "@material-ui/core";
import { AttachFile as AttachFileIcon } from "@material-ui/icons";

export const PreAppointmentScreening_Other = ({
  formEditMode,
  field,
  other,
  handleClickOpenDialog,
  handleChangeRadioButton_PreAppointmentScreening_Other,
  handleChangeTextField_PreAppointmentScreening_Other,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <Box pl={1} display="flex" alignItems="center">
        <Button
          disabled={formEditMode === 0 ? false : true}
          style={{
            paddingLeft: "0px",
            paddingRight: "2px",
            textTransform: "none",
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
            Other:
          </Typography>
        </Button>
        <input
          style={{ display: "none" }}
          accept="image/*"
          id="attachment-required-PreAppointmentScreening_Other"
          type="file"
          disabled={
            !field.objFieldRules.boolAttachmentSupported ||
            !field.objFieldRules.boolAttachmentRequired ||
            formEditMode === 0
          }
        />
        <label
          htmlFor="attachment-required-PreAppointmentScreening_Other"
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
      <Box flexGrow={1} style={{ paddingRight: "21.4px" }}>
        <TextField
          size="small"
          disabled={
            field.strFieldValue !== "Y" || formEditMode === 0 ? true : false
          }
          style={{ marginRight: "13.4px" }}
          fullWidth
          label="Other..."
          multiline
          rowsMax={4}
          value={other}
          onChange={handleChangeTextField_PreAppointmentScreening_Other}
          error={
            field.strFieldValue === "Y" && other === ""

            // !validateOutpatientInput(
            //   field.strFieldValue,
            //   other,
            //   outpatientEmptySubmit)
            //
          }
          // helperText={
          //   field.strFieldValue === "Y" && other === ""
          //     ? "Required"
          //     : ""
          // }
        />
      </Box>
      <RadioGroup
        value={field.strFieldValue}
        onChange={handleChangeRadioButton_PreAppointmentScreening_Other}
      >
        <Box display="flex" alignItems="center">
          <Box
            height={46}
            width={66}
            borderLeft={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <FormControlLabel
              style={{ marginLeft: "0px", marginRight: "0px" }}
              value="Y"
              control={<Radio disabled={formEditMode === 0 ? true : false} />}
              label={<Typography style={{ fontSize: "13.4px" }}></Typography>}
            />
          </Box>
          <Box
            height={46}
            width={66}
            borderLeft={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <FormControlLabel
              style={{ marginLeft: "0px", marginRight: "0px" }}
              value="N"
              control={<Radio disabled={formEditMode === 0 ? true : false} />}
              label={<Typography style={{ fontSize: "13.4px" }}></Typography>}
            />
          </Box>
        </Box>
      </RadioGroup>
    </Box>
  );
};
