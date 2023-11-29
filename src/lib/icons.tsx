import { icons } from "lucide-react";

type IconNames = keyof typeof icons;

type IconsProps = {
  name: IconNames;
  size?: number;
  color?: string;
  className?: string;
};

export const Icon = ({ name, color, size, className }: IconsProps) => {
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    // Lidar com o caso em que o ícone não existe
    return null;
  }

  return <LucideIcon color={color} size={size} className={className} />;
};

export default Icon;
