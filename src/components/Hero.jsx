import React from 'react'

const Hero = () => {
    return (
        <div className='max-w-[1200px] px-12 mt-12 shadow-xl rounded-xl bg-white mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 pb-12'>
            <div className=' left w-full lg:w-1/2' >
                <h1 className='font-serif text-7xl font-bold  text-secondary text-center lg:text-left'>Follow <span className='text-primary'> Our Recipe</span> To Make Your <span className='text-primary'>Cooking</span>  Easier</h1>
                <p className='font-semibold mt-8 text-center lg:text-left'>A platform filled with a variety of delicious and flavorful recipes, inviting users to explore and discover new culinary delights.</p>
            </div>
            <div className='right w-1/2 h-[600px] overflow-hidden'>
                <img src="https://images.pexels.com/photos/3338675/pexels-photo-3338675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="hero" className='rounded-2xl w-[800px]' />
            </div>
        </div>
    )
}

export default Hero
