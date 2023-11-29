import { useRef, useEffect } from "react"

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

type Props = { image: string } 

export const RandomFox = ({ image }: Props): JSX.Element => {

    const node = useRef<HTMLImageElement>(null)

    useEffect(() => {
        // Nuevo observador
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // onIntersection -> console.log
                if (entry.isIntersecting) {
                    console.log('Hey you!')
                    //node.current.src = image
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
    }, []);

    return <img className="max-w-lg h-auto p-2 rounded-xl" ref={node} src={image}/>

}