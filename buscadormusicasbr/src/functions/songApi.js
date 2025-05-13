// src/api/songApi.js
import axios from 'axios';

export const getMySongs = async () => {
  try {
    const response = await axios.get('/musicas/minhasMusicas');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar músicas:", error);
    throw error;
  }
};

export const getSongById = async (id) => {
  try {
    const response = await axios.get(`/musicas/minhasMusicas/${id}`);
    console.log("mongo id: ", id);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar música com ID ${id}:`, error);
    throw error;
  }
};