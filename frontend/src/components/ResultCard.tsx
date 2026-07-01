import type { ReductionResult } from "../types";
import { formatPercent } from "../utils/processing";

type Props = {
  result: ReductionResult | null;
};

function ResultCard({ result }: Props) {
  if (!result) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
        <p className="text-sm font-semibold text-slate-950">No result yet</p>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          File size and compression details will appear here.
        </p>
      </div>
    );
  }

  const metrics = [
    {
      label: "Original size",
      value: `${result.original_size_kb} KB`,
      valueClass: "text-slate-950",
    },
    {
      label: "Reduced size",
      value: `${result.reduced_size_kb} KB`,
      valueClass: "text-slate-950",
    },
    {
      label: "Reduction",
      value: `${formatPercent(result.file_reduc_percent)}%`,
      valueClass: "text-emerald-700",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-sm font-semibold text-emerald-800">Reduced by</p>
        <p className="mt-2 text-4xl font-semibold text-emerald-700">
          {formatPercent(result.file_reduc_percent)}%
        </p>
        <p className="mt-2 text-sm leading-6 text-emerald-800">
          {result.original_size_kb} KB to {result.reduced_size_kb} KB
        </p>
      </div>

      <dl className="divide-y divide-slate-200 rounded-lg border border-slate-200">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="flex items-center justify-between gap-4 px-4 py-4"
          >
            <dt className="text-sm font-medium text-slate-500">
              {metric.label}
            </dt>
            <dd className={`text-sm font-semibold ${metric.valueClass}`}>
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default ResultCard;
