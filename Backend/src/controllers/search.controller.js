import { fetchTMDB } from "../utilities/featchfromTMDB.js";
import { ApiError } from "../utilities/apiErrorHandler.js";
import { ApiResponse } from "../utilities/apiResponseHandler.js";
import { User } from "../models/user.model.js";

export const searchMovie = async (req, res) => {
  const { query } = req.params;

  try {
    const data = await fetchTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=1` // &include_adult=false&language=en-US&page=1
    );

    if (data.results.length === 0) {
      return res.status(404).send(null);
      s;
    }

    res.status(200).json(new ApiResponse(200, data.results));

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data?.results[0].id,
          image: data?.results[0].poster_path,
          title: data?.results[0].title,
          searchType: "movies",
          createdAt: new Date(),
        },
      },
    });
  } catch (error) {
    res
      .status(500)
      .json(
        new ApiError(500, "Something Went Wrong While featching movies query")
      );
  }
};

export const searchWebseries = async (req, res) => {
  const { query } = req.params;

  try {
    const data = await fetchTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=true&language=en-US&page=1` // &include_adult=false&language=en-US&page=1
    );

    if (data.results.length === 0) {
      return res.status(404).send(null);
    }

    res.status(200).json(new ApiResponse(200, data.results));

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data?.results[0].id,
          image: data?.results[0].poster_path,
          title: data?.results[0].name,
          searchType: "webseries",
          createdAt: new Date(),
        },
      },
    });
  } catch (error) {
    res
      .status(500)
      .json(
        new ApiError(
          500,
          "Something Went Wrong While featching webseries query"
        )
      );
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json(new ApiResponse(200, req.user.searchHistory));
  } catch (error) {
    res
      .status(500)
      .json(
        new ApiError(
          500,
          "Something Went wrong while featching the seatch History"
        )
      );
  }
};

export const removeHistoryItem = async (req, res) => {
  let { id } = req.params;

  id = parseInt(id);

  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });
    res
      .status(200)
      .json(new ApiResponse(200, "seachHistory Removed Succefully"));
  } catch (error) {
    res
      .status(500)
      .json(
        new ApiError(500, "Something went wrong while removing search history")
      );
  }
};
