import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchMovies, getMoviePosterUrl, extractYear } from "@/lib/api/tmdb";
import type { TMDBMovie } from "@/lib/api/tmdb";

interface MovieSearchProps {
  onSelect: (movie: {
    movieId: string;
    title: string;
    originalTitle?: string;
    posterPath: string;
    year?: number;
    rating?: number;
    overview?: string;
  }) => void;
}

/**
 * 电影搜索组件
 */
export const MovieSearch = ({ onSelect }: MovieSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TMDBMovie[]>([]);
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
        const response = await searchMovies(query);
        setResults(response.results);
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
          placeholder="搜索电影..."
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
            请检查网络连接或 API 配置
          </p>
        </div>
      )}

      {/* 搜索结果 */}
      {!loading && !error && results.length > 0 && (
        <div className="max-h-[400px] overflow-y-auto space-y-2">
          {results.map((movie) => (
            <button
              key={movie.id}
              onClick={() => {
                onSelect({
                  movieId: movie.id.toString(),
                  title: movie.title,
                  originalTitle: movie.original_title,
                  posterPath: getMoviePosterUrl(movie.poster_path),
                  year: extractYear(movie.release_date),
                  rating: movie.vote_average,
                  overview: movie.overview,
                });
              }}
              className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-left"
            >
              {/* 海报 */}
              <img
                src={getMoviePosterUrl(movie.poster_path, "w185")}
                alt={movie.title}
                className="w-16 h-24 object-cover rounded shadow-sm flex-shrink-0"
              />

              {/* 信息 */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 truncate">
                  {movie.title}
                </h4>
                {movie.original_title !== movie.title && (
                  <p className="text-xs text-slate-500 truncate">
                    {movie.original_title}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
                  {movie.release_date && (
                    <span>📅 {extractYear(movie.release_date)}</span>
                  )}
                  {movie.vote_average > 0 && (
                    <span>⭐ {movie.vote_average.toFixed(1)}</span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {movie.overview || "暂无简介"}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* 空状态 */}
      {!loading && !error && query && results.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-slate-500">未找到相关电影</p>
          <p className="text-xs text-slate-400 mt-1">尝试使用不同的关键词</p>
        </div>
      )}

      {/* 初始状态 */}
      {!query && (
        <div className="text-center py-8">
          <Search className="h-12 w-12 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500">输入电影名称开始搜索</p>
          <p className="text-xs text-slate-400 mt-1">支持中文和英文搜索</p>
        </div>
      )}
    </div>
  );
};
