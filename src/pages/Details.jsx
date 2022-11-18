import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLoginContext } from "../contexts/AuthContext";

const Details = () => {
  const { state: data } = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useLoginContext();
  console.log("currentUser", currentUser.email);
  console.log("dataUser", data.email);
  return (
    <Box mt={5} mx={3}>
      <Card
        sx={{
          maxWidth: 1000,
          mx: "auto",
        }}
        align="center"
      >
        <Box>
          <CardHeader title={data.title} subheader={data.createdOn} />
          <CardMedia
            component="img"
            image={data.imageUrl}
            alt="blogImg"
            sx={{ maxHeight: 700, padding: "5" }}
          />
        </Box>

        <CardContent>
          <Typography
            sx={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
            variant="body2"
            color="text.secondary"
          >
            {data.content}
          </Typography>
          <Typography variant="body1" color="text">
            {data.email}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" size="small" onClick={() => navigate(-1)}>
            Back
          </Button>
        </CardActions>
      </Card>

      {currentUser.email == data.email && (
        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
          <Button variant="contained" color="secondary">
            Edit
          </Button>
          <Button variant="contained" color="secondary">
            Delete
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Details;
