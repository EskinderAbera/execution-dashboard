import React from "react";
import logo from "../data/logo.png";
import runningimage from "../data/running.jpg";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const MyAppBar = () => {
    return (
      <Box sx={{ flexGrow: 1, opacity: 1, marginTop: "0px" }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography
              variant="h6"
              color="inherit"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{
                padding: "inherit",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              <img src={logo} style={{ width: "180px" }} alt="coop logo" />
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    );
  };

  return (
    <div>
      <MyAppBar />
      <Grid container spacing={2}>
        <Grid item md={5}>
          <Box
            style={{
              marginTop: "20%",
              marginLeft: "10%",
              padding: "10px",
              height: "99%",
              boxSizing: "border-box",
            }}
          >
            <Typography variant="h3" style={{ fontSize: "bold" }}>
              Welcome to,
            </Typography>
            <Typography variant="h3" style={{ fontSize: "bold" }}>
              Execution Dashboard
            </Typography>
            <br />
            <p className="lead">
              <q>Committed to Breakthrough</q>
            </p>
            <hr className="my-4" />
            <p></p>
            <p className="lead">
              <Button
                color="info"
                variant="contained"
                width="30%"
                role="button"
                onClick={() => navigate("/login")}
              >
                SignIn
              </Button>
            </p>
          </Box>
        </Grid>
        <Grid item md={7}>
          <img
            src={runningimage}
            style={{
              width: "80%",
              marginLeft: "-10%",
              height: "100%",
              marginTop: "80px",
              borderRadius: "0%",
            }}
            alt="Committed to Breakthrough"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default LandingPage;
