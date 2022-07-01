// Contains the HTML that is ultimately displayed in the browser

// Notes: since our application is handled by django there is no render() function.

import React from "react";

// Redux
import { useSelector } from "react-redux";

// React Router
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

// Components- the parts of our application. One component can contain another component. They're reusable.
import { Home } from "./components/common/home/Home";
import { Header } from "./components/common/header/Header";
import { Navbar } from "./components/common/navbar/Navbar";
import { SignIn } from "./components/registrationAndAuthentication/presentational/SignIn";
import { ForgotPassword } from "./components/registrationAndAuthentication/presentational/ForgotPassword";
import { Register } from "./components/registrationAndAuthentication/presentational/Register";
import { Applications } from "./components/common/applications/Applications";
import { FormManagement } from "./components/formManagement/container/FormManagement";
import { Upload } from "./components/upload/container/Upload";
import { Requisition } from "./components/submitForm/Requisition";
import { ProtocolPage } from "./components/submitForm/ProtocolPage";
import { Update } from "./components/submitForm/Update";
import  Scheduling  from "./components/submitForm/Scheduling";
import { OutstandingProtocols } from "./components/submitForm/OutstandingProtocols"
import { UserManagement } from "./components/userManagement/Usermanagement"
import AddUser from "./components/userManagement/AddUser"
import EditUser from "./components/userManagement/EditUser"
import Archive from "./components/requisitionArchive/Archive"
import Search from "./components/requisitionArchive/Search";
import SiteManagement from "./components/siteManagement/SiteManagement";
import EditHome from "./components/edit/EditHome";

import EditKeyword from "./components/edit/EditKeyword";
import AddKeyword from "./components/edit/AddKeyword";
import AlterKeyword from "./components/edit/AlterKeyword";

import AddProtocol from "./components/edit/AddProtocol";
import EditProtocol from "./components/edit/EditProtocol";
import AlterProtocol from "./components/edit/AlterProtocol";

import AlterMobilityRequirement from "./components/edit/AlterMobilityRequirement";
import EditMobilityRequirement from "./components/edit/EditMobilityRequirement";
import AddMobilityRequirement from "./components/edit/AddMobilityRequirement";

import AlterSedationRequirement from "./components/edit/AlterSedationRequirement";
import EditSedationRequirement from "./components/edit/EditSedationRequirement";
import AddSedationRequirement from "./components/edit/AddSedationRequirement";

import AlterPrecautionRequirement from "./components/edit/AlterPrecautionRequirement"
import AddPrecautionRequirement from "./components/edit/AddPrecautionRequirement"
import EditPrecautionRequirement from "./components/edit/EditPrecautionRequirement"

import AlterSequence from "./components/edit/AlterSequence";
import EditSequence from "./components/edit/EditSequence";
import AddSequence from "./components/edit/AddSequence";

import AlterIsolationPrecaution from "./components/edit/AlterIsolationPrecaution";
import EditIsolationPrecaution from "./components/edit/EditIsolationPrecaution";
import AddIsolationPrecaution from "./components/edit/AddIsolationPrecaution";

import AlterExamCode from "./components/edit/AlterExamCode";
import EditExamCode from "./components/edit/EditExamCode";
import AddExamCode from "./components/edit/AddExamCode";

import AlterType from "./components/edit/AlterType";
import EditType from "./components/edit/EditType";
import AddType from "./components/edit/AddType";

