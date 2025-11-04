import dino from "@/assets/tired_dino.gif";

function RecycleBinPage() {
  return (
    <div>
      <h1 className="font-semibold tracking-tight text-zinc-950 opacity-50">
        Recycle Bin (coming soon)
      </h1>
      <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
        <img
          src={dino} // <-- Replace with your actual image path
          alt="Recycle Bin Placeholder"
          className="w-64 mb-6 opacity-50"
        />
      </div>
    </div>
  );
}

export default RecycleBinPage;
