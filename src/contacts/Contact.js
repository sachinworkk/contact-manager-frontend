import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";

export default function Contact(props) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ maxWidth: 600, marginBottom: 5 }}>
        <CardMedia
          component="img"
          height="200"
          image={props.image}
          alt="Contact"
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {props.userName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.displayedContactNumber}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-around" }}>
          <IconButton onClick={props.onEdit}>
            <EditIcon />
          </IconButton>

          <IconButton>
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}
