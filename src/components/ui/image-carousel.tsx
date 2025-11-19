import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";

interface ImageCarouselProps {
  images: string[];
  setDisplayImage: (image: string) => void;
}

function ImageCarousel({ images, setDisplayImage }: ImageCarouselProps) {
  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-full "
      >
        <CarouselContent className="mx-1 items-center">
          {images.map((image, index) => (
            <CarouselItem key={index} className="flex-shrink-0 basis-1/3 pl-0">
              <div className="flex items-center justify-center p-1 aspect-video w-[100px]">
                <button
                  type="button"
                  onClick={() => setDisplayImage(image)}
                  aria-label={`Show image ${index + 1}`}
                  className="w-full h-full p-0 rounded-sm overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                    <img
                    src={`${import.meta.env.VITE_SERVER}${image}`}
                    alt={`Image ${index + 1}`}
                    className="object-cover h-full rounded-sm"
                    />
                </button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default ImageCarousel;
