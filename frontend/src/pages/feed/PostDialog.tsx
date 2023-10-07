import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  DialogContentText,
  Box,
  DialogActions,
  Avatar,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Post, PostStatus, User } from "../../typings/types";
import { BlueButton } from "../../utils/theme";
import { useContext } from "react";
import { ColorModeContext } from "../../contexts/ColorModeContext";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { ActualFileObject } from "filepond";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface Props {
  owner: User;
  newPost: Post;
  setNewPost: (value: Post) => void;
  images: ActualFileObject[];
  setImages: (value: ActualFileObject[]) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  createNewPost: () => void;
}
const PostDialog = ({
  owner,
  newPost,
  setNewPost,
  images,
  setImages,
  open,
  setOpen,
  createNewPost,
}: Props) => {
  const { mode } = useContext(ColorModeContext);

  const handleClose = () => {
    setOpen(false);
  };
  return (
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
        <DialogContentText
          id="alert-dialog-description"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
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
                setImages(fileItems.map((fileItem) => fileItem.file));
              }}
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
  );
};

export default PostDialog;
