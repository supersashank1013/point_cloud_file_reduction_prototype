import { useState } from "react";

import Header from "./components/Header";
import UploadBox from "./components/UploadBox";
import VoxelInput from "./components/VoxelInput";
import ReduceButton from "./components/ReduceButton";
import ResultCard from "./components/ResultCard";
import DownloadButton from "./components/DownloadButton";
import type { ReductionResult } from "./types";
import heroImage from "./assets/hero.png";

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [voxelSize, setVoxelSize] = useState(0.005);
  const [result, setResult] = useState<ReductionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const status = loading ? "Processing" : selectedFile ? "Ready" : "Waiting";

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Header />

      <main className="mx-auto w-full max-w-6xl px-5 pb-16 pt-10 sm:px-6 lg:px-8">
        <section className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-blue-700">
              Point Cloud Reduction
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              Reduce heavy 3D scans into lighter working files.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              VORTEX uses voxel downsampling to create compact PLY outputs while
              preserving the structure needed for analysis and visualization.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-medium text-slate-500">Input</p>
                <p className="mt-2 text-xl font-semibold text-slate-950">
                  PLY files
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-medium text-slate-500">Method</p>
                <p className="mt-2 text-xl font-semibold text-slate-950">
                  Voxel grid
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-medium text-slate-500">Output</p>
                <p className="mt-2 text-xl font-semibold text-slate-950">
                  Reduced PLY
                </p>
              </div>
            </div>
          </div>

          <figure className="mx-auto w-full max-w-sm rounded-lg border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <img
              src={heroImage}
              alt="Layered point cloud reduction preview"
              className="mx-auto h-auto w-56"
            />
            <figcaption className="mt-6 text-center text-sm font-medium text-slate-600">
              Lightweight file preparation for 3D workflows
            </figcaption>
          </figure>
        </section>

        <section
          id="workspace"
          className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]"
        >
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-700">
                  Workspace
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-slate-950">
                  Prepare reduction
                </h2>
              </div>
              <span className="inline-flex w-fit items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {status}
              </span>
            </div>

            <div className="mt-6 space-y-6">
              <UploadBox
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
              />
              <VoxelInput
                voxelSize={voxelSize}
                setVoxelSize={setVoxelSize}
              />
              <ReduceButton
                selectedFile={selectedFile}
                voxelSize={voxelSize}
                loading={loading}
                setResult={setResult}
                setLoading={setLoading}
              />
            </div>

            {loading && (
              <div
                className="mt-5 rounded-lg border border-blue-100 bg-blue-50 px-4 py-4"
                role="status"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-blue-800">
                      Converting point cloud
                    </p>
                    <p className="mt-1 text-sm text-blue-700">
                      Processing your file. The reduction percentage will appear
                      when conversion completes.
                    </p>
                  </div>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-right text-xs font-semibold text-blue-800">
                    Working
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-blue-100">
                  <div className="conversion-progress-bar h-full rounded-full bg-blue-600" />
                </div>
              </div>
            )}
          </div>

          <aside
            id="results"
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-5">
              <p className="text-sm font-semibold text-emerald-700">Output</p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-950">
                Reduction result
              </h2>
            </div>

            <ResultCard result={result} />

            {result?.download_url && (
              <DownloadButton url={result.download_url} />
            )}
          </aside>
        </section>
      </main>
    </div>
  );
}

export default App;
