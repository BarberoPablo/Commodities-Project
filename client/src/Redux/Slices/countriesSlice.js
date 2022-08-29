import { createSlice } from "@reduxjs/toolkit";

export const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    allCountries: [],
    countriesSorted: [],
  },
  reducers: {
    getCountries: (state, action) => {
      state.allCountries = action.payload;
    },
    sortCountries: (state, action) => {
    const countrysWithPost = action.payload.map((e) => e.country).sort();
    const countrysSet = new Set(countrysWithPost);
    const countrysToMap = [];
    countrysSet.forEach((e) => {
      let point = "";
      if (e === "") {
        countrysSet.delete(point);
      }
    });
    countrysSet.forEach((e) => {
      countrysToMap.push(e);
    });
    state.countriesSorted = countrysToMap;
    }
  },
});

export const { getCountries, sortCountries } = countriesSlice.actions;
export default countriesSlice.reducer;
