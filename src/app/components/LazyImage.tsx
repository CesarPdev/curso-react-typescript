import { useRef, useEffect, useState } from "react"
import type { ImgHTMLAttributes } from "react"

type LazyImageProps = {
    src: string
    onLazyLoad?: (img: HTMLImageElement) => void
}
type ImageNativeProps = ImgHTMLAttributes<HTMLImageElement>
type Props = LazyImageProps & ImageNativeProps

export const LazyImage = ({ src, onLazyLoad,...imgProps }: Props): JSX.Element => {

    const node = useRef<HTMLImageElement>(null)
    
    // Start creating a blank image
    const [currentSrc, setCurrentSrc] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=");

    useEffect(() => {
        // Nuevo observador
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // onIntersection -> load image
                if (!entry.isIntersecting || !node.current) {
                    return;
                }
                setCurrentSrc(src)
                // onLazyLoad
                if (typeof onLazyLoad === "function") {
                    onLazyLoad(node.current)
                }
            })
        });

        // Añadir observador al elemento
        if (node.current){
            observer.observe(node.current)
        };

        // Desconectar
        return () => {
            observer.disconnect()
        };
    }, [src, onLazyLoad]);

    return (
        <img
            ref={node}
            src={currentSrc}
            {...imgProps}
        />
    );
}