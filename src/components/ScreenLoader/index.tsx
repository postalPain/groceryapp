import Spinner from '../Spinner';

const ScreenLoader = () => (
    <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary opacity-60 transition-opacity animate-fade-out"
    >
        <Spinner />
    </div>
);

export default ScreenLoader;

