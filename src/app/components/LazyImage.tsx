import { useRef, useEffect, useState } from "react"
import type { ImgHTMLAttributes } from "react"

/* La forma implícita de declarar una variable en TypeScript es la misma de JavaScript:

    export const RandomFox = () => {
        return <img />
    }

Esto no se recomienda por ser una forma IMPLÍCITA de declaración

*/

/* Una manera de hacer explícita la declaración de la función o variable sería con el uso de FunctionComponent o FC de React:

    import { FunctionComponent, FC } from 'react'

    export const RandomFox: FunctionComponent = () => {
        return <img />
    }
Esto actualmente no se utiliza por utilizar "ayudantes" de React innecesarios
*/

/* La forma explícita de declarar una función sería:

export const RandomFox = (): JSX.Element => {
    return <img />
}

Esta es la forma que utilizaremos en el curso */

type LazyImageProps = {
    src: string
    onLazyLoad?: () => void
}
type ImageNativeProps = ImgHTMLAttributes<HTMLImageElement>
type Props = LazyImageProps & ImageNativeProps

export const LazyImage = ({ src, ...imgProps }: Props): JSX.Element => {

    const node = useRef<HTMLImageElement>(null)
    
    // Start creating a blank image
    const [currentSrc, setCurrentSrc] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=");

    useEffect(() => {
        // Nuevo observador
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // onIntersection -> load image
                if (entry.isIntersecting) {
                    setCurrentSrc(src)
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
    }, [src]);

    return (
        <img
            ref={node}
            src={currentSrc}
            {...imgProps}
        />
    );
}