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

export const getMyPlaylists = async () => {
  try {
    const response = await axios.get('/playlists/minhasPlaylists');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar playlists:", error);
    throw error;
  }
};

export const getPlaylistSongs = async (playlistId) => {
  const response = await axios.get(`/playlists/minhasPlaylists/${playlistId}/musicas`);
  return response.data; // <- THIS must return the array of songs
};


export const getPlaylistById = async (id) => {
  try {
    const response = await axios.get(`/playlists/minhasPlaylists/${id}`);
    console.log("mongo id: ", id);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar playlist com ID ${id}:`, error);
    throw error;
  }
};

export const createPlaylist = async (title, songIds) => {
  try {
    const response = await axios.post('/minhasPlaylists/criarPlaylist', {
      title,
      songIds
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar playlist:", error);
    throw error;
  }
};