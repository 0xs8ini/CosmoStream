import axios from "axios";

export const fetchTMDB = async (url) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.TMDB_API_Read_Access_Token,
    },
  };

  const responce = await axios.get(url, options);

  if (responce.status != 200) {
    throw new Error("Failed to featch data from TMDB" + responce.statusText);
  }

  return responce.data;
};
