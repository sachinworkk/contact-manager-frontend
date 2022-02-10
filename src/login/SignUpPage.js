import { useState } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";

import { useNavigate } from "react-router-dom";

import { signUp } from "../services/auth";

export default function SignUpPage() {
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = function (e) {
    const { name, value } = e.target;

    setSignUpInfo({ ...signUpInfo, [name]: value });
  };

  const handleSignUp = async () => {
    try {
      await signUp(signUpInfo);

      navigate("/");
    } catch (error) {
      console.log(error);
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

          <FormControl sx={{ marginBottom: 2 }}>
            <InputLabel htmlFor="my-password">Confirm Password</InputLabel>
            <Input
              id="my-password"
              name="password"
              type="password"
              aria-describedby="my-helper-text"
              onChange={handleInputChange}
            />
          </FormControl>

          <Button variant="contained" onClick={handleSignUp}>
            Sign Up
          </Button>
        </Box>
      </Box>
    </div>
  );
}
