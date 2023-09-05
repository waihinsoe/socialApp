import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { decrement, increment } from "../../store/slice/counterSlice";
import { BlueButton } from "../../utils/theme";
import { fetchAppData } from "../../store/slice/appSlice";

const Feed = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("accessToken");

  return (
    <>
      <Box>{count}</Box>
      <BlueButton
        onClick={() => accessToken && dispatch(fetchAppData(accessToken))}
      >
        fetchData
      </BlueButton>
      <BlueButton onClick={() => dispatch(decrement())}>decreate</BlueButton>
    </>
  );
};

export default Feed;
