import { Box } from "@mui/material";
import Layout from "../Layout";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { decrement, increment } from "../../store/slice/counterSlice";
import { BlueButton } from "../../utils/theme";

const Feed = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <Layout>
      <Box>{count}</Box>
      <BlueButton onClick={() => dispatch(increment())}>increate</BlueButton>
      <BlueButton onClick={() => dispatch(decrement())}>decreate</BlueButton>
    </Layout>
  );
};

export default Feed;
