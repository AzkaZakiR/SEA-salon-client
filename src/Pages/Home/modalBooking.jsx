import React, { useState } from 'react';
import axios from 'axios';

const Modal = ({ isOpen, onClose, id_booking, serviceName }) => {
    if (!isOpen) return null;
    const [formData, setFormData] = useState({
        date: '',
        name: '',
        phone_number: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(
                'http://localhost:3000/api/v1/booking/create',
                {
                    services_id: id_booking,
                    date: formData.date,
                    name: formData.name,
                    phone_number: formData.phone_number,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Booking created:', response.data);
            onClose(); // Close the modal after successful booking
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
                <div className="p-5 mx-4">
                    <button
                        className="text-gray-500 hover:text-gray-700 float-right"
                        onClick={onClose}
                    >
                        X
                    </button>
                    <h2 className="text-2xl font-bold text-center mt-2">{serviceName}</h2>
                    <label
                        onClick={onClose}
                        htmlFor="booking-modal"
                        className="absolute top-2 right-2 btn btn-sm btn-circle"
                    >
                        ✕
                    </label>
                </div>
                <div className="modal">
                    <div className="modal-box bg-gray-100 shadow-xl relative p-4">
                        <form className="grid grid-cols-1 gap-4 mt-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Date"
                                className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                                required
                            />
                            <input
                                name="name"
                                type="text"
                                placeholder="Your Name"
                                className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                                required
                            />
                            <input
                                type="submit"
                                value="Confirm"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md cursor-pointer"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
