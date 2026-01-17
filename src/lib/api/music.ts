/**
 * 音乐 API 封装
 * 使用 iTunes Search API (Apple 官方，免费无需认证)
 */

// API 配置
const ITUNES_API_BASE = "https://itunes.apple.com";

// ==================== 类型定义 ====================

// iTunes API 原始响应
export interface ITunesTrack {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  artworkUrl60: string;
  trackTimeMillis: number;
  releaseDate: string;
  primaryGenreName: string;
  previewUrl?: string;
}

export interface ITunesSearchResponse {
  resultCount: number;
  results: ITunesTrack[];
}

// 统一的歌曲数据格式（兼容原来的接口）
export interface Song {
  id: number;
  name: string;
  artists: Array<{
    name: string;
  }>;
  album: {
    name: string;
    picUrl: string;
  };
  duration: number; // 毫秒
}

export interface SearchResponse {
  result: {
    songs: Song[];
    songCount: number;
  };
}

// ==================== API 函数 ====================

/**
 * 搜索歌曲
 * @param keywords 搜索关键词
 * @param limit 返回数量（默认 30）
 * @returns 搜索结果
 */
export async function searchSongs(
  keywords: string,
  limit: number = 30
): Promise<SearchResponse> {
  // iTunes API 参数
  const params = new URLSearchParams({
    term: keywords,
    media: "music",
    entity: "song",
    limit: limit.toString(),
  });

  const url = `${ITUNES_API_BASE}/search?${params.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`iTunes API 请求失败: ${response.status}`);
    }

    const data: ITunesSearchResponse = await response.json();

    // 转换为统一格式
    const songs: Song[] = data.results.map((track) => ({
      id: track.trackId,
      name: track.trackName,
      artists: [{ name: track.artistName }],
      album: {
        name: track.collectionName,
        picUrl: track.artworkUrl100,
      },
      duration: track.trackTimeMillis,
    }));

    return {
      result: {
        songs,
        songCount: data.resultCount,
      },
    };
  } catch (error) {
    console.error("搜索歌曲失败:", error);
    throw error;
  }
}

/**
 * 格式化歌曲时长
 * @param milliseconds 毫秒
 * @returns 格式化的时长字符串（例如：03:45）
 */
export function formatDuration(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

/**
 * 获取歌手名称列表（拼接多个歌手）
 * @param artists 歌手数组
 * @returns 歌手名称字符串（例如："周杰伦 / 方文山"）
 */
export function getArtistNames(artists: Array<{ name: string }>): string {
  return artists.map((artist) => artist.name).join(" / ");
}
