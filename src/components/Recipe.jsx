import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import axios from 'axios';

const StarRating = ({ rating }) => {
    const [filledStars, setFilledStars] = useState(parseInt(rating));
    const [hasHalfStar, setHasHalfStar] = useState(rating % 1 !== 0);

    const renderStars = () => {
        const stars = [];
        const totalStars = 5;

        for (let i = 0; i < filledStars; i++) {
            stars.push(<span key={i} className="text-yellow-400 text-3xl">★</span>);
        }

        if (hasHalfStar) {
            stars.push(<span key={totalStars} className="text-yellow-400 text-3xl">&#x2606;</span>);
        }

        for (let i = filledStars + (hasHalfStar ? 1 : 0); i < totalStars; i++) {
            stars.push(<span key={i} className="text-gray-400">★</span>);
        }

        return stars;
    };

    return (
        <div className="flex">
            {renderStars()}
        </div>
    );
};

const Recipe = () => {
    const params = useParams();
    const { data: recipe, isLoading, error } = useQuery({
        queryKey: ["recipe"],
        queryFn: async () => {
            try {
                const response = await axios.get(`https://dummyjson.com/recipes/${params.recipeId}`);
                return response.data;

            } catch (error) {
                console.log("error ===>>", error);
            }
        },
        placeholderData: keepPreviousData,
    });

    return (
        <div className='max-w-[500px] mx-auto mt-12 text-secondary pb-4'>
            <img src={recipe?.image} alt={recipe?.name} className='aspect-video object-cover rounded-3xl w-[300px] mx-auto md:w-full' />
            <div className='px-5 md:px-0'>
                <h1 className='text-xl md:text-3xl font-semibold mt-4'>{recipe?.name}</h1>
                <p className='mt-2 font-medium'>{recipe?.instructions}</p>
                <div className='stars'>
                    <span className="text-yellow-400 text-3xl">&#x2605;</span>
                    <span className="text-yellow-400 text-3xl">&#x2605;</span>
                    <span className="text-yellow-400 text-3xl">&#x2605;</span>
                    <span className="text-yellow-400 text-3xl">&#x2605;</span>
                    <span className="text-yellow-400 text-3xl">&#x2606;</span>
                </div>
            </div>
            <div className='w-full md:w-[300px] mt-8 text-lg px-5 md:px-0'>
                <div className='flex items-center'>
                    <span className='w-1/3'>Course</span>
                    <span className='w-1/4'>─</span>
                    <span className='w-1/3 '>{recipe?.mealType}</span>
                </div>
                <div className='flex items-center'>
                    <span className='w-1/3'>Cusine</span>
                    <span className='w-1/4'>─</span>
                    <span className='w-1/3'>{recipe?.cuisine}</span>
                </div>
                <div className='flex items-center'>
                    <span className='w-1/3'>Prep Time</span>
                    <span className='w-1/4'>─</span>
                    <span className='w-1/3'>{recipe?.prepTimeMinutes}</span>
                </div>
                <div className='flex items-center'>
                    <span className='w-1/3'>Cook Time</span>
                    <span className='w-1/4'>─</span>
                    <span className='w-1/3'>{recipe?.cookTimeMinutes}</span>
                </div>
                <div className='flex items-center'>
                    <span className='w-1/3'>Servings</span>
                    <span className='w-1/4'>─</span>
                    <span className='w-1/3'>{recipe?.servings}</span>
                </div>
                <div className='flex items-center'>
                    <span className='w-1/3'>Difficulty</span>
                    <span className='w-1/4'>─</span>
                    <span className='w-1/3'>{recipe?.difficulty}</span>
                </div>
            </div>
            <div className='mt-8 px-5 md:px-0'>
                <h3 className='text-2xl font-semibold'>Ingredients:</h3>
                <ul className='text-base mt-2'>
                    {recipe?.ingredients.map((ingredient, index) => (
                        <li key={index} className='list-disc ml-5'>{ingredient}</li>
                    ))}
                </ul>

            </div>
        </div>
    )
}

export default Recipe
