import Link from "next/link";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/85 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-light text-white">
          <span className="text-red-500">Y</span>ugal <span className="text-red-500">B</span>urde
        </Link>
        <div className="flex items-center gap-4 text-sm text-zinc-300">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/stories" className="hover:text-white">
            Stories
          </Link>
          <Link href="/admin" className="hover:text-white">
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
}
