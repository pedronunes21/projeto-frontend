import { FaRegClipboard } from 'react-icons/fa'

const ReportButton = (props: { link?: string }) => {
    if (!props.link)
        return <button className='bg-orange w-[50px] h-[50px] flex items-center justify-center rounded-full'>
            <FaRegClipboard size={20} color="white" />
        </button>
    else
        return <a className='bg-orange w-[50px] h-[50px] flex items-center justify-center rounded-full' href={props.link}>
            <FaRegClipboard size={20} color="white" />
        </a>
}

export default ReportButton;