import type { RenderElementProps } from "slate-react";
import type { MusicCardElement } from "@/types";
import { Music, Clock } from "lucide-react";

/**
 * 音乐卡片组件
 * 显示音乐信息（封面、歌曲名、艺术家、专辑、时长）
 * 注意：暂不支持实际播放（版权限制）
 */
export const MusicCard = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  const musicElement = element as MusicCardElement;

  // 格式化时长（秒 → MM:SS）
  const formatDuration = (seconds?: number) => {
    if (!seconds) return "";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div {...attributes} contentEditable={false} className="my-4">
      <div className="border border-slate-200 rounded-lg p-4 bg-gradient-to-br from-slate-50 to-white shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          {/* 封面 */}
          <div className="flex-shrink-0">
            {musicElement.cover ? (
              <img
                src={musicElement.cover}
                alt={musicElement.title}
                className="w-20 h-20 rounded-md object-cover shadow-sm"
              />
            ) : (
              <div className="w-20 h-20 rounded-md bg-slate-200 flex items-center justify-center">
                <Music className="h-8 w-8 text-slate-400" />
              </div>
            )}
          </div>

          {/* 信息 */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-slate-900 truncate text-lg">
              {musicElement.title}
            </h4>

            {musicElement.artist && (
              <p className="text-sm text-slate-600 truncate mt-0.5">
                {musicElement.artist}
              </p>
            )}

            {musicElement.album && (
              <p className="text-xs text-slate-500 truncate mt-0.5">
                专辑：{musicElement.album}
              </p>
            )}

            {musicElement.duration && (
              <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                <Clock className="h-3 w-3" />
                <span>{formatDuration(musicElement.duration)}</span>
              </div>
            )}
          </div>

          {/* 播放按钮（装饰性，暂不可用） */}
          <div className="flex-shrink-0">
            <button
              className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
              title="暂不支持播放（版权限制）"
            >
              <Music className="h-5 w-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* 提示信息 */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <p className="text-xs text-slate-400 text-center">
            💿 音乐信息卡片（暂不支持在线播放）
          </p>
        </div>
      </div>

      {/* Slate 必需的 children（隐藏） */}
      <span style={{ display: "none" }}>{children}</span>
    </div>
  );
};

