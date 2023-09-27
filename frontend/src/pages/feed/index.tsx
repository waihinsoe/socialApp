import { useAppDispatch, useAppSelector } from "../../store/hook";
import { BlueButton } from "../../utils/theme";
import { appData, fetchAppData } from "../../store/slice/appSlice";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { ColorModeContext } from "../../contexts/ColorModeContext";
import { useContext, useState } from "react";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import { Post } from "../../typings/types";
import { config } from "../../config/config";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

const Feed = () => {
  const { mode } = useContext(ColorModeContext);
  const { owner, posts, users } = useAppSelector(appData);
  const accessToken = localStorage.getItem("accessToken");
  const [newPost, setNewPost] = useState<Post>({
    caption: "",
    users_id: owner ? (owner.id as number) : 0,
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const createNewPost = async () => {
    if (!owner) return;
    console.log(newPost);
    const isValid = newPost.caption.length > 0 && newPost.users_id > 0;
    if (!isValid) return alert("need  caption!!!");
    const response = await fetch(`${config.apiBaseUrl}/feed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(newPost),
    });

    if (response.ok) {
      const createdNewPost = await response.json();
      console.log(createdNewPost);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={owner ? owner.asset_url : ""}
            sx={{ width: 50, height: 50 }}
          />
          <Button
            onClick={handleClickOpen}
            sx={{
              p: 1.5,
              border: `1px solid ${mode === "dark" ? "#4e5d78" : "#e5e5e5"}`,
              outline: "none",
              borderRadius: "10px",
              width: "100%",
              backgroundColor: mode === "dark" ? "#212833" : "#f9fafb",
              color: mode === "dark" ? "#eeeff2" : "#4e5d78",
              textTransform: "none",
              display: "flex",
              justifyContent: "start",
            }}
          >
            What's happening?
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            onClick={handleClickOpen}
            sx={{
              color: mode === "dark" ? "white" : "#4e5d78",
              flexGrow: 1,
              textTransform: "none",
            }}
            startIcon={<VideocamOutlinedIcon />}
          >
            Live Video
          </Button>
          <Button
            onClick={handleClickOpen}
            sx={{
              color: mode === "dark" ? "white" : "#4e5d78",
              flexGrow: 1,
              textTransform: "none",
            }}
            startIcon={<PhotoLibraryOutlinedIcon />}
          >
            Photo/Video
          </Button>
          <Button
            onClick={handleClickOpen}
            sx={{
              color: mode === "dark" ? "white" : "#4e5d78",
              flexGrow: 1,
              textTransform: "none",
            }}
            startIcon={<SentimentSatisfiedOutlinedIcon />}
          >
            Feeling
          </Button>
          <BlueButton sx={{ width: 150 }} onClick={createNewPost}>
            Post
          </BlueButton>
        </Box>
      </Paper>

      {posts.length > 0 &&
        posts.map((post) => {
          const postOwner = users.find((user) => user.id === post.users_id);
          return (
            <Paper
              elevation={2}
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 3,
                borderRadius: 5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <Avatar
                    src={postOwner?.asset_url}
                    sx={{ width: 50, height: 50 }}
                  />
                  <Box>
                    <Typography>{postOwner?.name}</Typography>
                    <Typography>{post.caption}</Typography>
                  </Box>
                </Box>
                <IconButton>
                  <MoreHorizIcon />
                </IconButton>
              </Box>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <img
                  src={post.photo_url}
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "15px",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  {users.slice(12, users.length).map((user) => {
                    return (
                      <Avatar
                        src={user.asset_url}
                        sx={{ width: 30, height: 30, mr: -1 }}
                      />
                    );
                  })}
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Typography>3 Comments</Typography>
                  <Typography>17 shares</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  borderTop: "1px solid",
                  borderBottom: "1px solid",
                  py: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: mode === "dark" ? "white" : "#4e5d78",
                }}
              >
                <Button
                  sx={{
                    color: mode === "dark" ? "white" : "#4e5d78",
                    textTransform: "capitalize",
                  }}
                  startIcon={<FavoriteBorderOutlinedIcon />}
                >
                  like
                </Button>
                <Button
                  sx={{
                    color: mode === "dark" ? "white" : "#4e5d78",
                    textTransform: "capitalize",
                  }}
                  startIcon={<ChatBubbleOutlineRoundedIcon />}
                >
                  comments
                </Button>
                <Button
                  sx={{
                    color: mode === "dark" ? "white" : "#4e5d78",
                    textTransform: "capitalize",
                  }}
                  startIcon={<ShareOutlinedIcon />}
                >
                  share
                </Button>
              </Box>
            </Paper>
          );
        })}

      {/* <BlueButton
        onClick={() => accessToken && dispatch(fetchAppData(accessToken))}
      >
        fetchData
      </BlueButton> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            backgroundColor: mode === "dark" ? "#212833" : "#f9fafb",
            color: mode === "dark" ? "#eeeff2" : "#4e5d78",
          }}
        >
          <Typography variant="h5">Create post</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: mode === "dark" ? "#212833" : "#f9fafb",
            color: mode === "dark" ? "#eeeff2" : "#4e5d78",
          }}
        >
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: mode === "dark" ? "#212833" : "#f9fafb",
            color: mode === "dark" ? "#eeeff2" : "#4e5d78",
          }}
        >
          <Button onClick={handleClose} color="success" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Feed;
