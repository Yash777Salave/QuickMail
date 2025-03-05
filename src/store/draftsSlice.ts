import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface EmailDraft {
  id: string;
  recipient: string;
  subject: string;
  body: string;
  status: "Draft" | "Sent";
}

interface DraftsState {
  drafts: EmailDraft[];
}

const initialState: DraftsState = {
  drafts: [],
};

const draftsSlice = createSlice({
  name: "drafts",
  initialState,
  reducers: {
    addDraft: (state, action: PayloadAction<EmailDraft>) => {
      state.drafts.push(action.payload);
      AsyncStorage.setItem("drafts", JSON.stringify(state.drafts));
    },
    updateDraft: (state, action: PayloadAction<EmailDraft>) => {
      const index = state.drafts.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state.drafts[index] = action.payload;
        AsyncStorage.setItem("drafts", JSON.stringify(state.drafts));
      }
    },
    loadDrafts: (state, action: PayloadAction<EmailDraft[]>) => {
      state.drafts = action.payload;
    },
  },
});

export const { addDraft, updateDraft, loadDrafts } = draftsSlice.actions;
export default draftsSlice.reducer;
