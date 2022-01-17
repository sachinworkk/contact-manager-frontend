import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function FloatingActionButton(props) {
  return (
    <Box
      sx={{
        position: "fixed",
        right: 20,
        bottom: 40,
      }}
    >
      <Fab
        color="primary"
        aria-label="add"
        onClick={props.onFloatingButtonClick}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
