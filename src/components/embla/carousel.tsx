"use client"

import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel, {
    EmblaCarouselType,
    EmblaOptionsType
} from 'embla-carousel-react'
import {
    PrevButton,
    NextButton
} from './arrows'

type PropType = {
    options?: EmblaOptionsType,
    children: React.ReactNode
    className?: string,
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

    const scrollPrev = useCallback(
        () => emblaApi && emblaApi.scrollPrev(),
        [emblaApi]
    )
    const scrollNext = useCallback(
        () => emblaApi && emblaApi.scrollNext(),
        [emblaApi]
    )

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev())
        setNextBtnDisabled(!emblaApi.canScrollNext())
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        onSelect(emblaApi)
        emblaApi.on('reInit', onSelect)
        emblaApi.on('select', onSelect)
    }, [emblaApi, onSelect])

    return (
        <>
            <div className="embla relative">
                <div className="embla__viewport" ref={emblaRef}>
                    <div className={`embla__container ${props.className}`}>
                        {props.children}
                    </div>
                </div>

                <div className="embla__buttons flex items-center absolute top-0 right-0 py-[20px] gap-[10px]">
                    <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
                    <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
                </div>
            </div>
        </>
    )
}

export default EmblaCarousel
