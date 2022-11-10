import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APP_SLICE_KEY } from "../storeConstants";
import { RootState } from "../store";
import storage from "redux-persist/lib/storage";

// configure the redux persist library:
export const appPersistConfig = {
  key: APP_SLICE_KEY,
  version: 1,
  storage,
  blacklist: [],
};

export type SideBarInfo = {
  id: string;
  pressedItemId: string;
};

// Define a type for the slice state
interface AppState {
  sidebarStatus: Array<SideBarInfo>;
}

// Define the initial state using that type
const initialState: AppState = {
  sidebarStatus: [],
};

export const appSlice = createSlice({
  name: APP_SLICE_KEY,
  initialState: initialState,
  reducers: {
    sidebarReset: () => initialState,
    setSidebarStatus: (state, action: PayloadAction<Array<SideBarInfo>>) => {
      state.sidebarStatus = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { sidebarReset, setSidebarStatus } = appSlice.actions;

export default appSlice.reducer;

/*
 * Action functions for this Slice:
 */

const setPressedItemIdForSidebar = (
  sidebarId: string,
  pressedItemId: string
) => {
  return (dispatch, getState: () => RootState) => {
    let newSideBarStatus = [] as Array<SideBarInfo>;
    const sidebarStatus = getState().app.sidebarStatus as Array<SideBarInfo>;

    for (let status of sidebarStatus) {
      if (status.id === sidebarId) {
        status.pressedItemId = pressedItemId;
      }
      newSideBarStatus.push(status);
    }
    dispatch(setSidebarStatus(newSideBarStatus));
  };
};
