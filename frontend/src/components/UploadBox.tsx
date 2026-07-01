import type { Dispatch, SetStateAction } from "react";

type Props = {
  selectedFile: File | null;
  setSelectedFile: Dispatch<SetStateAction<File | null>>;
};

const formatFileSize = (size: number) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;

  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

function UploadBox({ selectedFile, setSelectedFile }: Props) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor="point-cloud-file"
          className="text-sm font-semibold text-slate-900"
        >
          Point cloud file
        </label>
        <span className="text-xs font-semibold text-slate-500">PLY only</span>
      </div>

      <label
        htmlFor="point-cloud-file"
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white px-6 py-8 text-center transition hover:border-blue-400 hover:bg-blue-50"
      >
        <span className="text-sm font-semibold text-slate-950">
          {selectedFile ? selectedFile.name : "Choose a point cloud file"}
        </span>
        <span className="mt-2 text-sm text-slate-500">
          {selectedFile
            ? `${formatFileSize(selectedFile.size)} selected`
            : "No file selected"}
        </span>
      </label>

      <input
        id="point-cloud-file"
        type="file"
        accept=".ply"
        onChange={(event) => {
          if (event.target.files?.[0]) {
            setSelectedFile(event.target.files[0]);
          }
        }}
        className="sr-only"
      />
    </section>
  );
}

export default UploadBox;
