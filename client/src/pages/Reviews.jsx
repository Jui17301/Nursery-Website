import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { RiDoubleQuotesR } from "react-icons/ri";
import './Reviews.css'
import ReviewContent from './ReviewContent';

// Fetch function to get data from the API
const fetchReviews = async () => {
  const response = await axios.get('http://localhost:3000/reviews');
  return response.data;
};
 const Reviews = () => {
  // Using TanStack Query to fetch data
  const { data: reviews, error, isLoading } = useQuery({
    queryKey: ['reviews'], // The key for the query
    queryFn: fetchReviews, // The function to fetch the data
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data!</div>;

  return (
    <>
         <div className='m-24'>
      <h1 className='text-3xl'>What <span className='font-bold text-green-400'>People</span > Say <span className='font-bold text-green-400'>About</span> Us</h1>
      <p className='italic'>This tree is a fantastic addition to my collection. It was easy to plant, and the customer service team was very helpful  <br/>  when I had a few questions. I can’t wait to see it flourish in the coming years.
      </p>
      <div className='bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 '>
    
      {reviews.map((review, index) => (
        <div key={index} className=''>
         <div className=''>
         
          <div className='review-container'>
       
            <div className='flex flex-col gap-7 items-center justify-start relative'>
              
              <div className='image-container review-image'>            
                <img src={review.img} alt={review.title} style={{ width: '200px', height: '350px', borderRadius:'80px 0px'}} /></div>           
           <div className='px-5 py-3 rounded-s-full bg-green-300 absolute bottom-0 right-8'><p><strong className='text-black text-xl'>{review.name}</strong> </p>
          <h3>{review.title}</h3>
          <p>Rating: {review.rating}</p>
          </div>

          </div>

          <div className='bg-purple-200 px-2 py-4 comment-overlay' style={{borderRadius:'50px 50px 50px 0px'}} >
        {/* <RiDoubleQuotesR className='text-7xl text-green-500' /> */}
        <h2 className='text-xl text-black'>{review.comment}</h2>
        </div>
            </div>
         </div>
         
          
         
        </div>
      ))}

      </div>
      </div>
      <div>
        
      </div>
     
    
    </>
  );
};

export default Reviews;
