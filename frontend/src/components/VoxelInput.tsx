import type { Dispatch, SetStateAction } from "react";

type Props = {
  voxelSize: number;
  setVoxelSize: Dispatch<SetStateAction<number>>;
};

function VoxelInput({ voxelSize, setVoxelSize }: Props) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor="voxel-size"
          className="text-sm font-semibold text-slate-900"
        >
          Voxel size
        </label>
        <span className="text-xs font-semibold text-slate-500">
          Default 0.005
        </span>
      </div>

      <div className="flex items-center rounded-lg border border-slate-300 bg-white px-4 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
        <input
          id="voxel-size"
          type="number"
          value={voxelSize}
          min={0.001}
          step={0.001}
          onChange={(event) => setVoxelSize(Number(event.target.value))}
          className="w-full bg-transparent py-3 text-base font-medium text-slate-950 outline-none"
        />
        <span className="text-sm font-medium text-slate-500">units</span>
      </div>
    </section>
  );
}

export default VoxelInput;
