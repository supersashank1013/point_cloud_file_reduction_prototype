import vortexLogo from "../assets/vortex-logo.svg";

function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <a href="#" className="inline-flex items-center" aria-label="VORTEX home">
          <img src={vortexLogo} alt="VORTEX" className="h-10 w-auto" />
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <a href="#workspace" className="transition hover:text-slate-950">
            Workspace
          </a>
          <a href="#results" className="transition hover:text-slate-950">
            Results
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
