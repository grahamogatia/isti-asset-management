import { useLookupFunctions } from "@/hooks/useLookupFunctions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import ImageCarousel from "./image-carousel";
import { useState } from "react";

interface ImageDialogProps {
  asset_id: number;
  images: string[];
}

function ImageDialog({ asset_id, images }: ImageDialogProps) {
  const { getAsset } = useLookupFunctions();
  const assetName = getAsset(asset_id)?.asset_name;

  const [displayImage, setDisplayImage] = useState<string>(images[0]);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <img className="max-w-20" src={`${import.meta.env.VITE_SERVER}${images[0]}`} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{assetName}'s Pictures</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="border rounded-md p-4 h-[300px] flex items-center justify-center">
            <img className="max-h-[200px]" src={`${import.meta.env.VITE_SERVER}${displayImage}`} />
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="w-full max-w-[300px] ">
            <ImageCarousel images={images} setDisplayImage={setDisplayImage}/>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ImageDialog;
