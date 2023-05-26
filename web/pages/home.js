import Navbar from '~/components/Navbar';
import Subnavbar from '~/components/Subnavbar';

const Home = () => {
    return (
        <div>
            <Navbar />
            <Subnavbar />
            <div className="w-full h-[1000px]"></div>
        </div>
    );
};

export default Home;
