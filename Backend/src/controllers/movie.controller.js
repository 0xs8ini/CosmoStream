import { fetchTMDB } from "../utilities/featchfromTMDB.js";
import { ApiError } from "../utilities/apiErrorHandler.js";
import { ApiResponse } from "../utilities/apiResponseHandler.js";

export async function getTrendingMovie(req, res) {
  try {
    const data = await fetchTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );

    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.status(200).json(new ApiResponse(200, randomMovie));
  } catch (error) {
    res
      .status(500)
      .json(new ApiError(500, "Something went wrong while featching movies"));
  }
}

export async function getMovieTrailer(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );

    res.status(200).json(new ApiResponse(200, data.results));
  } catch (error) {
    res
      .status(500)
      .json(new ApiError(500, "Something went wrong while featching trailer"));
  }
}

export async function getMovieDetail(req, res) {
  const { id } = req.params;

  try {
    const data = await fetchTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );

    res.status(200).json(new ApiResponse(200, data));
  } catch (error) {
    res
      .status(500)
      .json(
        new ApiError(500, "Something Went Wrong while featching Movie Details")
      );
  }
}

export async function getMoviesCategory(req, res) {
  const { category } = req.params;
  try {
    const data = await fetchTMDB(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`
    );
    res.status(200).json(new ApiResponse(200, data.results));
  } catch (error) {
    res
      .status(500)
      .json(
        new ApiError(500, "Something Went Wrong while featching Movie Details")
      );
  }
}
