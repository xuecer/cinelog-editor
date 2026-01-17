import { useState, useEffect } from "react";
import { Search, Loader2, Music } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchSongs, formatDuration, getArtistNames } from "@/lib/api/music";
import type { Song } from "@/lib/api/music";

interface MusicSearchProps {
  onSelect: (music: {
    title: string;
    artist?: string;
    album?: string;
    audioUrl: string;
    cover?: string;
    duration?: number;
  }) => void;
}

/**
 * 音乐搜索组件
 */
export const MusicSearch = ({ onSelect }: MusicSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 防抖搜索
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await searchSongs(query);
        setResults(response.result.songs || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "搜索失败");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms 防抖

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="space-y-4">
      {/* 搜索输入框 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="搜索音乐..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
          autoFocus
        />
      </div>

      {/* 加载状态 */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
          <span className="ml-2 text-sm text-slate-500">搜索中...</span>
        </div>
      )}

      {/* 错误提示 */}
      {error && (
        <div className="text-center py-8">
          <p className="text-sm text-red-500">{error}</p>
          <p className="text-xs text-slate-400 mt-2">
            请检查网络连接或稍后再试
          </p>
        </div>
      )}

      {/* 搜索结果 */}
      {!loading && !error && results.length > 0 && (
        <div className="max-h-[400px] overflow-y-auto space-y-2">
          {results.map((song) => (
            <button
              key={song.id}
              onClick={() => {
                onSelect({
                  title: song.name,
                  artist: getArtistNames(song.artists),
                  album: song.album.name,
                  audioUrl: "", // 暂不提供实际音频 URL（版权问题）
                  cover: song.album.picUrl,
                  duration: Math.floor(song.duration / 1000), // 转为秒
                });
              }}
              className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-left"
            >
              {/* 封面 */}
              <img
                src={song.album.picUrl}
                alt={song.album.name}
                className="w-16 h-16 object-cover rounded shadow-sm flex-shrink-0"
              />

              {/* 信息 */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 truncate">
                  {song.name}
                </h4>
                <p className="text-xs text-slate-600 truncate">
                  {getArtistNames(song.artists)}
                </p>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {song.album.name}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                  <Music className="h-3 w-3" />
                  <span>{formatDuration(song.duration)}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* 空状态 */}
      {!loading && !error && query && results.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-slate-500">未找到相关音乐</p>
          <p className="text-xs text-slate-400 mt-1">尝试使用不同的关键词</p>
        </div>
      )}

      {/* 初始状态 */}
      {!query && (
        <div className="text-center py-8">
          <Music className="h-12 w-12 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500">输入歌曲或艺术家名称开始搜索</p>
          <p className="text-xs text-slate-400 mt-1">
            支持歌曲名、专辑名、歌手名搜索
          </p>
        </div>
      )}
    </div>
  );
};
