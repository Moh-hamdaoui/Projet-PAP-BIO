import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type IconBoxProps = {
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
};

export default function IconBox({ icon: Icon, className, iconClassName }: IconBoxProps) {
  return (
    <span
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light text-brand transition-transform duration-200 group-hover:scale-110",
        className
      )}
    >
      <Icon className={cn("h-5 w-5", iconClassName)} strokeWidth={2} aria-hidden />
    </span>
  );
}
