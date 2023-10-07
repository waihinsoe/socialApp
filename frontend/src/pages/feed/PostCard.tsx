import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Post, User } from "../../typings/types";
import moment from "moment";
import { useContext } from "react";
import { ColorModeContext } from "../../contexts/ColorModeContext";

interface Props {
  posts: Post[];
  users: User[];
}

const PostCard = ({ posts, users }: Props) => {
  const { mode } = useContext(ColorModeContext);
  return (
    <>
      {posts.map((post) => {
        const postOwner = users.find((user) => user.id === post.users_id);
        const postTime = new Date(post.createdAt as Date);
        const currentTime = new Date();
        const timeDifference = moment(currentTime).diff(moment(postTime));
        const displayPostTime = (timeDifference: number) => {
          if (timeDifference < 60 * 1000) {
            return "now";
          } else if (timeDifference < 60 * 60 * 1000) {
            return `${Math.floor(timeDifference / (60 * 1000))}m`;
          } else if (timeDifference < 24 * 60 * 60 * 1000) {
            return `${Math.floor(timeDifference / (60 * 60 * 1000))}h`;
          } else if (timeDifference < 7 * 24 * 60 * 60 * 1000) {
            return `${Math.floor(timeDifference / (24 * 60 * 60 * 1000))}d`;
          } else {
            return postTime.toLocaleDateString();
          }
        };
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
            key={post.id}
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
                  <Typography>{displayPostTime(timeDifference)}</Typography>
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
                      key={user.id}
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
    </>
  );
};

export default PostCard;
