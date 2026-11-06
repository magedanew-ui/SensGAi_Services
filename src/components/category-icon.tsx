import {
  Car,
  Circle,
  Flame,
  Landmark,
  Plane,
  Shield,
  Smartphone,
  Wifi,
  Zap,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Car,
  Flame,
  Landmark,
  Plane,
  Shield,
  Smartphone,
  Wifi,
  Zap,
};

export function CategoryIcon({ name }: { name: string }) {
  const Icon = icons[name] ?? Circle;
  return <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />;
}
