import Image from "next/image";
import { site } from "@/config/site";
import { publicFileExists } from "@/lib/publicFile";

// Renders the photo only when public/me.jpg exists. No placeholder: a fake avatar adds nothing.
export function Avatar({ size = 120 }: { size?: number }) {
  if (!publicFileExists(site.photo)) return null;
  return (
    <Image
      src={site.photo}
      alt={site.name}
      width={size}
      height={size}
      className="rounded-full border border-line object-cover"
      style={{ width: size, height: size }}
    />
  );
}
