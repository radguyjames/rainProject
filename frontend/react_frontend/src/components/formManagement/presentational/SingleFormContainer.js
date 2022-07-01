import React from "react";

// Components
import { EditModeBar } from "./EditModeBar";
import { SingleForm } from "./SingleForm";

// Styles
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  FormControlLabel,
  Box,
} from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons/";

export const SingleFormContainer = ({
  currentFormId,
  formTemplateEnabled,
  handleChangeEnabled,
  formName,
  formEditMode,
  handleClickModeButton,
  handleClickUploadButton,
  handleClickTestModeButton,
  formData,
}) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        style={{ backgroundColor: "rgba(0, 0, 0, .03)" }}
      >
        <FormControlLabel
          onClick={(e) => e.stopPropagation()}
          onFocus={(e) => e.stopPropagation()}
          control={
            <Switch
              checked={formTemplateEnabled}
              onChange={handleChangeEnabled}
              id={currentFormId}
              color="primary"
              name="enabled"
            />
          }
          label={formName}
        />
      </AccordionSummary>
      <AccordionDetails>
        <Box display="flex" flexDirection="column" width={1}>
          <EditModeBar
            currentFormId={currentFormId}
            formEditMode={formEditMode}
            handleClickModeButton={handleClickModeButton}
            handleClickUploadButton={handleClickUploadButton}
            handleClickTestModeButton={handleClickTestModeButton}
          />
          <SingleForm
            currentFormId={currentFormId}
            formEditMode={formEditMode}
            formData={formData}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
