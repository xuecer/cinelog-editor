import type { RenderElementProps } from "slate-react";
import type { MovieCardElement } from "@/types";

/**
 * 电影卡片组件
 */
export const MovieCard = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  const movieElement = element as MovieCardElement;

  return (
    <div {...attributes} contentEditable={false} className="my-4">
      <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="flex gap-4">
          {/* 海报 */}
          {movieElement.posterPath && (
            <img
              src={movieElement.posterPath}
              alt={movieElement.title}
              className="w-32 h-48 object-cover rounded shadow-sm flex-shrink-0"
            />
          )}

          {/* 信息 */}
          <div className="flex-1 min-w-0">
            {/* 片名 */}
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              {movieElement.title}
            </h3>

            {/* 原片名 */}
            {movieElement.originalTitle &&
              movieElement.originalTitle !== movieElement.title && (
                <p className="text-sm text-slate-500 mb-2">
                  {movieElement.originalTitle}
                </p>
              )}

            {/* 基本信息 */}
            <div className="flex items-center gap-3 mb-3 text-sm text-slate-600">
              {movieElement.year && (
                <span className="flex items-center gap-1">
                  📅 {movieElement.year}
                </span>
              )}
              {movieElement.rating && (
                <span className="flex items-center gap-1 text-amber-600 font-medium">
                  ⭐ {movieElement.rating.toFixed(1)}/10
                </span>
              )}
            </div>

            {/* 电影简介 */}
            {movieElement.overview && (
              <p className="text-sm text-slate-700 leading-relaxed line-clamp-3">
                {movieElement.overview}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 隐藏的 children（Void 节点必需） */}
      <span style={{ display: "none" }}>{children}</span>
    </div>
  );
};
