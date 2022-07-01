import React, { Fragment } from "react";

// Styles
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import { AttachFile as AttachFileIcon } from "@material-ui/icons";

export const ForIVContrastExams = ({
  formEditMode,
  field,
  handleClickOpenDialog,
  SCr,
  eGFR,
  Date,
  handleChangeTextField_ForIVContrastExams,
  handleChangeRadioButton_ForIVContrastExams,
  handleChangeRadioButton_ForIVContrastExams2,
}) => {
  // data array
  const arrTextFieldTexts = [
    { text: "SCr", value: SCr },
    { text: "eGFR", value: eGFR },
    { text: "Date", value: Date },
  ];

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
            For iv contrast exams
          </Typography>
        </Button>
        <input
          style={{ display: "none" }}
          accept="image/*"
          id="attachment-required-ForIVContrastExams"
          type="file"
          disabled={
            !field.objFieldRules.boolAttachmentSupported ||
            !field.objFieldRules.boolAttachmentRequired ||
            formEditMode === 0
          }
        />
        <label
          htmlFor="attachment-required-ForIVContrastExams"
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

      <Box pl={1} display="flex" flexDirection="column">
        <Box display="flex" alignItems="center">
          <RadioGroup
            value={field.strFieldValue}
            onChange={handleChangeRadioButton_ForIVContrastExams}
          >
            <Box display="flex" alignItems="center">
              <FormControlLabel
                value="Y"
                control={<Radio disabled={formEditMode === 0 ? true : false} />}
                label={
                  <Typography style={{ fontSize: "13.4px" }}>Y</Typography>
                }
              />

              <FormControlLabel
                value="N"
                control={<Radio disabled={formEditMode === 0 ? true : false} />}
                label={
                  <Typography style={{ fontSize: "13.4px" }}>N</Typography>
                }
              />
            </Box>
          </RadioGroup>
          <Box mr={1}>
            <Typography
              style={
                field.strFieldValue !== "Y" || formEditMode === 0
                  ? { fontSize: "13.4px", color: "rgba(0,0,0,0.38)" }
                  : { fontSize: "13.4px" }
              }
            >
              Renal disease (<span style={{ fontWeight: "bold" }}>Any of:</span>{" "}
              Dialysis, Renal transplant, Single kidney, kidney surgery, cancer
              involving kidney(s))
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Box mr={2}>
            <Typography
              noWrap
              style={
                field.strFieldValue !== "Y" || formEditMode === 0
                  ? { fontSize: "13.4px", color: "rgba(0,0,0,0.38)" }
                  : { fontSize: "13.4px" }
              }
            >
              If Y, then please provide most recent
            </Typography>
          </Box>
          {arrTextFieldTexts.map((item, index) => (
            <Fragment key={index}>
              <Box mr={2}>
                <Typography
                  style={
                    field.strFieldValue !== "Y" || formEditMode === 0
                      ? { fontSize: "13.4px", color: "rgba(0,0,0,0.38)" }
                      : { fontSize: "13.4px" }
                  }
                >
                  {item.text}:
                </Typography>
              </Box>
              <TextField
                size="small"
                disabled={
                  field.strFieldValue !== "Y" || formEditMode === 0
                    ? true
                    : false
                }
                style={{ marginRight: "13.4px" }}
                multiline
                rowsMax={4}
                name={item.text}
                value={item.value}
                onChange={handleChangeTextField_ForIVContrastExams}
                error={
                  field.strFieldValue === "Y" && item.value === ""

                  // !validateInfectionControlPrecautionsInput(
                  //   field.strFieldValue,
                  //   specification2,
                  //   InfectionControlPrecautionsEmptySubmit)
                  //
                }
                // helperText={
                //   field.strFieldValue === "Y" && item.value === ""
                //     ? "Required"
                //     : ""
                // }
              />
            </Fragment>
          ))}
          <Box display="flex" alignItems="center" borderLeft={1} borderTop={1}>
            <Box pl={1} mr={2}>
              <Typography
                noWrap
                style={
                  field.strFieldValue !== "Y" || formEditMode === 0
                    ? { fontSize: "13.4px", color: "rgba(0,0,0,0.38)" }
                    : { fontSize: "13.4px" }
                }
              >
                PICC / CVC / Port?
              </Typography>
            </Box>
            <RadioGroup
              value={field.strFieldValue2}
              onChange={handleChangeRadioButton_ForIVContrastExams2}
            >
              <Box display="flex" alignItems="center">
                <FormControlLabel
                  value="Y"
                  control={
                    <Radio
                      disabled={
                        field.strFieldValue !== "Y" || formEditMode === 0
                          ? true
                          : false
                      }
                    />
                  }
                  label={
                    <Typography
                      style={
                        field.strFieldValue === "Y" &&
                        field.strFieldValue2 === ""
                          ? { fontSize: "13.4px", color: "red" }
                          : { fontSize: "13.4px" }
                      }
                    >
                      Y
                    </Typography>
                  }
                />

                <FormControlLabel
                  value="N"
                  control={
                    <Radio
                      disabled={
                        field.strFieldValue !== "Y" || formEditMode === 0
                          ? true
                          : false
                      }
                    />
                  }
                  label={
                    <Typography
                      style={
                        field.strFieldValue === "Y" &&
                        field.strFieldValue2 === ""
                          ? { fontSize: "13.4px", color: "red" }
                          : { fontSize: "13.4px" }
                      }
                    >
                      N
                    </Typography>
                  }
                />
              </Box>
            </RadioGroup>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
