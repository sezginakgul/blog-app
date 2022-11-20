import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useFetch } from "../helpers/firebase";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../contexts/AuthContext";
import { toastRedNotify } from "../helpers/toastNotify";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";

const BlogCard = () => {
  // console.log(new Date().toDateString());
  const { isLoading, blogList } = useFetch();
  const navigate = useNavigate();
  const { currentUser } = useLoginContext();
  // console.log("BlogList", blogList);
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }} mt={4} mb={4} p={2}>
      {isLoading && (
        <Box
          mx="auto"
          height="85vh"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <CircularProgress color="success" size={70} />
        </Box>
      )}
      {!isLoading &&
        blogList.map((blog) => {
          const { content, id, createdOn, email, imageUrl, title } = blog;
          return (
            <Card
              sx={{
                width: 350,
                mx: "auto",
                bgcolor: "#eeeeee34",
                borderRadius: "10px",
              }}
              key={id}
              align="center"
            >
              <Box
                sx={{
                  "&:hover": {
                    backgroundColor: "#d8dfe4",
                    cursor: "pointer",
                    transition: "all .5s",
                  },
                }}
                onClick={() => {
                  navigate(`/details/${id}`, { state: blog });
                  !currentUser &&
                    toastRedNotify("Please login to see in details");
                }}
              >
                <CardHeader title={title} subheader={createdOn} />
                <CardMedia
                  component="img"
                  // height="194"
                  image={imageUrl}
                  alt="blogImg"
                  sx={{
                    height: "220px",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
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
                  {content}
                </Typography>
                <Typography variant="body1" color="text" mt={2}>
                  {email}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="comment">
                  <ModeCommentOutlined />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
          );
        })}
    </Box>
  );
};

export default BlogCard;
