import React, { useEffect } from "react";

// Redux
import { useSelector } from "react-redux";

// React Router
import { Link, Redirect } from "react-router-dom";

// Styles
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";

//Importing images for title cards

import webImage from "./images/website.jpg"
import editorImage from "./images/settings.jpg"
import calendarImage from "./images/schedule.jpg"
import userImage from "./images/user.png"
import archiveImage from "./images/folder.jpg"
import outstandingImage from "./images/clock.jpg"
import protocolImage from "./images/protocols.jpg"
import requisitonImage from "./images/requisition.jpg"

export const Applications = () => {
  const isAuthenticated = useSelector(
    (state) => state.RegistrationAndAuthenticationReducer.boolIsAuthenticated
  );
  useEffect(() => {
    if (!isAuthenticated) return <Redirect to="/signin" />;
  }, [isAuthenticated]);

  const loggedInUser = useSelector(
    (state) => state.RegistrationAndAuthenticationReducer.objLoggedInUser
  );

  const cards = [
    // {
    //   image: "https://source.unsplash.com/featured/?rain",
    //   title: "Manager Account",
    //   accessingRole: ["-2"],
    //   url: "/apps/manageraccount",
    // },
    {
      image: webImage,
      title: "Website Management",
      accessingRole: ["-2", "-1"],
      url: "/apps/sitemanagement",
    },
    {
      image: userImage,
      title: "User Management",
      accessingRole: ["-2", "-1"],
      url: "/apps/usermanagement",
    },
    // {
    //   image: "https://source.unsplash.com/featured/?paperwork",
    //   title: "Form Management",
    //   accessingRole: ["-2", "-1"],
    //   url: "/apps/formmanagement",
    // },
    {
      image: protocolImage,
      title: "Worklist",
      accessingRole: ["-2","2", "3", "4"],
      url: "/apps/protocolmanagement",
    },
    // {
    //   image: "https://source.unsplash.com/featured/?rain",
    //   title: "News",
    //   accessingRole: ["-2", "-1"],
    //   url: "/apps/news",
    // },
    // {
    //   image: "https://source.unsplash.com/featured/?document",
    //   title: "Upload",
    //   accessingRole: ["-2", "0", "1"],
    //   url: "/apps/upload",
    // },
    // {
    //   image: "https://source.unsplash.com/featured/?document",
    //   title: "Reviewing",
    //   accessingRole: ["-2", "0"],
    //   url: "/apps/reviewing",
    // },
    // {
    //   image: "https://source.unsplash.com/featured/?code",
    //   title: "Coding",
    //   accessingRole: ["-2", "2"],
    //   url: "/apps/coding",
    // },
    {
      image: outstandingImage,
      title: "Outstanding Protocols",
      accessingRole: ["-2","0","-1","1","2", "3", "4"],
      url: "/apps/outstandingprotocols",
    },
    // {
    //   image: "https://source.unsplash.com/featured/?clock",
    //   title: "Booking",
    //   accessingRole: ["-2", "1"],
    //   url: "/apps/booking",
    // },
    {
      image: requisitonImage,
      title: "MRI Request Form",
      accessingRole: ["-2", "0", "2", "3"],
      url: "/apps/requisitions",
    },
    {
      image: calendarImage,
      title: "Appointment Calendar",
      accessingRole: ["-2", "0", "1", "2", "3"],
      url: "/apps/scheduler",
    },
    // {
    //   image: "https://source.unsplash.com/featured/?calendar",
    //   title: "Form Verifier",
    //   accessingRole: ["-2", "0", "1", "2", "3"],
    //   url: "/apps/formverifier",
    // },
    // {
    //   image: "https://source.unsplash.com/featured/?notification",
    //   title: "Notification",
    //   accessingRole: ["-2", "0", "1", "2", "3"],
    //   url: "/apps/notification",
    // },
    {
      image: archiveImage,
      title: "Requisitions Archive",
      accessingRole: ["-2", "0", "1", "2", "3"],
      url: "/apps/search",
    },
    {
      image: editorImage,
      title: "Protocol/Option Editor",
      accessingRole: ["-2"],
      url: "/apps/edit",
    },
  ];

  return (
    <Container>
      <Grid container spacing={6} style={{marginTop:'1px'}}>
        {cards.map(
          (item, index) =>
            item.accessingRole.includes(loggedInUser.role) && (
              <Grid item xs={3} key={index} >
                <Card style={{ height: "auto" }}>
                  <CardActionArea component={Link} to={item.url}>
                    <CardMedia style={{ height: "144px" }} image={item.image} />
                    <CardContent>
                      <Typography align='center' variant='h5' gutterBottom>{item.title}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            )
        )}
      </Grid>
    </Container>
  );
};
