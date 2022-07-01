import React from "react";

// Components
import { MRIForm } from "../forms/MRIForm/container/MRIForm";
import { StageArea } from "./StageArea";
import { LogArea } from "./LogArea";

// Styles
import { Paper } from "@material-ui/core";

export const SingleForm = ({ currentFormId, formEditMode, formData }) => {
  // data array
  const GetForm = ({ currentFormId, formEditMode }) => {
    let objForm;
    if (currentFormId === "0") {
      objForm = <MRIForm formData={formData} formEditMode={formEditMode} />;
    } else {
      objForm = "";
    }
    return objForm;
  };

  return (
    <Paper style={{ maxWidth: "1024px" }} elevation={3}>
      <StageArea />
      <GetForm currentFormId={currentFormId} formEditMode={formEditMode} />
      <LogArea />
    </Paper>
  );
};
