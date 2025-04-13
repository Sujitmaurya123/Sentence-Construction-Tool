import { Button } from "../ui/button";


const Navbar = () => {
    return (
        <nav className="  w-full flex justify-between items-center p-4 bg-white shadow">
            <div className="w-1/3"></div>
            <div className="w-1/3 text-center text-3xl font-medium text-gray-800">Sentence Construction</div>
            <div className="w-1/3 flex justify-end">
                <Button className="text-gray-700 bg-white hover:bg-white">⋮</Button>
            </div>
        </nav>
    );
};

export default Navbar;
