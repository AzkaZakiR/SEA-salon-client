import React from 'react';
import { Link } from 'react-router-dom';


const ShortInfo = () => {

  const SizeNav = {
    "color": "white",
    "font-family": "'Roboto Condensed', sans-serif"
  };

  return (
    <>
      <div class="bg-slate-900 text-slate-300 p-10">
        <div class="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5">
          <div class="text-center pb-8 lg:pb-16">
            <h1 class="text-4xl font-bold text-white">PROFESSIONAL BARBERSHOP<br />FOR MEN ONLY</h1>
          </div>
          <div class="flex flex-col space-y-4 lg:space-y-8">
            <p class="text-sm">Et tellus rhoncus urna a. Tempus felis, sociis lorem aliquet nibh pellentesque. Vitae nunc, dolor, blandit eget eleifend etiam id. Amet arcu lobortis sed pulvinar cursus pretium sit pretium.</p>
            <div class="flex items-center space-x-4">
              <h1 class="text-2xl font-bold text-white">SINCE 2015</h1>
              <p class="text-sm">Dui cursus neque et at ipsum. Cursus urna fringilla nisl enim duis cras odio.</p>
            </div>
            <div class="flex items-center space-x-4">
              <h1 class="text-2xl font-bold text-white">1000+ CLIENTS</h1>
              <p class="text-sm">Dui cursus neque et at ipsum. Cursus urna fringilla nisl enim duis cras odio.</p>
            </div>
            <button class="btn btn-primary px-4 py-2 rounded-md text-white hover:bg-opacity-80 focus:outline-none">
              <Link to="/about">Learn More</Link>
            </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default ShortInfo;

