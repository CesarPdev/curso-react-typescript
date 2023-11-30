"use client";
import { useState } from "react";
import type { MouseEventHandler } from "react";
import { LazyImage } from "./components/LazyImage"
import Button from "./components/Button";

const random = (): number => Math.floor(Math.random() * 123) + 1;

const generateId = (): string => Math.random().toString(36).substring(2, 9);

type ImageItem = { id: string, url: string};

export default function Home() {
  
  const [images, setImages] = useState<Array<ImageItem>>([]);

  const addNewFox: MouseEventHandler = (event) => {
    event.preventDefault();
    const newFox: ImageItem = {
      id: generateId(),
      url:`https://randomfox.ca/images/${random()}.jpg`
    };
    setImages([...images, newFox]);
  }

  const deleteLastFox: MouseEventHandler = (event) => {
    event.preventDefault();
    if (images.length > 0) {
      setImages(images.slice(0, images.length - 1));
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <p className="text-md text-blue-700 py-2">CURSO REACT CON TYPESCRIPT</p>
      <p className="text-3xl font-bold py-2">Componente Lazy Image</p>
      <p className="text-center pt-2 pb-4">Un componente genérico de React para cargar imágenes con lazy loading.</p>
      <div className="flex gap-2">
        <Button text="Add new Fox" action={addNewFox} />
        <Button text="Delete last Fox" action={deleteLastFox} />
      </div>
      {images.map(({ id, url }, index) => (
        <div key={id} className="p-4">
          <LazyImage
            src={url}
            className="max-w-lg h-auto rounded-lg bg-slate-500 cursor-pointer"
            onClick={() => console.log('Putoooooo!')}
            onLazyLoad={(img) => {console.log(`Image #${index + 1} cargada. Nodo:`, img)}}
          />
        </div>
      ))}
    </div>
  )
}
