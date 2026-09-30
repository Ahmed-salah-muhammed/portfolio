import { createSlice } from '@reduxjs/toolkit';

// Theme mode is deliberately NOT kept here: MUI's `useColorScheme` already owns it,
// follows the system preference by default and persists to localStorage safely.
// Duplicating it in Redux would give us two sources of truth that can drift apart.
const initialState = {
  mobileNavOpen: false,
  chatbotOpen: false,
  activeSection: 'home',
  // "Show on map" from a project card → the map feature flies there and opens the popup.
  // `nonce` lets the same project be requested twice in a row.
  mapFocus: { projectId: null, nonce: 0 },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openMobileNav: (state) => {
      state.mobileNavOpen = true;
    },
    closeMobileNav: (state) => {
      state.mobileNavOpen = false;
    },
    toggleChatbot: (state) => {
      state.chatbotOpen = !state.chatbotOpen;
    },
    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },
    focusProjectOnMap: (state, action) => {
      state.mapFocus = { projectId: action.payload, nonce: state.mapFocus.nonce + 1 };
    },
  },
});

export const {
  openMobileNav,
  closeMobileNav,
  toggleChatbot,
  setActiveSection,
  focusProjectOnMap,
} = uiSlice.actions;

export const selectMobileNavOpen = (state) => state.ui.mobileNavOpen;
export const selectChatbotOpen = (state) => state.ui.chatbotOpen;
export const selectActiveSection = (state) => state.ui.activeSection;
export const selectMapFocus = (state) => state.ui.mapFocus;

export default uiSlice.reducer;
