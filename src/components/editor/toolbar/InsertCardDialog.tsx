import { useState } from "react";
import { useSlate } from "slate-react";
import { Film, Music } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MovieSearch } from "./MovieSearch";
import { MusicSearch } from "./MusicSearch";
import { insertMovieCard, insertMusicCard } from "@/lib/editor-utils";

interface InsertCardDialogProps {
  open: boolean;
  onClose: () => void;
}

/**
 * 插入卡片弹窗（统一电影和音乐搜索）
 */
export const InsertCardDialog = ({ open, onClose }: InsertCardDialogProps) => {
  const editor = useSlate();
  const [activeTab, setActiveTab] = useState<"movie" | "music">("movie");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] p-0 gap-0">
        {/* 标题 */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-xl font-bold">插入书影音等</DialogTitle>
        </DialogHeader>

        {/* 标签页 */}
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "movie" | "music")}
          className="flex-1"
        >
          <div className="px-6 pt-4">
            <TabsList className="w-full">
              <TabsTrigger value="movie" className="flex-1">
                <Film className="h-4 w-4 mr-2" />
                影视
              </TabsTrigger>
              <TabsTrigger value="music" className="flex-1">
                <Music className="h-4 w-4 mr-2" />
                音乐
              </TabsTrigger>
            </TabsList>
          </div>

          {/* 电影搜索 */}
          <TabsContent value="movie" className="px-6 pb-6 mt-0">
            <MovieSearch
              onSelect={(movie) => {
                insertMovieCard(editor, movie);
                onClose();
              }}
            />
          </TabsContent>

          {/* 音乐搜索 */}
          <TabsContent value="music" className="px-6 pb-6 mt-0">
            <MusicSearch
              onSelect={(music) => {
                insertMusicCard(editor, music);
                onClose();
              }}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
