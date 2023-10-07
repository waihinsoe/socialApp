import { useAppSelector } from "../../store/hook";
import { BlueButton } from "../../utils/theme";
import { appData } from "../../store/slice/appSlice";
import { Avatar, Box, Button, Paper } from "@mui/material";
import { ColorModeContext } from "../../contexts/ColorModeContext";
import { useContext, useState } from "react";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import { Post, PostStatus, User } from "../../typings/types";
import { config } from "../../config/config";
import PostCard from "./PostCard";
import { ActualFileObject } from "filepond";
import PostDialog from "./PostDialog";

export const Feed = () => {
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
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
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

      {posts.length > 0 && <PostCard posts={posts} users={users} />}

      <PostDialog
        createNewPost={createNewPost}
        images={images}
        setImages={setImages}
        newPost={newPost}
        setNewPost={setNewPost}
        open={open}
        setOpen={setOpen}
        owner={owner as User}
      />
    </Box>
  );
};
