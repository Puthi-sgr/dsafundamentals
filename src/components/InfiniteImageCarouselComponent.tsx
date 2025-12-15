import { useState } from "react";
import { InfiniteImageCarousel } from "../datastructure/List/CircularDoublyLinkedList/exercise/InfiniteImageCarousel";

export const InfiniteImageCarouselComponent = () => {
  const [carousel] = useState(() => new InfiniteImageCarousel());
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  const sync = () => {
    setCurrentImage(carousel.getCurrentImage());
    setCount(carousel.getSize());
  };

  const addImage = () => {
    const url = `Image ${Math.floor(Math.random() * 100)}`;
    carousel.addImage(url);
    sync();
  };

  const nextImage = () => {
    carousel.nextImage();
    sync();
  };

  const prevImage = () => {
    carousel.prevImage();
    sync();
  };

  const isEmpty = carousel.isEmpty();

  return (
    <div className="card">
      <h2 className="title">Infinite Image Carousel</h2>
      <div>
        <p className="label">Current Image:</p>
        <p className="value">{currentImage || "No Image Yet"}</p>
        <p className="label">Total Images:</p>
        <p className="value">{count}</p>
      </div>
      <div className="row">
        <button onClick={addImage} className="button button-primary" type="button">
          Add Image
        </button>
        <button onClick={prevImage} disabled={isEmpty}className="button" type="button">
          Prev
        </button>
        <button onClick={nextImage} className="button" type="button" disabled={isEmpty}>
          Next
        </button>
      </div>
    </div>
  );
};

