import { PdfUploader } from "@/app/components/pdf-uploader";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">PDF Content Viewer</h1>
      <PdfUploader />
    </main>
  );
}
