import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://rickandmortyapi.com/api';

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (params, thunkAPI) => {
    try {
      const res = await axios.get(`/character`, {
        params: {
          page: params?.page,
          name: params?.name,
        },
      });

      const resultObj = {
        info: res.data.info,
        results: res.data.results,
        page: params.page || 1,
        filterName: params.name || "",
      };

      return resultObj;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCharacterById = createAsyncThunk(
  'characters/fetchCharacterById',
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/character/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
