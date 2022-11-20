import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../contexts/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser } = useLoginContext();
  return (
    <Container component="main" maxWidth="xs" sx={{ textAlign: "start" }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card sx={{ minWidth: 200, mx: "auto", my: "auto" }}>
          <CardContent>
            <Typography sx={{ fontSize: 40 }} gutterBottom align="center">
              Profile
            </Typography>
            <Box align="center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5373/5373255.png"
                alt=""
                width={100}
              />
            </Box>

            <Box align="center" mt={4} color="purple">
              <Typography variant="body2">{currentUser.email}</Typography>
            </Box>
          </CardContent>
        </Card>
        <Box mt={3}>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
