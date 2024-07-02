import React, { useState } from 'react';
import baseurl from '../../baseurl';
import axios from 'axios';

const ReviewModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        rating: '',
        review_text: '',
        name: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(
                `${baseurl}/api/v1/review/create`,
                {
                    rating: formData.rating,
                    review_text: formData.review_text,
                    reviewer: {
                        name: formData.name,
                        email: formData.email,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Review created:', response.data);
            onClose(); // Close the modal after successful review submission
        } catch (error) {
            console.error('Error creating review:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
                <div className='p-5 mx-4'>
                    <button
                        className="text-gray-500 hover:text-gray-700 float-right"
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>
                <div className="modal">
                    <div className="modal-box bg-gray-100 shadow-xl relative p-4">
                        <form className="grid grid-cols-1 gap-4 mt-4" onSubmit={handleSubmit}>
                            <input
                                type="number"
                                name="rating"
                                placeholder="Rating"
                                className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                                value={formData.rating}
                                onChange={handleChange}
                                required
                            />
                            <textarea
                                name="review_text"
                                placeholder="Review Text"
                                className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                                value={formData.review_text}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="submit"
                                value="Submit Review"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md cursor-pointer"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
