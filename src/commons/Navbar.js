import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { logOut } from "../services/auth";

import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handlelogOut = () => {
    logOut();

    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Contact Manager
          </Typography>
          <Button color="inherit" onClick={() => handlelogOut()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