export const App = () => {
  const isAuthenticated = useSelector(
    (state) => state.RegistrationAndAuthenticationReducer.boolIsAuthenticated
  );

  const guestRouting = (
    <Route path="*">
      <Redirect to="/signin" />
      <Header />
      <Navbar />
      {/* https://stackoverflow.com/questions/18548465/prevent-scroll-bar-from-adding-up-to-the-width-of-page-on-chrome
        https://stackoverflow.com/questions/1417934/how-to-prevent-scrollbar-from-repositioning-web-page */}
      <div style={{ paddingLeft: "calc(100vw - 100%)" }}>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/register" component={Register} />
      </div>
    </Route>
  );

  const authRouting = (
    <Route path="*">
      <Redirect to="/apps" />
      <Header />
      <Navbar />
      {/* https://stackoverflow.com/questions/18548465/prevent-scroll-bar-from-adding-up-to-the-width-of-page-on-chrome
        https://stackoverflow.com/questions/1417934/how-to-prevent-scrollbar-from-repositioning-web-page */}
      <div style={{ paddingLeft: "calc(100vw - 100%)" }}>
        <Route exact path="/apps" component={Applications} />
        <Route exact path="/apps/formmanagement" component={FormManagement} />
        <Route exact path="/apps/upload" component={Upload} />
        <Route exact path="/apps/requisitions" component={Requisition} />
        <Route exact path="/apps/protocolmanagement" component={ProtocolPage} />
        <Route exact path="/apps/update" component={Update} /> 
        <Route exact path="/apps/scheduler" component={Scheduling} /> 
        <Route exact path="/apps/outstandingprotocols" component={OutstandingProtocols} />  
        <Route exact path="/apps/usermanagement" component={UserManagement} />  
        <Route exact path="/apps/usermanagement/add" component={AddUser} />
        <Route exact path="/apps/usermanagement/edit" component={EditUser} />
        <Route exact path="/apps/archive" component={Archive} />
        <Route exact path="/apps/search" component={Search} />
        <Route exact path="/apps/sitemanagement" component={SiteManagement} />
        <Route exact path="/apps/edit" component={EditHome} />

        <Route exact path="/apps/edit/keywords/edit" component={EditKeyword} />
        <Route exact path="/apps/edit/keywords/add" component={AddKeyword} />
        <Route exact path="/apps/edit/keywords" component={AlterKeyword} />

        <Route exact path="/apps/edit/protocols" component={AlterProtocol} />
        <Route exact path="/apps/edit/protocols/edit" component={EditProtocol} />
        <Route exact path="/apps/edit/protocols/add" component={AddProtocol} />

        <Route exact path="/apps/edit/mobilityrequirements" component={AlterMobilityRequirement} />
        <Route exact path="/apps/edit/mobilityrequirements/edit" component={EditMobilityRequirement} />
        <Route exact path="/apps/edit/mobilityrequirements/add" component={AddMobilityRequirement} />

        <Route exact path="/apps/edit/sedationrequirements" component={AlterSedationRequirement} />
        <Route exact path="/apps/edit/sedationrequirements/edit" component={EditSedationRequirement} />
        <Route exact path="/apps/edit/sedationrequirements/add" component={AddSedationRequirement} />

        <Route exact path="/apps/edit/sequences" component={AlterSequence} />
        <Route exact path="/apps/edit/sequences/edit" component={EditSequence} />
        <Route exact path="/apps/edit/sequences/add" component={AddSequence} />
        
        <Route exact path="/apps/edit/precautionrequirements" component={AlterPrecautionRequirement} />
        <Route exact path="/apps/edit/precautionrequirements/edit" component={EditPrecautionRequirement} />
        <Route exact path="/apps/edit/precautionrequirements/add" component={AddPrecautionRequirement} />

        <Route exact path="/apps/edit/isolationprecautions" component={AlterIsolationPrecaution} />
        <Route exact path="/apps/edit/isolationprecautions/edit" component={EditIsolationPrecaution} />
        <Route exact path="/apps/edit/isolationprecautions/add" component={AddIsolationPrecaution} />
        
        <Route exact path="/apps/edit/examcodes" component={AlterExamCode} />
        <Route exact path="/apps/edit/examcodes/edit" component={EditExamCode} />
        <Route exact path="/apps/edit/examcodes/add" component={AddExamCode} />

        <Route exact path="/apps/edit/types" component={AlterType} />
        <Route exact path="/apps/edit/types/edit" component={EditType} />
        <Route exact path="/apps/edit/types/add" component={AddType} />
      </div>
    </Route>
  );

  return (
    <HashRouter>
      <Switch>
        <Route path="/home">
          <Redirect to="/home#welcome" />
          <Route path="/home" component={Home} />
        </Route>

        <Route exact path="/">
          <Redirect to="/home#welcome" />
          <Route path="/home" component={Home} />
        </Route>
        {isAuthenticated ? authRouting : guestRouting}
      </Switch>
    </HashRouter>
  );
};
