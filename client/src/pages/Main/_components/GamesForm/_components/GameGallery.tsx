import { useResize } from "../../../../../hooks/useResize";

export default function GameGallery({ image }: {image: string}) {
  const screenSize = useResize()

  if (screenSize.isScreenMd) {return (
  <div className="card__image-container">
    <img className="gallery-img-item-sm" src={image} alt="preview" />
  </div>)}

  return (
    <div className="card__image-container">
      <img className="gallery-img-item-sm" src={image} alt="preview" />
    </div>)
}