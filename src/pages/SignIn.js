import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import haile from "../data/haile.png";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Alert, Collapse } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://https://coopbankoromia.com.et
/"
      >
        Coop Innovation
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignInSide() {
  const { handleLoginId, handleLoginUser, users } = useStateContext();
  const [isSubmit, setIsSubmit] = useState(false);
  const [state, setState] = useState({
    open: false,
    msg: "",
  });

  const { open, msg } = state;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("users", users);
    const data = new FormData(event.currentTarget);
    if (data.get("email") < 4 && data.get("password") < 4) {
      setIsSubmit(false);
    } else {
      setIsSubmit(true);
      var username = data.get("email");
      var password = data.get("password");
      var datas = {
        username: username,
        password: password,
      };

      axios
        .post("http://10.100.2.63:9000/core/auth/new/login/", datas)
        .then((response) => {
          if (response.status === 200) {
            setIsSubmit(false);
            handleLoginId(response.data["user"]);
            handleLoginUser(true);
          }
        })
        .catch((error) => {
          setState({
            open: true,
            msg: error.response.data["detail"],
          });
          setIsSubmit(false);
        });
    }
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${haile})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Collapse in={open}>
                <Alert
                  onClose={() => setState({ ...state, open: false })}
                  severity="error"
                >
                  {msg}
                </Alert>
              </Collapse>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Username"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {!isSubmit ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              ) : (
                <LoadingButton loading />
              )}
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  {/* <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link> */}
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
