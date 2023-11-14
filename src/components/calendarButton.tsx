import { FaCalendarAlt } from 'react-icons/fa'

const CalendarButton = (props: { link?: string }) => {
    if (!props.link)
        return <button className='bg-orange w-[50px] h-[50px] flex items-center justify-center rounded-full'>
            <FaCalendarAlt size={20} color="white" />
        </button>
    else
        return <a className='bg-orange w-[50px] h-[50px] flex items-center justify-center rounded-full' href={props.link}>
            <FaCalendarAlt size={20} color="white" />
        </a>
}

export default CalendarButton;