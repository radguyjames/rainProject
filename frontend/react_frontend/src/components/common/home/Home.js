import React, { useState } from "react";

// React Router
import { Link } from "react-router-dom";

// Components
import LogoAnimation from "./animation.mp4";
import AboutImg from "./productivity.png";
import AIImg from "./ai.jpg";

// Dev Tools, 3rd Party Tools
import ReactPlayer from "react-player/lazy";
import ScrollableSection, {
  configureAnchors,
} from "react-update-url-on-scroll";
import { Link as ScrollLink, Element } from "react-scroll";

import Card from "./src/components/Card/Card.js";
import CardHeader from "./src/components/Card/CardHeader.js";
import CardIcon from "./src/components/Card/CardIcon.js";
import CardBody from "./src/components/Card/CardBody.js";
import CardFooter from "./src/components/Card/CardFooter.js";
import GridContainer from "./src/components/Grid/GridContainer.js";
import GridItem from "./src/components/Grid/GridItem.js";

import { dailySalesChart } from "./src/variables/charts";
import styles from "./src/assets/jss/material-dashboard-react/views/dashboardStyle.js";

// React Chartist
import ChartistGraph from "react-chartist";

// Styles
import {
  Box,
  createMuiTheme,
  CssBaseline,
  Grow,
  Grid,
  Typography,
  Button,
  ThemeProvider,
  Icon,
  Container,
  makeStyles,
  responsiveFontSizes,
} from "@material-ui/core";
import {
  WebSharp as WebSharpIcon,
  DvrSharp as DvrSharpIcon,
  ScheduleSharp as ScheduleSharpIcon,
  AssignmentSharp as AssignmentSharpIcon,
  LocalOfferSharp as LocalOfferSharpIcon,
  ThumbUpSharp as ThumbUpSharpIcon,
  TrendingDownSharp as TrendingDownSharpIcon,
  AccessTimeSharp as AccessTimeSharpIcon,
  LocationOnSharp as LocationOnSharpIcon,
  AvTimerSharp as AvTimerSharpIcon,
  PhoneInTalkSharp as PhoneInTalkSharpIcon,
  EmailSharp as EmailSharpIcon,
} from "@material-ui/icons";

let theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          height: "100vh",
          overflow: "hidden",
        },

        // Make div height 100% to ensure the scrollbar works
        // div: {
        //   height: "100%",
        // },
      },
    },
  },
});
theme = responsiveFontSizes(theme);

const useStyles = makeStyles(styles);

