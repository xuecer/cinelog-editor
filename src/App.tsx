import { lazy, Suspense } from "react";

const CineLogEditor = lazy(() => import("@/components/editor/CineLogEditor"));

function App() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <header className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          CineLog Editor
        </h1>
        <p className="text-slate-500 mt-2">影音爱好者的富文本编辑器.</p>
      </header>

      <main>
        <Suspense
          fallback={
            <div className="max-w-4xl mx-auto text-center py-12">
              <div className="text-slate-400">加载编辑器...</div>
            </div>
          }
        >
          <CineLogEditor />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
