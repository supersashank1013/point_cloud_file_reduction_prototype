type Props = {
  url: string;
};

function DownloadButton({ url }: Props) {
  return (
    <a
      href={`http://localhost:8000${url}`}
      className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
    >
      Download reduced file
    </a>
  );
}

export default DownloadButton;
