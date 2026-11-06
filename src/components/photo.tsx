import Image from "next/image";

export function Photo({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1600}
      height={1000}
      priority={priority}
      className={`w-full rounded-3xl object-cover ${className}`}
    />
  );
}
