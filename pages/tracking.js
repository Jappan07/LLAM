import dynamic from 'next/dynamic'

const Tracking = dynamic(() => import('../components/Tracking/Tracking'), {
    ssr: false,
});

const Tracker = () => {
    return (
        <div>
            <Tracking />
        </div>
    )
}

export default Tracker