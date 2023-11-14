import { PropsWithChildren } from "react"
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

type PropType = PropsWithChildren<
    React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >
>

export const PrevButton: React.FC<PropType> = (props) => {
    const { children, ...restProps } = props

    return (
        <button
            className="embla__button embla__button--prev"
            type="button"
            {...restProps}
        >
            <div className='bg-orange rounded-full w-[40px] h-[40px] flex items-center justify-center z-[100]'>
                <FaAngleLeft color="#FCF2F2" size={20} />
            </div>
        </button>
    )
}

export const NextButton: React.FC<PropType> = (props) => {
    const { children, ...restProps } = props

    return (
        <button
            className="embla__button embla__button--next"
            type="button"
            {...restProps}
        >
            <div className='bg-orange rounded-full w-[40px] h-[40px] flex items-center justify-center z-[100]'>
                <FaAngleRight color="#FCF2F2" size={20} />
            </div>
        </button>
    )
}