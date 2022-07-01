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
} from "@material-ui/core";
import { AttachFile as AttachFileIcon } from "@material-ui/icons";

export const PreAppointmentScreening_SurgicalImplants = ({
  formEditMode,
  field,
  handleClickOpenDialog,
  handleChangeRadioButton_PreAppointmentScreening_SurgicalImplants,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <Box pl={1} flexGrow={1} display="flex" alignItems="center">
        <Button
          disabled={formEditMode === 0 ? false : true}
          style={{
            paddingLeft: "0px",
            paddingRight: "2px",
            textTransform: "none",
            paddingTop: "0px",
            paddingBottom: "0px",
          }}
          onClick={handleClickOpenDialog}
        >
          <Typography
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "13.4px",
            }}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <span
                style={
                  field.objFieldRules.boolRequired
                    ? { visibility: "visible" }
                    : { visibility: "hidden" }
                }
              >
                *
              </span>
              Surgical implants
            </span>
            <span style={{ fontSize: "12px", textAlign: "left" }}>
              (e.g. aneurysm/ surgical clips, coil, eye / ear implant,
              electrodes)
            </span>
          </Typography>
        </Button>
        <input
          style={{ display: "none" }}
          accept="image/*"
          id="attachment-required-PreAppointmentScreening_SurgicalImplants"
          type="file"
          disabled={
            !field.objFieldRules.boolAttachmentSupported ||
            !field.objFieldRules.boolAttachmentRequired ||
            formEditMode === 0
          }
        />
        <label
          htmlFor="attachment-required-PreAppointmentScreening_SurgicalImplants"
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

      <RadioGroup
        value={field.strFieldValue}
        onChange={
          handleChangeRadioButton_PreAppointmentScreening_SurgicalImplants
        }
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
