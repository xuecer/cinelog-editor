/**
 * TMDB (The Movie Database) API 封装
 * 文档：https://developers.themoviedb.org/3
 */

// API 配置
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || "";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

// ==================== 类型定义 ====================

export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  genre_ids: number[];
  popularity: number;
}

export interface TMDBSearchResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

// ==================== API 函数 ====================

/**
 * 搜索电影
 * @param query 搜索关键词
 * @param page 页码（默认 1）
 * @returns 搜索结果
 */
export async function searchMovies(
  query: string,
  page: number = 1
): Promise<TMDBSearchResponse> {
  if (!TMDB_API_KEY) {
    throw new Error(
      "TMDB API Key 未配置，请在 .env.local 中添加 VITE_TMDB_API_KEY"
    );
  }

  const url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
    query
  )}&language=zh-CN&page=${page}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `TMDB API 请求失败: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * 获取电影详情
 * @param movieId 电影 ID
 * @returns 电影详情
 */
export async function getMovieDetails(movieId: number): Promise<TMDBMovie> {
  if (!TMDB_API_KEY) {
    throw new Error("TMDB API Key 未配置");
  }

  const url = `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=zh-CN`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB API 请求失败: ${response.status}`);
  }

  return response.json();
}

/**
 * 获取完整的海报图片 URL
 * @param posterPath 海报路径（从 API 返回）
 * @param size 图片尺寸（w92, w154, w185, w342, w500, w780, original）
 * @returns 完整的图片 URL
 */
export function getMoviePosterUrl(
  posterPath: string | null,
  size: "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original" = "w500"
): string {
  if (!posterPath) {
    // 返回默认占位图
    return "https://via.placeholder.com/500x750?text=No+Poster";
  }
  return `${TMDB_IMAGE_BASE}/${size}${posterPath}`;
}

/**
 * 获取背景图 URL
 * @param backdropPath 背景图路径
 * @param size 图片尺寸
 * @returns 完整的图片 URL
 */
export function getMovieBackdropUrl(
  backdropPath: string | null,
  size: "w300" | "w780" | "w1280" | "original" = "w780"
): string {
  if (!backdropPath) {
    return "https://via.placeholder.com/1280x720?text=No+Backdrop";
  }
  return `${TMDB_IMAGE_BASE}/${size}${backdropPath}`;
}

/**
 * 从 TMDB 返回的日期字符串提取年份
 * @param dateString 日期字符串（格式：YYYY-MM-DD）
 * @returns 年份
 */
export function extractYear(dateString: string | null): number | undefined {
  if (!dateString) return undefined;
  const year = parseInt(dateString.split("-")[0]);
  return isNaN(year) ? undefined : year;
}
