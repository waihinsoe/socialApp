import { useAppDispatch, useAppSelector } from "../../store/hook";
import { BlueButton } from "../../utils/theme";
import { appData, fetchAppData } from "../../store/slice/appSlice";

const Feed = () => {
  const { ...data } = useAppSelector(appData);
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("accessToken");
  return (
    <>
      <BlueButton
        onClick={() => accessToken && dispatch(fetchAppData(accessToken))}
      >
        fetchData
      </BlueButton>
    </>
  );
};

export default Feed;
