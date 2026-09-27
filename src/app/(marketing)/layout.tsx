import { MotionProvider } from "@/components/marketing/MotionProvider";
import { Nav } from "@/components/marketing/Nav";
import { SmoothScroll } from "@/components/marketing/SmoothScroll";

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <SmoothScroll>
      <MotionProvider>
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-field px-5 py-3 text-on-field focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" tabIndex={-1} className="outline-none">{children}</main>
      </MotionProvider>
    </SmoothScroll>
  );
}
