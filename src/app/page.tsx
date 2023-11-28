"use client";
import { useState } from "react";
import { RandomFox } from "./components/RandomFox"

const random = (): number => Math.floor(Math.random() * 123) + 1;

export default function Home() {
  
  const [images, setImages] = useState<string[]>([
    `https://randomfox.ca/images/${random()}.jpg`,
    `https://randomfox.ca/images/${random()}.jpg`,
    `https://randomfox.ca/images/${random()}.jpg`,
    `https://randomfox.ca/images/${random()}.jpg`,
  ]);

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <p className="text-md text-blue-700 py-2">CURSO REACT CON TYPESCRIPT</p>
      <p className="text-3xl font-bold py-2">Componente Lazy Image</p>
      <p className="text-center pt-2 pb-4">Un componente genérico de React para cargar imágenes con lazy loading.</p>
      {images.map((image, index) => (
        <div key={index} className="p-4">
          <RandomFox image={image} />
        </div>
      ))}
    </div>
  )
}
