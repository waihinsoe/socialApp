import { Box, Button, styled } from "@mui/material";
import Layout from "../Layout";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { decrement, increment } from "../../store/counterSlice";

const Feed = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const BlueButton = styled(Button)({
    backgroundColor: "skyblue",
    color: "#fff",
    margin: 5,
    "&:hover": {
      backgroundColor: "lightblue",
    },
    "&:disabled": {
      backgroundColor: "gray",
      color: "white",
    },
  });
  return (
    <Layout>
      <Box sx={{ color: "#ffffff" }}>{count}</Box>
      <BlueButton onClick={() => dispatch(increment())}>increate</BlueButton>
      <Button
        sx={{ color: "#ffff", backgroundColor: "success.main" }}
        onClick={() => dispatch(decrement())}
      >
        decreate
      </Button>
    </Layout>
  );
};

export default Feed;
