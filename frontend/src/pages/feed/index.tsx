import { useAppSelector } from "../../store/hook";
import { BlueButton } from "../../utils/theme";
import { appData } from "../../store/slice/appSlice";
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
import { Post, PostStatus } from "../../typings/types";
import { config } from "../../config/config";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { ActualFileObject } from "filepond";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Feed = () => {
  const { mode } = useContext(ColorModeContext);
  const { owner, posts, users } = useAppSelector(appData);
  const accessToken = localStorage.getItem("accessToken");
  const [newPost, setNewPost] = useState<Post>({
    caption: "",
    users_id: owner ? (owner.id as number) : 0,
    photo_url: "",
    status: PostStatus.public,
  });

  const [images, setImages] = useState<ActualFileObject[]>([]);
  console.log(images);
  console.log(newPost);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const createNewPost = async () => {
    if (!owner) return;
    const isValid = newPost.users_id > 0 && newPost.status;
    if (!isValid) return alert("need somethings");

    if (images.length) {
      const formData = new FormData();
      formData.append("file", images[0]);
      const response = await fetch(`${config.apiBaseUrl}/assets`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const result = await response.json();
        newPost.photo_url = result.data;
        console.log(newPost);
      }
    }

    const isPerfect = newPost.photo_url?.length || newPost.caption.length > 0;
    if (!isPerfect) return alert("need photo or captions");
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
      {/* createPost start */}
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
      {/* createPost end */}

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

      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "10px",
            width: 500,
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            backgroundColor: mode === "dark" ? "#212833" : "#f9fafb",
            color: mode === "dark" ? "#eeeff2" : "#4e5d78",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              pl: 6,
            }}
          >
            Create post
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseRoundedIcon sx={{ fontSize: 35 }} />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: mode === "dark" ? "#212833" : "#f9fafb",
            color: mode === "dark" ? "#eeeff2" : "#4e5d78",
          }}
        >
          <DialogContentText id="alert-dialog-description">
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Avatar src={owner?.asset_url} sx={{ width: 45, height: 45 }} />
              <Box>
                <Typography
                  sx={{ color: mode === "dark" ? "#eeeff2" : "#4e5d78" }}
                >
                  {owner?.name}
                </Typography>
                <select
                  name="status"
                  value={newPost.status}
                  id="status"
                  onChange={(evt) => {
                    evt.target.value === "public" &&
                      setNewPost({ ...newPost, status: PostStatus.public });
                    evt.target.value === "friends" &&
                      setNewPost({ ...newPost, status: PostStatus.friends });
                  }}
                >
                  <option value={PostStatus.public}>Public</option>
                  <option value={PostStatus.friends}>Friends</option>
                </select>
              </Box>
            </Box>
            <Box>
              <FilePond
                files={images}
                onupdatefiles={(fileItems) => {
                  // Set current file objects to this.state
                  setImages(fileItems.map((fileItem) => fileItem.file));
                }}
                allowMultiple={true}
                name="files"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: mode === "dark" ? "#212833" : "#f9fafb",
            color: mode === "dark" ? "#eeeff2" : "#4e5d78",
          }}
        >
          <BlueButton
            onClick={() => {
              createNewPost();
              handleClose();
            }}
            color="success"
            fullWidth
          >
            Post
          </BlueButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Feed;