export const Home = () => {
  const [currentHash, setCurrentHash] = useState();

  // animation
  const [playAnimation, setPlayAnimation] = useState(true);

  const [playFinish, setPlayFinish] = useState(false);
  const finishFlag = () => {
    setPlayFinish(true);
  };

  configureAnchors({
    onSectionEnter: (newState, oldState) => {
      setPlayAnimation(newState.hash === "/home#welcome");
      setCurrentHash(newState.hash);
    },
  });

  const classes = useStyles();

  const chart = (
    <Container fixed>
      <Grid container alignItems="center" spacing={9}>
        <Grid item xs={4}>
          <Box
            display="flex"
            flexDirection="column"
            justify="center"
            alignItems="center"
          >
            {[
              {
                titleIcon: <AssignmentSharpIcon />,
                titleText: "Processed Req",
                statistics: "6",
                footerIcon: <LocalOfferSharpIcon />,
                footerText: "Tracked by RAIN",
              },
              {
                titleIcon: <ThumbUpSharpIcon />,
                titleText: "Protocol Hit",
                statistics: "96%",
                footerIcon: <LocalOfferSharpIcon />,
                footerText: "Tracked by RAIN",
              },
            ].map((item) => (
              <Card key={item.titleText}>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <Icon>{item.titleIcon}</Icon>
                  </CardIcon>

                  <Typography
                    paragraph
                    style={{
                      color: "#999",
                      margin: "0",
                      fontSize: "1.2rem",
                      marginTop: "0",
                      paddingTop: "10px",
                      marginBottom: "0",
                    }}
                  >
                    {item.titleText}
                  </Typography>
                  <Typography
                    variant="h3"
                    style={{
                      color: "#3C4858",
                      marginTop: "0px",
                      minHeight: "auto",
                      fontWeight: "300",
                      fontSize: "2.2rem",
                      marginBottom: "3px",
                    }}
                  >
                    {item.statistics}
                  </Typography>
                </CardHeader>
                <CardFooter stats>
                  <Typography style={{ color: "#999" }} variant="body2">
                    {item.footerIcon}
                    {item.footerText}
                  </Typography>
                </CardFooter>
              </Card>
            ))}
          </Box>
        </Grid>
        <Grid item xs={8}>
          <GridContainer>
            <GridItem xs={12}>
              <Card chart>
                <CardHeader color="info">
                  <ChartistGraph
                    data={dailySalesChart.data}
                    type="Line"
                    options={dailySalesChart.options}
                    listener={dailySalesChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <Typography noWrap variant="h5">
                    Minutes per Requisition
                  </Typography>
                  <Typography variant="subtitle2">
                    <span className={classes.successText}>
                      <TrendingDownSharpIcon /> 29%
                    </span>{" "}
                    decrease during this week.
                  </Typography>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>
                    <AccessTimeSharpIcon /> updated 14 hours ago
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </Grid>
      </Grid>
      <Grid container justify="center" spacing={9}>
        <Grid item>
          <Box display="flex" justifyContent="center" width={1}>
            <Button
              component={Link}
              to="/signin"
              color="primary"
              variant="contained"
            >
              <Typography variant="h6">View all services</Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid style={{ marginTop: "110px" }} container spacing={9}>
        <Grid item xs={3}>
          <Box display="flex">
            <LocationOnSharpIcon
              style={{ fontSize: 20, marginRight: "10px" }}
            />
            <Box display="flex" flexDirection="column">
              <Typography variant="subtitle1">
                Lorem ipsum is placeholder text.
              </Typography>
              <Typography variant="subtitle1">Winnipeg, MB XXX XXX</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box display="flex" flexDirection="column">
            <Box display="flex">
              <PhoneInTalkSharpIcon
                style={{ fontSize: 20, marginRight: "10px" }}
              />
              <Typography variant="subtitle1">+1-XXX-XXX-XXXX</Typography>
            </Box>
            <Box display="flex">
              <EmailSharpIcon style={{ fontSize: 20, marginRight: "10px" }} />
              <Typography variant="subtitle1">rainservice@rain.ca</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box display="flex">
            <AvTimerSharpIcon style={{ fontSize: 20, marginRight: "10px" }} />
            <Box display="flex" flexDirection="column">
              <Typography variant="subtitle1">Monday - Friday</Typography>
              <Typography variant="subtitle1">9:00 am - 4:00 pm</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box display="flex" flexDirection="column">
            <Typography variant="subtitle1">Terms</Typography>
            <Typography variant="subtitle1">Privacy</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );

  const sections = [
    {
      sectionId: "welcome",
      href: "/home#welcome",
      context: (
        <Box
          width={1}
          height={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {playFinish ? (
            <Container fixed>
              <Grow
                in={true}
                style={{ transitionDelay: "0ms" }}
                timeout={{
                  appear: 3000,
                  enter: 4000,
                  exit: 2000,
                }}
              >
                <Grid container spacing={9}>
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="center">
                      <Typography variant="h1" noWrap>
                        Welcome to RAIN
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grow>

              <Grow
                in={true}
                style={{ transitionDelay: "0ms" }}
                timeout={{
                  appear: 6000,
                  enter: 7000,
                  exit: 5000,
                }}
              >
                <Grid container spacing={9}>
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="center">
                      <Typography gutterBottom variant="h4" noWrap>
                        Integrating the future
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grow>
              <Grow
                in={true}
                style={{ transitionDelay: "0ms" }}
                timeout={{
                  appear: 6500,
                  enter: 7500,
                  exit: 5500,
                }}
              >
                <Box display="flex" justifyContent="center">
                  <Button
                    component={Link}
                    to="/signin"
                    color="primary"
                    variant="contained"
                  >
                    <Typography variant="h6">Get Started</Typography>
                  </Button>
                </Box>
              </Grow>
            </Container>
          ) : (
            <ReactPlayer
              width="100%"
              height="91%"
              url={LogoAnimation}
              playing={playAnimation}
              muted
              loop={false}
              onEnded={finishFlag}
            />
          )}
        </Box>
      ),
    },
    {
      sectionId: "productivity",
      href: "/home#productivity",
      context: (
        <Container fixed>
          <Grow
            in={true}
            style={{ transitionDelay: "0ms" }}
            timeout={{
              appear: 3000,
              enter: 4000,
              exit: 2000,
            }}
          >
            <Grid container spacing={9}>
              <Grid item xs={6}>
                <Box
                  width={1}
                  height={1}
                  style={{
                    backgroundImage: `url(${AboutImg})`,
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Box
                  width={1}
                  height={400}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Typography gutterBottom noWrap variant="h3">
                    Boost productivity
                  </Typography>
                  <Typography variant="h5" paragraph>
                    Incorporating Health informatics, provides electronic access
                    to requests and records for physicians, radiologists,
                    technologists and hospital administrators.
                  </Typography>
                  <Box>
                    <Button
                      component={Link}
                      to="/signin"
                      color="primary"
                      variant="contained"
                    >
                      <Typography variant="h6">Learn more</Typography>
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grow>

          <Grow
            in={true}
            style={{ transitionDelay: "600ms" }}
            timeout={{
              appear: 5000,
              enter: 6000,
              exit: 4000,
            }}
          >
            <Grid container spacing={9}>
              {[
                {
                  icon: (
                    <WebSharpIcon style={{ color: "#00acc1", fontSize: 100 }} />
                  ),
                  heading: "Online",
                  text: "Utilizing Web technologies in processing requisitions",
                },
                {
                  icon: (
                    <DvrSharpIcon style={{ color: "#00acc1", fontSize: 100 }} />
                  ),
                  heading: "Automation",
                  text:
                    "Automating request validations and minify incomplete cases",
                },
                {
                  icon: (
                    <ScheduleSharpIcon
                      style={{ color: "#00acc1", fontSize: 100 }}
                    />
                  ),
                  heading: "Live",
                  text: "Publishing real-time schedules",
                },
              ].map((item) => (
                <Grid key={item.heading} item xs>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    width={1}
                    height={1}
                  >
                    {item.icon}
                    <Typography noWrap variant="h4">
                      {item.heading}
                    </Typography>
                    <Box textAlign="center">
                      <Typography variant="h6" paragraph>
                        {item.text}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grow>
        </Container>
      ),
    },
    {
      sectionId: "ai",
      href: "/home#ai",
      context: (
        <Container fixed>
          <Grow
            in={true}
            style={{ transitionDelay: "0ms" }}
            timeout={{
              appear: 3000,
              enter: 4000,
              exit: 2000,
            }}
          >
            <Grid container spacing={9}>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="center"
                  width={1}
                  height={400}
                  style={{
                    backgroundImage: `url(${AIImg})`,
                    backgroundPosition: "center",
                    backgroundSize: "auto 360px",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </Grid>
            </Grid>
          </Grow>

          <Grow
            in={true}
            style={{ transitionDelay: "600ms" }}
            timeout={{
              appear: 5000,
              enter: 6000,
              exit: 4000,
            }}
          >
            <Grid container spacing={9}>
              <Grid item xs={12}>
                <Box textAlign="center">
                  <Typography gutterBottom noWrap variant="h3">
                    Embrace AI
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grow>
          <Grow
            in={true}
            style={{ transitionDelay: "600ms" }}
            timeout={{
              appear: 5000,
              enter: 6000,
              exit: 4000,
            }}
          >
            <Grid container spacing={9}>
              <Grid item xs={12}>
                <Box textAlign="center">
                  <Typography variant="h5" paragraph>
                    Applying artificial intelligence into radiology practice
                    will pick up repetitive routine tasks. In addition to
                    helping to mitigate burnout, AI provides the radiologists
                    with a second pair of hands and eyes that give them a sense
                    of support and security.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grow>
        </Container>
      ),
    },
    {
      sectionId: "statistics",
      href: "/home#statistics",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box style={{ backgroundColor: "#333", color: "#f4f4f4" }}>
        <Box
          px={2}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          height={1}
          bgcolor="rgba(0,0,0,0.7)"
          style={{
            position: "fixed",
            right: 0,
            top: 0,
            zIndex: "1",
          }}
        >
          {sections.map((item) => (
            <Box key={item.href} my={3}>
              <ScrollLink
                delay={200}
                duration={500}
                offset={0}
                smooth={true}
                spy={true}
                isDynamic={true}
                to={item.href}
              >
                <Box
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "skyblue")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#f4f4f4")
                  }
                  style={{
                    height: "16px",
                    width: "16px",
                    backgroundColor: "#f4f4f4",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                ></Box>
              </ScrollLink>
            </Box>
          ))}
        </Box>

        <Box
          pr={6}
          width={1}
          height={1}
          style={{
            // overflowY: "scroll",
            scrollSnapType: "y mandatory",
          }}
        >
          {sections.map((item, index) => (
            <ScrollableSection
              style={{
                width: "100%",
                height: "100vh",
                scrollSnapAlign: "center",
              }}
              key={item.href}
              hash={item.href}
            >
              <Element name={item.href}>
                {index === 0
                  ? item.context
                  : currentHash === item.href
                  ? item.context
                  : ""}
              </Element>
            </ScrollableSection>
          ))}

          <ScrollableSection
            style={{
              width: "100%",
              height: "100vh",
              scrollSnapAlign: "center",
            }}
            hash="/home#statistics"
          >
            <Element name="/home#statistics">
              {
                currentHash === "/home#statistics" && chart
                // (
                //   <Grow
                //     style={{ transitionDelay: "0ms" }}
                //     in={true}
                //     timeout={{
                //       appear: 3000,
                //       enter: 4000,
                //       exit: 2000,
                //     }}
                //   >
                //     {chart}
                //   </Grow>
                // )
              }
            </Element>
          </ScrollableSection>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
