import Loading from 'react-loading'

export default function ScreenLoading() {
    return (
        <div className='h-screen w-screen bg-purple flex items-center justify-center'>
            <Loading type='spin' color='#fff' width={40} height={40} />
        </div>
    )
}