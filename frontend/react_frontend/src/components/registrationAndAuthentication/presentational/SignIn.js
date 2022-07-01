import React, { useState, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";

// React Router
import { Link, Redirect } from "react-router-dom";

// component
import { login, ldapLogin } from "../../stateManagement/actions/RegistrationAndAuthenticationAction";

// Styles
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import {
  LockOutlined as LockOutlinedIcon,
  VisibilityOutlined as Visibility,
  VisibilityOffOutlined as VisibilityOff,
} from "@material-ui/icons";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export const SignIn = () => {
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
        <LockOutlinedIcon />
      </Avatar>
      <Typography noWrap variant="h5">
        Sign in
      </Typography>
    </div>
  );
  /* #endregion */

  /* #region  username section */

  // state
  const [username, setUsername] = useState("");
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  
  // get username exists
  const dispatch = useDispatch();

  // component
  const usernameInput = (
    <div>
      <FormControl fullWidth margin="normal" required variant="outlined">
        <InputLabel>User Name</InputLabel>
        <OutlinedInput
          autoFocus
          labelWidth={151}
          name="username"
          onChange={handleChangeUsername}
          value={username}       
        />
      </FormControl>
    </div>
  );
  /* #endregion */

  /* #region  password section */

  // password hiding
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // state
  const [password, setPassword] = useState("");
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  // component
  const passwordInput = (
    <FormControl fullWidth margin="normal" required variant="outlined">
      <InputLabel>Password</InputLabel>
      <OutlinedInput
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end" onClick={handleClickShowPassword}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={85}
        name="password"
        onChange={handleChangePassword}
        type={showPassword ? "text" : "password"}
        value={password}
      />
    </FormControl>
  );
  /* #endregion */

  /* #region  remember me section */
  // state
  const [rememberMe, setRememberMe] = useState(false);
  const handleChangeRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  // component
  const rememberMeCheckBox = (
    <FormControlLabel
      control={
        <Checkbox
          checked={rememberMe}
          color="primary"
          onChange={handleChangeRememberMe}
          required
        />
      }
      label="Remember me"
      style={{ marginTop: "8px" }}
    />
  );
  /* #endregion */

  // encapsulate data
  const loggingUser = {
    username: username,
    password: password,
  };

  /* #region  sign in button section */
  // component
  
  const handleSignIn = (e) => {
    e.preventDefault();

    // submit validation - valid input
    if(loginType === 'Simple')
    {
      login(loggingUser, dispatch);
    }
    else
    {    
      ldapLogin(loggingUser, dispatch);
    }
  }
  
  const signInButton = (
    <Button
      color="primary"
      fullWidth
      onClick={handleSignIn}
      type="submit"
      variant="contained"
    >
      Sign in
    </Button>
  );
  /* #endregion */

  /* #region  redirect button - forgot password & register section */
  // component
  const redirectLinkButton = (
    <Grid container>
      <Grid item xs>
        <Button
          component={Link}
          style={{ textTransform: "capitalize" }}
          to="/forgotpassword"
        >
          Forgot password?
        </Button>
      </Grid>
      <Grid item>
        <Button
          component={Link}
          style={{ textTransform: "capitalize" }}
          to="/register"
        >
          Don't have an account? Register
        </Button>
      </Grid>
    </Grid>
  );
  /* #endregion */

  const [loginType, setLoginType] = useState('LDAP')

  const handleChangeLoginType = (e, newLoginType) => {
    if(newLoginType)
    {
      setLoginType(newLoginType)
    }
  }
  
  const loginTypeButton = (
    <ToggleButtonGroup value={loginType} exclusive onChange={handleChangeLoginType} style={{margin: '0px 0px 0px 164px'}}>
      <ToggleButton value='LDAP'>
        LDAP Login
      </ToggleButton>
      <ToggleButton value='Simple'>
        Simple Login
      </ToggleButton>
    </ToggleButtonGroup>
  )

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
        {rememberMeCheckBox}
        {loginTypeButton}
        <Box mt={3} mb={2}>
          {signInButton}
        </Box>
        {redirectLinkButton}
      </form>
    </Container>
  );
  /* #endregion */
};