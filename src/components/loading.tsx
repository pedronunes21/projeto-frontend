import Loading from 'react-loading'

const ButtonLoading = () => {
    return (
        <Loading type='spin' color='#fff' width={20} height={20} />
    )
}

const ScreenLoading = () => {
    return (
        <div className='h-screen w-screen bg-purple flex items-center justify-center'>
            <Loading type='spin' color='#fff' width={40} height={40} />
        </div>
    )
}

export { ButtonLoading, ScreenLoading }