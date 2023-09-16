import { FaPen } from 'react-icons/fa'

const EditButton = (props: { link: string }) => {
    return (
        <a className='flex items-center justify-center rounded-full' href={props.link}>
            <FaPen size={15} color="black" />
        </a>
    )
}

export default EditButton;