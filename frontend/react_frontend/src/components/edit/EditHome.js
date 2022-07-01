import React from "react";
import { Link } from "react-router-dom";
import {
    Container,
    Grid,
    Typography,
    makeStyles,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
} from "@material-ui/core";

// Import images used in cards
import keywordImage from "./images/keywords.jpg"
import protocolImage from "./images/protocols.jpg"
import mobilityImage from "./images/mobility.jpg"
import sedationImage from "./images/sedation.jpg"
import precautionImage from "./images/precaution.jpg"
import sequenceImage from "./images/sequence.jpg"
import isolationImage from "./images/isolation.jpg"
import examImage from "./images/exam.jpg"
import examCodeImage from "./images/examCode.jpg"

const useStyles = makeStyles((theme) => ({
    title: {
        margin: "35px 0px 50px 0px"
    },
    cardStyle: {
        height: "475px"
    },
    cardImage: {
        height: "400px"
    }
}))

const App = () => {

    const classes = useStyles();

    return (
        <Container>
            <Grid container spacing={6} style={{ marginTop: '1px' }}>
                <Grid item xs={3}>
                    <Card style={{ height: "auto" }} className={classes.cardStyle} >
                        <CardActionArea component={Link} to={"/apps/edit/protocols"}>
                            <CardMedia style={{ height: "144px" }} className={classes.cardImage} image={protocolImage} />
                            <CardContent>
                                <Typography align='center' variant='h5'>Protocols</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card style={{ height: "auto" }} className={classes.cardStyle}>
                        <CardActionArea component={Link} to={"/apps/edit/sequences"}>
                            <CardMedia style={{ height: "144px" }} className={classes.cardImage} image={sequenceImage} />
                            <CardContent>
                                <Typography align='center' variant='h5'>Sequences</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card style={{ height: "auto" }} className={classes.cardStyle}>
                        <CardActionArea component={Link} to={"/apps/edit/examcodes"}>
                            <CardMedia style={{ height: "144px" }} className={classes.cardImage} image={examImage} />
                            <CardContent>
                                <Typography align='center' variant='h5'>Exam Codes</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card style={{ height: "auto" }} className={classes.cardStyle}>
                        <CardActionArea component={Link} to={"/apps/edit/keywords"}>
                            <CardMedia style={{ height: "144px" }} className={classes.cardImage} image={keywordImage} />
                            <CardContent>
                                <Typography align='center' variant='h5'>Keywords</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card style={{ height: "auto" }} className={classes.cardStyle}>
                        <CardActionArea component={Link} to={"/apps/edit/types"}>
                            <CardMedia style={{ height: "144px" }} className={classes.cardImage} image={examCodeImage} />
                            <CardContent>
                                <Typography align='center' variant='h5'>Exam Types</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card style={{ height: "auto" }} className={classes.cardStyle} >
                        <CardActionArea component={Link} to={"/apps/edit/mobilityrequirements"}>
                            <CardMedia style={{ height: "144px" }} className={classes.cardImage} image={mobilityImage} />
                            <CardContent>
                                <Typography align='center' variant='h5'>Mobility Options</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card style={{ height: "auto" }} className={classes.cardStyle} >
                        <CardActionArea component={Link} to={"/apps/edit/sedationrequirements"}>
                            <CardMedia style={{ height: "144px" }} className={classes.cardImage} image={sedationImage} />
                            <CardContent>
                                <Typography align='center' variant='h5'>Sedation Options</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card style={{ height: "auto" }} className={classes.cardStyle} >
                        <CardActionArea component={Link} to={"/apps/edit/isolationprecautions"}>
                            <CardMedia style={{ height: "144px" }} className={classes.cardImage} image={isolationImage} />
                            <CardContent>
                                <Typography align='center' variant='h5'>Isolation Precautions</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card style={{ height: "auto" }} className={classes.cardStyle} >
                        <CardActionArea component={Link} to={"/apps/edit/precautionrequirements"}>
                            <CardMedia style={{ height: "144px" }} className={classes.cardImage} image={precautionImage} />
                            <CardContent>
                                <Typography align='center' variant='h5'>Isolation Precaution Requirements</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default App