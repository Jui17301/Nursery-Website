
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Fetch all categories
export const fetchCategories = async () => {
  const { data } = await axios.get('http://localhost:3000/categories');
  console.log(data)
  return data;
 
};

export const CategoryList = () => {
  const { data: categories, isLoading, error } = useQuery({
    queryKey:['categories'],
    queryFn: fetchCategories
})

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  return (
    <div>
      <h1 className='text-3xl text-green-800 text-center p-5 font-bold'>Categories</h1>
      <ul className='flex justify-center'>
        {categories.map((category) => (
          
             <li className='px-5' key={category._id}>
            <Link to={`/category/${category.name}`}>{category.name}</Link>
          </li>
          
         
        ))}
      </ul>
    </div>
  );
};
