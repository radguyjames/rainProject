import React, { useState, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";

// React Router
import { Link, Redirect } from "react-router-dom";

// component
import { register } from "../../stateManagement/actions/RegistrationAndAuthenticationAction";
import { getUsernameExists } from "../../stateManagement/actions/RegistrationAndAuthenticationAction";

// Styles
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  Done as DoneIcon,
  VisibilityOutlined as Visibility,
  VisibilityOffOutlined as VisibilityOff,
} from "@material-ui/icons";

// export array for sign in reference
export const siteArray = ["Site1", "Site2", "Site3", "Site4", "Site5", "Site6"];
export const departmentArray = [
  "Department1",
  "Department2",
  "Department3",
  "Department4",
  "Department5",
  "Department6",
];

export const Register = () => {
  const isAuthenticated = useSelector(
    (state) => state.RegistrationAndAuthenticationReducer.boolIsAuthenticated
  );
  useEffect(() => {
    if (isAuthenticated) return <Redirect to="/apps" />;
  }, [isAuthenticated]);

  /* #region  icon&title section */
  // component
  const iconAndTitle = (
    <div>
      <Avatar style={{ backgroundColor: "#e33371", margin: "8px" }}>
        <AccountCircleOutlinedIcon />
      </Avatar>
      <Typography noWrap variant="h5">
        Register
      </Typography>
    </div>
  );
  /* #endregion */

  /* #region  username section */
  // submit validation
  const [usernameFirstTimeSubmit, setUsernameFirstTimeSubmit] = useState(true);
  const handleUsernameFirstTimeSubmit = (bool) => {
    setUsernameFirstTimeSubmit(bool);
  };

  // filling validation
  const validUsernameInput = (username, firstTimeSubmit) => {
    // https://stackoverflow.com/questions/52188192/what-is-the-simplest-and-shortest-way-for-validating-an-email-in-react
    let regexp = /^(([^<div>()[\]\\.,;:\s@"]+(\.[^<div>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return firstTimeSubmit ? true : username !== "" && regexp.test(username);
  };

  // state
  const [username, setUsername] = useState("");
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
    handleUsernameFirstTimeSubmit(false);
  };

  // get username exists
  const usernameExists = useSelector(
    (state) => state.RegistrationAndAuthenticationReducer.objUsernameExists
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (validUsernameInput(username, usernameFirstTimeSubmit)) {
      getUsernameExists({ username: username }, dispatch);
    }
  }, [username, usernameFirstTimeSubmit, dispatch]);

  // component
  const usernameInput = (
    <TextField
      autoFocus
      fullWidth
      label="User Name (Email)"
      margin="normal"
      name="username"
      onChange={handleChangeUsername}
      required
      value={username}
      variant="outlined"
      error={
        !validUsernameInput(username, usernameFirstTimeSubmit) ||
        (validUsernameInput(username, usernameFirstTimeSubmit) &&
          usernameExists !== false)
      }
      helperText={
        validUsernameInput(username, usernameFirstTimeSubmit)
          ? usernameExists !== false
            ? "Username already exists. Please sign in."
            : ""
          : "You have entered an invalid email address. Please try again."
      }
    />
  );
  /* #endregion */

  /* #region  password section */
  // submit validation
  const [password1FirstTimeSubmit, setPassword1FirstTimeSubmit] = useState(
    true
  );
  const handlePassword1FirstTimeSubmit = (bool) => {
    setPassword1FirstTimeSubmit(bool);
  };
  const [password2FirstTimeSubmit, setPassword2FirstTimeSubmit] = useState(
    true
  );
  const handlePassword2FirstTimeSubmit = (bool) => {
    setPassword2FirstTimeSubmit(bool);
  };

  // filling validation
  const validPasswordInput = (password, FirstTimeSubmit) => {
    // https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    let regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return FirstTimeSubmit ? true : password !== "" && regexp.test(password);
  };
  const passwordsMatch = (password1, password2) => {
    return password1 === password2;
  };

  // password hiding
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // state
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const handleChangePassword = (e) => {
    if (e.target.name === "password1") {
      setPassword1(e.target.value);
      handlePassword1FirstTimeSubmit(false);
    }
    if (e.target.name === "password2") {
      setPassword2(e.target.value);
      handlePassword2FirstTimeSubmit(false);
    }
  };

  // data array
  const passwords = [
    {
      label: "Password",
      name: "password1",
      value: password1,
      width: 85,
      submitConstName: password1FirstTimeSubmit,
    },
    {
      label: "Re-enter Password",
      name: "password2",
      value: password2,
      width: 155,
      submitConstName: password2FirstTimeSubmit,
    },
  ];

  // component
  const passwordInput = (
    <div>
      {passwords.map((item, index) => (
        <FormControl
          fullWidth
          margin="normal"
          required
          variant="outlined"
          key={index}
        >
          {!validPasswordInput(item.value, item.submitConstName) ||
          !passwordsMatch(password1, password2) ? (
            <InputLabel style={{ color: "#f44336" }}>{item.label}</InputLabel>
          ) : (
            <InputLabel>{item.label}</InputLabel>
          )}

          <OutlinedInput
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end" onClick={handleClickShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={item.width}
            name={item.name}
            onChange={handleChangePassword}
            type={showPassword ? "text" : "password"}
            value={item.value}
            error={
              !validPasswordInput(item.value, item.submitConstName) ||
              !passwordsMatch(password1, password2)
            }
          />
          <FormHelperText style={{ color: "#f44336" }}>
            {validPasswordInput(item.value, item.submitConstName)
              ? passwordsMatch(password1, password2)
                ? ""
                : "Passwords Do NOT Match!"
              : "Password must contain at least eight characters, including one uppercase letter, one lowercase letter, one number and one special character. Please try again."}
          </FormHelperText>
        </FormControl>
      ))}
    </div>
  );
  /* #endregion */

  /* #region  first, last name & middle initial section */
  // submit validation
  const [firstNameFirstTimeSubmit, setFirstNameFirstTimeSubmit] = useState(
    true
  );
  const handleFirstNameFirstTimeSubmit = (bool) => {
    setFirstNameFirstTimeSubmit(bool);
  };
  const [lastNameFirstTimeSubmit, setLastNameFirstTimeSubmit] = useState(true);
  const handleLastNameFirstTimeSubmit = (bool) => {
    setLastNameFirstTimeSubmit(bool);
  };

  // filling validation
  const validFirstOrLastNameInput = (firstOrLastName, FirstTimeSubmit) => {
    let regexp = /^[a-zA-Z]{1,}$/;
    return FirstTimeSubmit
      ? true
      : firstOrLastName !== "" && regexp.test(firstOrLastName);
  };

  // state
  const [firstName, setFirstName] = useState("");
  const [middleInitial, setMiddleInitial] = useState("");
  const [lastName, setLastName] = useState("");
  const handleChangeUserName = (e) => {
    if (e.target.name === "firstName") {
      setFirstName(e.target.value.replace(/[^a-zA-Z]/g, ""));
      handleFirstNameFirstTimeSubmit(false);
    }
    if (e.target.name === "middleInitial") {
      setMiddleInitial(e.target.value.replace(/[^a-zA-Z]/g, ""));
    }
    if (e.target.name === "lastName") {
      setLastName(e.target.value.replace(/[^a-zA-Z]/g, ""));
      handleLastNameFirstTimeSubmit(false);
    }
  };

  // data array
  const name = [
    {
      label: "First Name",
      name: "firstName",
      value: firstName,
      xs: 5,
      submitConstName: firstNameFirstTimeSubmit,
    },
    {
      label: "Middle Initial",
      name: "middleInitial",
      value: middleInitial,
      xs: 2,
    },
    {
      label: "Last Name",
      name: "lastName",
      value: lastName,
      xs: 5,
      submitConstName: lastNameFirstTimeSubmit,
    },
  ];

  // component
  const nameInput = (
    <Grid container spacing={2}>
      {name.map((item, index) =>
        index === 1 ? (
          <Grid item xs={item.xs} key={index}>
            <TextField
              fullWidth
              label={item.label}
              margin="normal"
              name={item.name}
              onChange={handleChangeUserName}
              value={item.value}
              variant="outlined"
              inputProps={{ maxLength: "1" }}
            />
          </Grid>
        ) : (
          <Grid item xs={item.xs} key={index}>
            <TextField
              fullWidth
              label={item.label}
              margin="normal"
              name={item.name}
              onChange={handleChangeUserName}
              required
              value={item.value}
              variant="outlined"
              error={
                !validFirstOrLastNameInput(item.value, item.submitConstName)
              }
              helperText={
                validFirstOrLastNameInput(item.value, item.submitConstName)
                  ? ""
                  : "Required field."
              }
            />
          </Grid>
        )
      )}
    </Grid>
  );
  /* #endregion */

  /* #region  contact section */
  // submit validation
  const [phonePart1FirstTimeSubmit, setPhonePart1FirstTimeSubmit] = useState(
    true
  );
  const handlePhonePart1FirstTimeSubmit = (bool) => {
    setPhonePart1FirstTimeSubmit(bool);
  };
  const [phonePart2FirstTimeSubmit, setPhonePart2FirstTimeSubmit] = useState(
    true
  );
  const handlePhonePart2FirstTimeSubmit = (bool) => {
    setPhonePart2FirstTimeSubmit(bool);
  };
  const [phonePart3FirstTimeSubmit, setPhonePart3FirstTimeSubmit] = useState(
    true
  );
  const handlePhonePart3FirstTimeSubmit = (bool) => {
    setPhonePart3FirstTimeSubmit(bool);
  };

  // filling validation
  const validPhonePartInput = (phonePart, targetName, FirstTimeSubmit) => {
    let regexp;
    if (targetName === "phonePart3") {
      regexp = /^\d{4,4}$/;
    } else {
      regexp = /^\d{3,3}$/;
    }
    return FirstTimeSubmit ? true : phonePart !== "" && regexp.test(phonePart);
  };

  // state
  const [phonePart1, setPhonePart1] = useState("");
  const [phonePart2, setPhonePart2] = useState("");
  const [phonePart3, setPhonePart3] = useState("");
  const [faxPart1, setFaxPart1] = useState("");
  const [faxPart2, setFaxPart2] = useState("");
  const [faxPart3, setFaxPart3] = useState("");
  const handleChangeContact = (e) => {
    if (e.target.name === "phonePart1") {
      setPhonePart1(e.target.value.replace(/[^0-9]/g, ""));
      handlePhonePart1FirstTimeSubmit(false);
    }
    if (e.target.name === "phonePart2") {
      setPhonePart2(e.target.value.replace(/[^0-9]/g, ""));
      handlePhonePart2FirstTimeSubmit(false);
    }
    if (e.target.name === "phonePart3") {
      setPhonePart3(e.target.value.replace(/[^0-9]/g, ""));
      handlePhonePart3FirstTimeSubmit(false);
    }
    if (e.target.name === "faxPart1") {
      setFaxPart1(e.target.value.replace(/[^0-9]/g, ""));
    }
    if (e.target.name === "faxPart2") {
      setFaxPart2(e.target.value.replace(/[^0-9]/g, ""));
    }
    if (e.target.name === "faxPart3") {
      setFaxPart3(e.target.value.replace(/[^0-9]/g, ""));
    }
  };

  // data array
  const contact = [
    {
      contactType: [
        {
          name: "phonePart1",
          value: phonePart1,
          xs: 2,
          submitConstName: phonePart1FirstTimeSubmit,
        },
        {
          name: "phonePart2",
          value: phonePart2,
          xs: 2,
          submitConstName: phonePart2FirstTimeSubmit,
        },
        {
          name: "phonePart3",
          value: phonePart3,
          xs: 2,
          submitConstName: phonePart3FirstTimeSubmit,
        },
      ],
    },
    {
      contactType: [
        { name: "faxPart1", value: faxPart1, xs: 2 },
        { name: "faxPart2", value: faxPart2, xs: 2 },
        { name: "faxPart3", value: faxPart3, xs: 2 },
      ],
    },
  ];

  // component
  const contactInput = (
    <Grid container style={{ marginBottom: "14px" }}>
      {contact.map((item, index) =>
        index === 0 ? (
          <Grid style={{ marginRight: "8px" }} container item key={index} xs>
            {item.contactType.map((itemPart, itemPartIndex) => (
              <Grid item xs={4} key={itemPartIndex}>
                <FormControl margin="normal" required variant="outlined">
                  {!validPhonePartInput(
                    itemPart.value,
                    itemPart.name,
                    itemPart.submitConstName
                  )
                    ? itemPartIndex === 0 && (
                        <InputLabel style={{ color: "#f44336" }}>
                          Phone
                        </InputLabel>
                      )
                    : itemPartIndex === 0 && <InputLabel>Phone</InputLabel>}
                  <OutlinedInput
                    labelWidth={itemPartIndex === 0 ? 60 : 0}
                    name={itemPart.name}
                    onChange={handleChangeContact}
                    value={itemPart.value}
                    inputProps={
                      itemPartIndex === 2
                        ? { maxLength: "4" }
                        : { maxLength: "3" }
                    }
                    error={
                      !validPhonePartInput(
                        itemPart.value,
                        itemPart.name,
                        itemPart.submitConstName
                      )
                    }
                  />
                  <FormHelperText style={{ color: "#f44336" }}>
                    {!validPhonePartInput(
                      itemPart.value,
                      itemPart.name,
                      itemPart.submitConstName
                    )
                      ? itemPart.name !== "phonePart3"
                        ? "3 digits"
                        : "4 digits"
                      : ""}
                  </FormHelperText>
                </FormControl>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid style={{ marginLeft: "8px" }} container item key={index} xs>
            {item.contactType.map((itemPart, itemPartIndex) => (
              <Grid item xs={4} key={itemPartIndex}>
                <FormControl margin="normal" variant="outlined">
                  {itemPartIndex === 0 && <InputLabel>Fax</InputLabel>}
                  <OutlinedInput
                    labelWidth={itemPartIndex === 0 ? 30 : 0}
                    name={itemPart.name}
                    onChange={handleChangeContact}
                    value={itemPart.value}
                    inputProps={
                      itemPartIndex === 2
                        ? { maxLength: "4" }
                        : { maxLength: "3" }
                    }
                  />
                </FormControl>
              </Grid>
            ))}
          </Grid>
        )
      )}
    </Grid>
  );
  /* #endregion */

  /* #region  role, site & department section */
  // submit validation
  const [roleEmptySubmit, setRoleEmptySubmit] = useState(false);
  const handleRoleEmptySubmit = (bool) => {
    setRoleEmptySubmit(bool);
  };
  const [siteEmptySubmit, setSiteEmptySubmit] = useState(false);
  const handleSiteEmptySubmit = (bool) => {
    setSiteEmptySubmit(bool);
  };
  const [departmentEmptySubmit, setDepartmentEmptySubmit] = useState(false);
  const handleDepartmentEmptySubmit = (bool) => {
    setDepartmentEmptySubmit(bool);
  };

  // state
  const [role, setRole] = useState("");
  const [site, setSite] = useState([]);
  const [department, setDepartment] = useState([]);
  const handleChangeRoleSiteDepartment = (e) => {
    if (e.target.name === "Role") {
      setRole(e.target.value);
      handleRoleEmptySubmit(e.target.value === "");
      if (e.target.value === 0) {
        setSite([]);
        handleSiteEmptySubmit(true);
        setDepartment([]);
        handleDepartmentEmptySubmit(true);
      }
    }
    if (e.target.name === "Site") {
      setSite(e.target.value);
      handleSiteEmptySubmit(e.target.value.length === 0);
    }
    if (e.target.name === "Department") {
      setDepartment(e.target.value);
      handleDepartmentEmptySubmit(e.target.value.length === 0);
    }
  };

  // data array and methods
  const roleSiteDepartment = ["Role", "Site", "Department"];
  const roleArray = ["Physician", "Clerk", "Radiologist", "Technologist"];
  const getRoleText = (index) => {
    const i = +index;
    return roleArray[i];
  };
  const getSiteText = (index) => {
    const i = +index;
    return siteArray[i];
  };
  const getDepartmentText = (index) => {
    const i = +index;
    return departmentArray[i];
  };

  // component
  const roleSiteDepartmentInput = (
    <Grid container spacing={2}>
      {roleSiteDepartment.map((item, index) => (
        <Grid item xs key={index}>
          {index === 0 && (
            <FormControl fullWidth required error={roleEmptySubmit}>
              <InputLabel>{item}</InputLabel>
              <Select
                name={item}
                onClick={handleChangeRoleSiteDepartment}
                value={role}
              >
                {roleArray.map((roleItem, roleIndex) => (
                  <MenuItem key={roleIndex} value={roleIndex}>
                    {getRoleText(roleIndex)}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{roleEmptySubmit && "Required."}</FormHelperText>
            </FormControl>
          )}
          {index === 1 && (
            <FormControl
              fullWidth
              disabled={role === 0}
              required={role !== 0}
              error={role !== 0 && siteEmptySubmit}
            >
              <InputLabel>{item}</InputLabel>
              <Select
                input={<Input />}
                multiple
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 48 * 4.5 + 8,
                      width: 250,
                    },
                  },
                }}
                name={item}
                onChange={handleChangeRoleSiteDepartment}
                renderValue={(selected) => (
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {selected.map((item, index) => (
                      <Chip
                        key={index}
                        icon={<DoneIcon />}
                        label={getSiteText(item)}
                        style={{ margin: "2px" }}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </div>
                )}
                value={site}
              >
                {siteArray.map((siteItem, siteIndex) => (
                  <MenuItem key={siteIndex} value={siteIndex}>
                    <Checkbox checked={site.indexOf(siteIndex) > -1} />
                    <ListItemText primary={getSiteText(siteIndex)} />
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {role !== 0 && siteEmptySubmit && "Required."}
              </FormHelperText>
            </FormControl>
          )}
          {index === 2 && (
            <FormControl
              fullWidth
              disabled={role === 0}
              required={role !== 0}
              error={role !== 0 && departmentEmptySubmit}
            >
              <InputLabel>{item}</InputLabel>
              <Select
                input={<Input />}
                multiple
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 48 * 4.5 + 8,
                      width: 250,
                    },
                  },
                }}
                name={item}
                onChange={handleChangeRoleSiteDepartment}
                renderValue={(selected) => (
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {selected.map((item, index) => (
                      <Chip
                        key={index}
                        icon={<DoneIcon />}
                        label={getDepartmentText(item)}
                        style={{ margin: "2px" }}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </div>
                )}
                value={department}
              >
                {departmentArray.map((departmentItem, departmentIndex) => (
                  <MenuItem key={departmentIndex} value={departmentIndex}>
                    <Checkbox
                      checked={department.indexOf(departmentIndex) > -1}
                    />
                    <ListItemText
                      primary={getDepartmentText(departmentIndex)}
                    />
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {role !== 0 && departmentEmptySubmit && "Required."}
              </FormHelperText>
            </FormControl>
          )}
        </Grid>
      ))}
    </Grid>
  );
  /* #endregion */

  /* #region  terms of service section */
  // submit validation
  const [agreeToTermsEmptySubmit, setAgreeToTermsEmptySubmit] = useState(false);
  const handleAgreeToTermsEmptySubmit = (bool) => {
    setAgreeToTermsEmptySubmit(bool);
  };

  // state
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const handleChangeAgreeToTerms = (e) => {
    setAgreeToTerms(e.target.checked);
    handleAgreeToTermsEmptySubmit(!e.target.checked);
  };

  // component
  const termsOfServiceCheckBox = (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={agreeToTerms}
            color="primary"
            onChange={handleChangeAgreeToTerms}
            required
          />
        }
        label="I agree to the Terms of Service"
        style={{ marginTop: "8px" }}
      />
      <FormHelperText style={{ color: "#f44336" }}>
        {agreeToTermsEmptySubmit &&
          "Please agree to all the terms and conditions."}
      </FormHelperText>
    </div>
  );
  /* #endregion */

  // encapsulate data
  const siteString = site.toString();
  const departmentString = department.toString();
  const registeringUser = {
    username: username,
    password: password1,
    first_name: firstName,
    middle_initial: middleInitial,
    last_name: lastName,
    phone: phonePart1 + phonePart2 + phonePart3,
    fax: faxPart1 + faxPart2 + faxPart3,
    role: role,
    site: siteString,
    department: departmentString,
  };

  /* #region  register button section */
  // component
  const registerButton = (
    <Button
      color="primary"
      fullWidth
      onClick={(e) => {
        e.preventDefault();

        // submit validation - empty input
        handleUsernameFirstTimeSubmit(username !== "");
        handlePassword1FirstTimeSubmit(password1 !== "");
        handlePassword2FirstTimeSubmit(password2 !== "");
        handleFirstNameFirstTimeSubmit(firstName !== "");
        handleLastNameFirstTimeSubmit(lastName !== "");
        handlePhonePart1FirstTimeSubmit(phonePart1 !== "");
        handlePhonePart2FirstTimeSubmit(phonePart2 !== "");
        handlePhonePart3FirstTimeSubmit(phonePart3 !== "");
        handleRoleEmptySubmit(role === "");
        handleSiteEmptySubmit(site.length === 0);
        handleDepartmentEmptySubmit(department.length === 0);
        handleAgreeToTermsEmptySubmit(agreeToTerms === false);

        // submit validation - valid input
        if (
          validUsernameInput(username, usernameFirstTimeSubmit) &&
          validPasswordInput(password1, password1FirstTimeSubmit) &&
          validPasswordInput(password2, password2FirstTimeSubmit) &&
          passwordsMatch(password1, password2) &&
          validFirstOrLastNameInput(firstName, firstNameFirstTimeSubmit) &&
          validFirstOrLastNameInput(lastName, lastNameFirstTimeSubmit) &&
          validPhonePartInput(
            phonePart1,
            "phonePart1",
            phonePart1FirstTimeSubmit
          ) &&
          validPhonePartInput(
            phonePart2,
            "phonePart2",
            phonePart2FirstTimeSubmit
          ) &&
          validPhonePartInput(
            phonePart3,
            "phonePart3",
            phonePart3FirstTimeSubmit
          ) &&
          !roleEmptySubmit &&
          agreeToTerms === true
        ) {
          if (role !== 0) {
            // register
            if (!siteEmptySubmit && !departmentEmptySubmit) {
              register(registeringUser, dispatch);
            }
          } else {
            register(registeringUser, dispatch);
          }
        }
      }}
      type="submit"
      variant="contained"
    >
      Register
    </Button>
  );
  /* #endregion */

  /* #region  redirect button - sign in section */
  // component
  const redirectLinkButton = (
    <Grid container>
      <Grid item xs></Grid>
      <Grid item>
        <Button
          component={Link}
          style={{ textTransform: "capitalize" }}
          to="/signin"
        >
          Already have an account? Sign in
        </Button>
      </Grid>
    </Grid>
  );
  /* #endregion */

  // console log
  // console.log(
  //   "validUsernameInput: ",
  //   validUsernameInput(username, usernameFirstTimeSubmit)
  // );
  // console.log(
  //   "validPassword1Input: ",
  //   validPasswordInput(password1, password1FirstTimeSubmit)
  // );
  // console.log(
  //   "validPassword2Input: ",
  //   validPasswordInput(password2, password2FirstTimeSubmit)
  // );
  // console.log("passwords match: ", passwordsMatch(password1, password2));
  // console.log(
  //   "valid first name: ",
  //   validFirstOrLastNameInput(firstName, firstNameFirstTimeSubmit)
  // );
  // console.log(
  //   "valid last name: ",
  //   validFirstOrLastNameInput(lastName, lastNameFirstTimeSubmit)
  // );
  // console.log(
  //   "valid phone part1: ",
  //   validPhonePartInput(phonePart1, "phonePart1", phonePart1FirstTimeSubmit)
  // );
  // console.log(
  //   "valid phone part2: ",
  //   validPhonePartInput(phonePart2, "phonePart2", phonePart2FirstTimeSubmit)
  // );
  // console.log(
  //   "valid phone part3: ",
  //   validPhonePartInput(phonePart3, "phonePart3", phonePart3FirstTimeSubmit)
  // );
  // console.log("role selection: ", role);
  // console.log("not empty role selection: ", !roleEmptySubmit);
  // console.log("agree to terms: ", agreeToTerms === true);
  // console.log("not empty site: ", !siteEmptySubmit);
  // console.log("not empty department: ", !departmentEmptySubmit);
  // console.log("role !== 0", role !== 0);
  // console.log(
  //   "!siteEmptySubmit && !departmentEmptySubmit",
  //   !siteEmptySubmit && !departmentEmptySubmit
  // );

  /* #region  render section */
  return (
    <Container
      maxWidth="sm"
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        marginTop: "36px",
      }}
    >
      {iconAndTitle}
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ marginTop: "8px", width: "100%" }}
      >
        {usernameInput}
        {passwordInput}
        {nameInput}
        {contactInput}
        {roleSiteDepartmentInput}
        {termsOfServiceCheckBox}
        <Box mt={3} mb={2}>
          {registerButton}
        </Box>
        {redirectLinkButton}
      </form>
    </Container>
  );
  /* #endregion */
};
