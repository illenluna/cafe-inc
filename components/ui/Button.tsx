import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type CommonProps = {
  variant?: Variant;
  compact?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function buildClassName(variant: Variant, compact: boolean, className: string) {
  const cutClass = variant === "ghost" ? "" : "cut cut--sm";
  const compactClass = compact ? "btn--compact" : "";
  return ["btn", `btn--${variant}`, cutClass, compactClass, className].filter(Boolean).join(" ");
}

export function Button({ variant = "primary", compact = false, className = "", children, href, ...rest }: ButtonProps) {
  const classes = buildClassName(variant, compact, className);

  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
