import React from "react";

// Styles
import {
  AppBar,
  Box,
  Button,
  Tabs,
  Tab,
  Typography,
  Grow,
} from "@material-ui/core";
import {
  Edit as EditIcon,
  PlaylistAddCheck as PlaylistAddCheckIcon,
  Backup as BackupIcon,
  LowPriority as LowPriorityIcon,
  DeleteSweep as DeleteSweepIcon,
} from "@material-ui/icons/";

export const EditModeBar = ({
  currentFormId,
  formEditMode,
  handleClickModeButton,
  handleClickUploadButton,
  handleClickTestModeButton,
}) => {
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index, currentFormId) {
    return {
      id: index,
      title: currentFormId,
    };
  }

  const _handleClickUploadButton = (e) => {
    let uploadData = new FormData();
    if (
      e.target.files[0].size !== undefined &&
      e.target.files[0].size > 0 &&
      e.target.files[0].type === "application/pdf"
    ) {
      uploadData.append("filename", e.target.files[0].name);
      uploadData.append("file", e.target.files[0]);
      e.target.value = null;
    }
    handleClickUploadButton(uploadData);
  };

  // data array
  const arrModeChoices = [
    {
      strModeName: "Edit Mode",
      arrModeTexts: [
        "Edit Mode - Click any field name and set up validation rules associated with it.",
        "- Asterisk Icon: field is required.",
        "- Paperclip Icon: field expects an attachment.",
        "- When bypass allowed is checked, RAIN will ignore existing rules.",
        "",
        "",
      ],
    },
    {
      strModeName: "Test Mode",
      arrModeTexts: [
        "Test Mode - Fill out the form and test against all validation rules.",
        "- Upload Button: populate the form by uploading a file. You could also enter/modify form data manually.",
        "- Test Button: check whether the form data satisfy each validation rule.",
        "- Clear Button: clear existing data.",
      ],
    },
  ];

  const arrTestModeButtons = [
    {
      text: "Upload",
      timeout: 3000,
      icon: <BackupIcon />,
      bgColor: "#4151b5",
      name: "upload",
      associatedMethod: "",
    },
    {
      text: "Test",
      timeout: 4500,
      icon: <LowPriorityIcon />,
      bgColor: "#388e3c",
      name: "test",
      associatedMethod: "",
    },
    {
      text: "Clear",
      timeout: 6000,
      icon: <DeleteSweepIcon />,
      bgColor: "#f57c00",
      name: "clear",
      associatedMethod: "",
    },
  ];

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          value={formEditMode}
          onChange={handleClickModeButton}
        >
          {arrModeChoices.map((item, index) => (
            <Tab
              key={index}
              label={item.strModeName}
              {...a11yProps(index, currentFormId)}
              icon={index === 0 ? <EditIcon /> : <PlaylistAddCheckIcon />}
            />
          ))}
        </Tabs>
      </AppBar>
      {arrModeChoices.map((item, index) => (
        <TabPanel key={index} value={formEditMode} index={index}>
          {item.arrModeTexts.map((text, index) => (
            <Grow
              key={index}
              in={true}
              style={{ transformOrigin: "0 0 0" }}
              {...{ timeout: 1000 }}
            >
              <Typography
                component={"span"}
                style={{ width: "100%", display: "inline-block" }}
                gutterBottom={index === 0}
              >
                {text}
              </Typography>
            </Grow>
          ))}
          {index === 1 && (
            <div>
              {arrTestModeButtons.map((item, index) =>
                index === 0 ? (
                  <div>
                    <input
                      accept="*"
                      style={{ display: "none" }}
                      id="contained-button-file"
                      type="file"
                      onChange={_handleClickUploadButton}
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="contained"
                        style={{
                          margin: "6px",
                          backgroundColor: item.bgColor,
                          color: "#fff",
                        }}
                        component="span"
                      >
                        Upload
                      </Button>
                    </label>
                  </div>
                ) : (
                  <Button
                    key={index}
                    variant="contained"
                    startIcon={item.icon}
                    style={{
                      margin: "6px",
                      backgroundColor: item.bgColor,
                      color: "#fff",
                    }}
                    name={item.name}
                    onClick={handleClickTestModeButton}
                    title={currentFormId}
                  >
                    {item.text}
                  </Button>
                )
              )}
            </div>
          )}
        </TabPanel>
      ))}
    </div>
  );
};
