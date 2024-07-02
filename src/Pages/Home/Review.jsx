import React, { useState, useEffect } from 'react';
import homebgimg from '../../images/mostafa-meraji-5npGPG0sSVk-unsplash.jpg';
import phone from '../../images/phone-28-24.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import baseurl from '../../baseurl';
import ReviewModal from './reviewModal';

const StarRating = ({ rating }) => {
    const stars = Array(5).fill(0);

    for (let i = 0; i < Math.floor(rating); i++) {
        stars[i] = 1;
    }

    return (
        <div className="flex justify-center mb-2">
            {stars.map((star, index) => (
                <span key={index} className={`text-yellow-500 text-2xl ${star ? '' : 'opacity-25'}`}>
                    ★
                </span>
            ))}
        </div>
    );
};

const Card = ({ children }) => {
    return (
        <div className="bg-green-500 rounded-lg p-5 shadow-md">
            {children}
        </div>
    );
};

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${baseurl}/api/v1/review/`);
                console.log(response.data.data.review);
                setReviews(response.data.data.review);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className="bg-slate-900 p-8 mx">
            <div>
                <h1 className="text-5xl items-center font-bold mb-6 text-white text-center">
                    Reviews From Our Customers <br />

                </h1>
                <div className='flex justify-center'>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white px-4 ml-8 py-2 rounded"
                        onClick={openModal}
                    >
                        Give Your Rating Now
                    </button>
                </div>

            </div>
            <div className="grid grid-cols-5 gap-4 m-3 p-4">
                {reviews.map((review) => (
                    <div key={review.id}>
                        <Card>
                            <StarRating rating={review.rating} />
                            <h1 className="text-center text-white text-l">
                                Duration: {review.review_text} minutes
                            </h1>
                            {review.reviewer ? (
                                <>
                                    <h1 className="text-center text-white text-l">
                                        Reviewer: {review.reviewer.name}
                                    </h1>
                                    <h1 className="text-center text-white text-l">
                                        Email: {review.reviewer.email}
                                    </h1>
                                </>
                            ) : (
                                <h1 className="text-center text-white text-l">
                                    Reviewer: Anonymous
                                </h1>
                            )}
                        </Card>
                    </div>
                ))}
            </div>

            <ReviewModal isOpen={isModalOpen} onClose={closeModal} >

            </ReviewModal>
        </div>
    );
};

export default Reviews;
