import { Box } from "@mui/material";
import { useState } from "react";
import Avatar from "react-avatar-edit";

interface Props {
  setPreview: (value: any) => void;
}
const UploadAvatar = ({ setPreview }: Props) => {
  const [src, setSrc] = useState("");

  const onCrop = (view: any) => {
    setPreview(view);
  };
  return (
    <Box>
      <Avatar
        width={200}
        height={200}
        onCrop={onCrop}
        src={src}
        label={"Choose a profile"}
      />
    </Box>
  );
};

export default UploadAvatar;
