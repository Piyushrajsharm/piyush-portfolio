import { BriefcaseBusiness, GitBranch, Mail } from "lucide-react";
import Link from "next/link";
import { type ReactNode } from "react";
import { type PortfolioData } from "@/config/site";

export function FooterSection({ portfolio }: { portfolio: PortfolioData }) {
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 pb-10 pt-8 md:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
        <Link href="#home" className="focus-ring flex items-center gap-3 rounded-[8px]">
          <span className="grid h-9 w-9 place-items-center rounded-[8px] border border-white/15 bg-white/[0.08] text-xs font-semibold">
            PR
          </span>
          <span className="text-sm text-muted-foreground">
            © {year} {portfolio.person.fullName}
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <FooterIcon href={`mailto:${portfolio.person.email}`} label="Email">
            <Mail className="h-4 w-4" aria-hidden="true" />
          </FooterIcon>
          <FooterIcon href={portfolio.person.socials.linkedin} label="LinkedIn">
            <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
          </FooterIcon>
          <FooterIcon href={portfolio.person.socials.github} label="GitHub">
            <GitBranch className="h-4 w-4" aria-hidden="true" />
          </FooterIcon>
        </div>
      </div>
    </footer>
  );
}

function FooterIcon({
  href,
  label,
  children
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="focus-ring grid h-10 w-10 place-items-center rounded-[8px] border border-white/10 bg-white/[0.05] text-muted-foreground transition hover:text-foreground"
    >
      {children}
    </a>
  );
}
