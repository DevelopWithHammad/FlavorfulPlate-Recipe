import { useState } from 'react';
import axios from "axios";
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';

const Recipes = () => {
  const [searchParams, setSearchParams] = useSearchParams({ skip: 0, limit: 6 });
  const [activeBtn, setActiveBtn] = useState(1);

  const limit = parseInt(searchParams.get('limit') || 0);
  const skip = parseInt(searchParams.get('skip') || 0);
  const q = searchParams.get('q') || '';
  const mealType = searchParams.get('meal-type') || '';

  const { data: recipes, isLoading, error } = useQuery({
    queryKey: ["recipes", limit, skip, q, mealType],
    queryFn: async () => {
      try {
        let url = `https://dummyjson.com/recipes/search?limit=${limit}&skip=${skip}&q=${q}`;
        if (mealType) {
          url = `https://dummyjson.com/recipes/meal-type/${mealType}?limit=${limit}&skip=${skip}`
        }
        const response = await axios.get(url);
        return response.data.recipes;
      } catch (error) {
        console.log("error ===>>", error);
      }
    },
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }
  // 2, true, limit
  const handleMove = (val, isArrowBtn, moveCount) => {
    setActiveBtn(val)
    if (isArrowBtn) {
      setSearchParams((prev) => {
        prev.set('skip', Math.max(skip + moveCount, 0));
        return prev;
      });
    }
    else {
      const skipValue = (val - 1) * 6; // Calculate skip value based on button clicked
      setSearchParams((prev) => {
        prev.set('skip', Math.max(skipValue, 0)); // Update skip parameter
        return prev;
      });
    }
  };

  function searchByNameHandler(e) {
    setSearchParams((prev) => {
      prev.set('q', e.target.value);
      prev.set('skip', 0);
      prev.delete('meal-type');
      return prev
    })
  }

  return (
    <div className='pb-8'>
      <div className='bg_image w-full py-32 relative' style={{
        backgroundImage: "url('https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}>
        <div className='text-white font-serif absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]'>
          <h1 className='text-4xl text-center'>Choose any Recipe</h1>
          <p className='text-center'>Happy cooking !</p>
        </div>
        <div className='absolute top-0 w-full h-full bg-black/65 z-0'></div>
      </div>

      <div className="w-[1200px] mx-auto relative mt-8 rounded-md flex items-center gap-8 mb-4">
        <input
          onChange={(e) => { searchByNameHandler(e) }}
          type="text"
          name="recipe"
          id="recipe"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:primary sm:text-sm sm:leading-6 outline-none"
          placeholder="Search by name"
        />
        <select
          onChange={(e) => {
            setSearchParams((prev) => {
              prev.set('skip', 0);
              prev.delete('q');
              prev.set('meal-type', e.target.value)
              return prev;
            })
          }}
          className="border p-2"
        >
          <option disabled selected>Select meal-type</option>
          {recipes.flatMap((recipe) => recipe.mealType.map((type) => ({ id: recipe.id, type }))).map(({ id, type }, index) => (
            <option key={`${id}-${index}`} value={type}>{type}</option>
          ))}


        </select>
      </div>

      <div className='pt-8 px-auto w-[1200px] mx-auto grid grid-cols-3 gap-8'>{recipes.map((recipe) => (
        <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
          <div className='mx-auto relative cursor-pointer hover:opacity-85 group overflow-hidden'>
            <img src={recipe.image} alt={recipe.title} className='aspect-video object-cover transition duration-200 ease-in-out group-hover:scale-110' />
            <div className='absolute bottom-1/2 translate-y-12 text-white left-4 z-[1]'>
              <h1 className='text-xl text-center font-bold tracking-wide'>{recipe.name}</h1>
              <p>Click for Recipe...</p>
            </div>
            <div className='absolute top-0 w-full h-full bg-black/25 z-0'></div>
          </div>
        </Link>

      ))}</div>

      {recipes.length === 0 && (
        <h1 className='text-4xl font-bold max-w-[400px] text-center mx-auto pb-12 tracking-wider'>This <span className='text-primary'> Recipe </span> is  <span className='text-primary'>not Available</span> yet!</h1>
      )}

      {/* butons for pagination */}

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
        <div className="flex flex-1 justify-between sm:hidden">
          <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
          <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">

          <div className='mx-auto'>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                disabled={skip + limit >= recipes.length}
                onClick={() => { handleMove(2, true, -limit) }}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                disabled={skip + limit > skip + limit + recipes.length || recipes.length === 0}
                onClick={() => { handleMove(1, false) }} aria-current="page"
                className={`${skip === 0 ? 'bg-indigo-600 text-white' : 'bg-white text-black'}  relative z-10 inline-flex items-center  px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ring-1 ring-inset ring-gray-300`}>1</button>
              <button
                disabled={skip + limit > skip + limit + recipes.length || recipes.length === 0}
                onClick={() => { handleMove(2, false) }}
                className={`${skip === 6 ? 'bg-indigo-600 text-white' : 'bg-white text-black'} relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 `}>2</button>
              <button
                disabled={skip + limit > skip + limit + recipes.length || recipes.length === 0}
                onClick={() => { handleMove(3, false) }}
                className={`${skip === 12 ? 'bg-indigo-600 text-white' : 'bg-white text-black'} relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300  md:inline-flex`}>3</button>
              <button
                disabled={skip + limit > skip + limit + recipes.length || recipes.length === 0}
                onClick={() => { handleMove(4, false) }}
                className={`${skip === 18 ? 'bg-indigo-600 text-white' : 'bg-white text-black'} relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300  md:inline-flex`}>4</button>
              <button
                disabled={skip + limit > skip + limit + recipes.length || recipes.length === 0}
                onClick={() => { handleMove(5, false) }}
                className={`${skip === 24 ? 'bg-indigo-600 text-white' : 'bg-white text-black'} relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300`}>5</button>
              <button
                disabled={skip + limit == 30 || recipes.length === 0}
                onClick={() => { handleMove(2, true, limit) }}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300"
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Recipes





