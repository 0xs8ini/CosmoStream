import { fetchTMDB } from "../utilities/featchfromTMDB.js";
import { ApiResponse } from "../utilities/apiResponseHandler.js";
import { ApiError } from "../utilities/apiErrorHandler.js";

export async function getTrendingWebseries(req, res) {
  try {
    const data = await fetchTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );

    const randomWebseries =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.status(200).json(new ApiResponse(200, randomWebseries));
  } catch (error) {
    res
      .status(500)
      .json(
        new ApiError(
          500,
          "Something went wrong while featching trendding webseries"
        )
      );
  }
}

export async function getWebseriesTrailer(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );

    res.status(200).json(new ApiResponse(200, data.results));
  } catch (error) {
    res
      .status(500)
      .json(new ApiError(500, "Something went wrong while featching trailer"));
  }
}

export async function getWebseriesDetail(req, res) {
  const { id } = req.params;

  try {
    const data = await fetchTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US'`
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

export async function getWebseriesCategory(req, res) {
  const { category } = req.params;
  try {
    const data = await fetchTMDB(
      `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`
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
