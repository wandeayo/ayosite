import { CursorDot } from "@/components/site/cursor-dot";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { siteFontVariables } from "@/lib/site-fonts";

/** Document shell for the (site) routes and the global 404. Callers import globals.css. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={siteFontVariables}>
      <body className="flex min-h-screen flex-col">
        <CursorDot />
        <Nav />
        <main className="flex-1 pt-[72px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
