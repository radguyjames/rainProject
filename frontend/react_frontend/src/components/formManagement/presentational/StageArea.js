import React from "react";

// Styles
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepButton,
} from "@material-ui/core";
import {
  BrokenImage as BrokenImageIcon,
  Warning as WarningIcon,
  ListAlt as ListAltIcon,
  LibraryAddCheck as LibraryAddCheckIcon,
  EventAvailable as EventAvailableIcon,
  FormatListNumbered as FormatListNumberedIcon,
  Archive as ArchiveIcon,
} from "@material-ui/icons/";

export const StageArea = () => {
  // data array
  const arrStageTexts = [
    "Denied/Retracted",
    "Pending",
    "Coding",
    "Timing",
    "Booking",
    "Scheduled",
    "Archived",
  ];

  return (
    <Accordion
      square
      style={{
        backgroundColor: "rgba(0, 0, 0, .03)",
      }}
    >
      <AccordionSummary style={{ minHeight: "64px" }}>
        <Box display="flex">
          <Typography>Current Stage:</Typography>
          <Box bgcolor="primary.main" color="info.contrastText" mx={1} px={1}>
            <Typography>Coding</Typography>
          </Box>
        </Box>
        <Box ml={6} display="flex">
          <Typography>Current Processing:</Typography>
          <Box mx={1}>
            <Typography>User Name</Typography>
          </Box>
        </Box>
        <Box ml={6} display="flex">
          <Typography>Created By:</Typography>
          <Box mx={1}>
            <Typography>User Name</Typography>
          </Box>
        </Box>
        <Box ml={6} display="flex">
          <Typography>Processing Time:</Typography>
          <Box mx={1}>
            {/* less than 1hr: mins, within a day: hrs, otherwise: days */}
            <Typography>21days</Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box display="flex" flexDirection="column">
          <Stepper
            nonLinear
            style={{ width: "100%", backgroundColor: "rgba(0, 0, 0, 0)" }}
            activeStep={-1}
          >
            {arrStageTexts.map((item, index) => {
              return (
                <Step
                  key={index}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  {index < 4 ? (
                    <StepButton
                      disabled={true}
                      icon={
                        index === 0 ? (
                          <WarningIcon style={{ color: "red" }} />
                        ) : index === 1 ? (
                          <BrokenImageIcon style={{ color: "#f57c00" }} />
                        ) : index === 2 ? (
                          <ListAltIcon style={{ color: "blue" }} />
                        ) : index === 3 ? (
                          <LibraryAddCheckIcon style={{ color: "green" }} />
                        ) : (
                          ""
                        )
                      }
                    >
                      {item}
                    </StepButton>
                  ) : (
                    <StepLabel
                      icon={
                        index === 4 ? (
                          <FormatListNumberedIcon style={{ color: "purple" }} />
                        ) : index === 5 ? (
                          <EventAvailableIcon />
                        ) : index === 6 ? (
                          <ArchiveIcon style={{ color: "grey" }} />
                        ) : (
                          ""
                        )
                      }
                    >
                      {item}
                    </StepLabel>
                  )}
                  {/* icon={index === 1 && <BrokenImageIcon />} didn't work */}
                </Step>
              );
            })}
          </Stepper>
          <Typography variant="subtitle2">
            By default, requisitions will be processed automatically. However,
            you could always retract any non-processing requisition(s) you've
            uploaded. Meanwhile, you could place a requisition at
            Pending/Coding/Timing stage manually by clicking the above icon.
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
