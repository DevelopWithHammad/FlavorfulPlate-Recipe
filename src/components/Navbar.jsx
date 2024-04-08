import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className=''>
            <header className="bg-white ">
                <nav className="mx-auto flex max-w-[1200px] items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <h1 className='font-bold text-2xl text-primary'>Flavorful Plate</h1>
                        </a>
                    </div>
                    <div className="lg:flex lg:gap-x-12">
                        <div className="relative">
                            <button type="button" className="hidden lg:flex  items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 transition duration-300 ease-in-out hover:text-primary" aria-expanded="false">
                                Home
                            </button>
                        </div>

                        <Link to="/recipes" className="text-sm font-semibold leading-6 text-gray-900 transition duration-300 ease-in-out hover:text-primary">Recipes</Link>
                        <a href="#" className="text-sm font-semibold leading-6 text-gray-900 transition duration-300 ease-in-out hover:text-primary hidden lg:block">Chefs</a>
                        <a href="#" className="text-sm font-semibold leading-6 text-gray-900 transition duration-300 ease-in-out hover:text-primary hidden lg:block">Foods Items</a>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <a href="#" className="text-sm font-semibold leading-6 text-gray-900 transition duration-300 ease-in-out hover:text-primary">Log in <span aria-hidden="true">&rarr;</span></a>
                    </div>
                </nav>
                <div className="lg:hidden" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 z-10"></div>
                </div>
            </header>
        </div>
    )
}

export default Navbar
