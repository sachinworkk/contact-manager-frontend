import { useState, useEffect } from "react";

import { getLoggedInUser } from "../services/auth";
import { isEmpty as isObjectEmpty } from "../utils/object";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import CircularProgress from "@mui/material/CircularProgress";

import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [isLoginIn, setLoginIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    checkIfLoggedIn();
  });

  const checkIfLoggedIn = () => {
    if (!isObjectEmpty(getLoggedInUser())) {
      navigate("/contacts");
    }
  };

  const handleInputChange = function (e) {
    const { name, value } = e.target;

    setLoginInfo({ ...loginInfo, [name]: value });
  };

  // handle click event of the Add button
  const handleLoginButton = () => {
    setLogin(loginInfo);
  };

  const setLogin = async () => {
    setLoginIn(true);

    try {
      await login(loginInfo);

      window.location.reload();

      navigate("/contacts");
    } catch (error) {
      console.log(error);
    } finally {
      setLoginIn(false);
    }
  };

  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            minWidth: "20%",
            minHeight: "50%",
            padding: "15px",
            borderRadius: 2,
          }}
        >
          <FormControl sx={{ marginBottom: 2 }}>
            <InputLabel htmlFor="my-email">Email address</InputLabel>
            <Input
              id="my-email"
              name="email"
              aria-describedby="my-helper-text"
              onChange={handleInputChange}
            />
            <FormHelperText id="my-helper-text">
              We'll never share your email.
            </FormHelperText>
          </FormControl>

          <FormControl sx={{ marginBottom: 2 }}>
            <InputLabel htmlFor="my-password">Password</InputLabel>
            <Input
              id="my-password"
              name="password"
              type="password"
              aria-describedby="my-helper-text"
              onChange={handleInputChange}
            />
          </FormControl>

          <Button
            variant="contained"
            onClick={handleLoginButton}
            sx={{ marginBottom: 2 }}
          >
            Login
            {isLoginIn ? <CircularProgress /> : null}
          </Button>

          <Button
            variant="contained"
            onClick={handleLoginButton}
            sx={{ marginBottom: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </div>
  );
}
