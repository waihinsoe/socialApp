import { useAppDispatch, useAppSelector } from "../../store/hook";
import { BlueButton } from "../../utils/theme";
import { appData, fetchAppData } from "../../store/slice/appSlice";
import { Avatar, Box, Button, Paper } from "@mui/material";
import { ColorModeContext } from "../../contexts/ColorModeContext";
import { useContext, useState } from "react";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import { Post } from "../../typings/types";
import { config } from "../../config/config";
const Feed = () => {
  const { mode } = useContext(ColorModeContext);
  const { owner } = useAppSelector(appData);
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const [newPost, setNewPost] = useState<Post>({
    caption: "",
    usersId: owner?.id as number,
  });

  const createNewPost = async () => {
    const isValid = newPost.caption.length > 0 && newPost.usersId > 0;
    if (!isValid) return alert("need more caption!!!");
    const response = await fetch(`${config.apiBaseUrl}/feed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(newPost),
    });

    if (response.ok) {
      const responseJson = await response.json();
      console.log(responseJson);
    }
  };

  return (
    <Box>
      <Paper elevation={5} sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar src={owner ? owner.asset_url : ""} />
          <input
            style={{
              padding: "12px",
              border: `1px solid ${mode === "dark" ? "#4e5d78" : "#e5e5e5"}`,
              outline: "none",
              borderRadius: "10px",
              width: "100%",
              backgroundColor: mode === "dark" ? "#212833" : "#f9fafb",
              color: mode === "dark" ? "#eeeff2" : "#4e5d78",
            }}
            placeholder="What's happening?"
            onChange={(evt) =>
              setNewPost({ ...newPost, caption: evt.target.value })
            }
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            sx={{ color: mode === "dark" ? "white" : "#4e5d78", flexGrow: 1 }}
            startIcon={<VideocamOutlinedIcon />}
          >
            live video
          </Button>
          <Button
            sx={{ color: mode === "dark" ? "white" : "#4e5d78", flexGrow: 1 }}
            startIcon={<PhotoLibraryOutlinedIcon />}
          >
            Photo/video
          </Button>
          <Button
            sx={{ color: mode === "dark" ? "white" : "#4e5d78", flexGrow: 1 }}
            startIcon={<SentimentSatisfiedOutlinedIcon />}
          >
            feeling
          </Button>
          <BlueButton sx={{ width: 150 }} onClick={createNewPost}>
            Post
          </BlueButton>
        </Box>
      </Paper>
      <BlueButton
        onClick={() => accessToken && dispatch(fetchAppData(accessToken))}
      >
        fetchData
      </BlueButton>
    </Box>
  );
};

export default Feed;
