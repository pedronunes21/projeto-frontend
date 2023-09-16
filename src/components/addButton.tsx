import { FaPlus } from 'react-icons/fa'

const AddButton = (props: { link: string }) => {
    return (
        <a className='bg-orange w-[50px] h-[50px] flex items-center justify-center rounded-full' href={props.link}>
            <FaPlus size={20} color="white" />
        </a>
    )
}

export default AddButton;