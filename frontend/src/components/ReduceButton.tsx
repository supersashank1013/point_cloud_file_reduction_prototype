import type { Dispatch, SetStateAction } from "react";

import axios from "axios";

import api from "../api/api";
import type { ReductionResult } from "../types";

type Props = {
  selectedFile: File | null;
  voxelSize: number;
  loading: boolean;
  setResult: Dispatch<SetStateAction<ReductionResult | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

function ReduceButton({
  selectedFile,
  voxelSize,
  loading,
  setResult,
  setLoading,
}: Props) {
  const handleReduce = async () => {
    if (!selectedFile) {
      alert("Please select a .ply file.");
      return;
    }

    const formData = new FormData();

    formData.append("file", selectedFile);
    formData.append("voxel_size", voxelSize.toString());

    try {
      setResult(null);
      setLoading(true);

      const response = await api.post("/reduce", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data);
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        const detail = error.response?.data?.detail;

        if (typeof detail === "string") {
          alert(detail);
          return;
        }

        if (!error.response) {
          alert("Backend is not reachable. Start the FastAPI server on port 8000.");
          return;
        }
      }

      alert("Reduction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleReduce}
      disabled={!selectedFile || loading}
      className="inline-flex w-full items-center justify-center rounded-lg bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
    >
      {loading && (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}
      {loading ? "Reducing..." : "Reduce point cloud"}
    </button>
  );
}

export default ReduceButton;
