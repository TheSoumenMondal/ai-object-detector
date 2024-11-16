import ObjectDetection from "@/components/object-detection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center p-8 bg-slate-950 text-teal-50">
      <h2 className="select-none gradient-title font-extrabold text-3xl md:text-6xl lg:text-8xl tracking-tighter md:p-6 text-center">
        AI Object Detection
      </h2>
      <ObjectDetection />
    </div>
  );
}
