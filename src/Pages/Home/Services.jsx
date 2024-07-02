import React, { useState, useEffect } from 'react';
import homebgimg from "../../images/mostafa-meraji-5npGPG0sSVk-unsplash.jpg";
import phone from '../../images/phone-28-24.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from './modalBooking';
import baseurl from '../../baseurl';

// import logo from '../../assets/logo.svg'; // Adjust path to your logo
const Card = ({ children }) => {
    return (
        <div className="bg-slate-700 rounded-lg p-5 shadow-md">
            {children}
        </div>
    );
};
const Services = () => {
    const [services, setServices] = useState([]);
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null); // State to track selected branch
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingId, setBookingId] = useState(null);
    const [services_name, setserviceName] = useState(null);


    const openModal = (id, serviceName) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("You need to be logged in to book a service.");
            return;
        }
        setBookingId(id);
        setserviceName(serviceName)
        setIsModalOpen(true);
    }; const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                // const response = await axios.get('http://localhost:3000/api/v1/branches/');
                const response = await axios.get(`${baseurl}/api/v1/branches/`);
                setBranches(response.data.data.branches);
            } catch (error) {
                console.error('Error fetching branches:', error);
            }
        };

        fetchBranches();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!selectedBranch) return; // Exit early if no branch is selected

                // const response = await axios.get(`http://localhost:3000/api/v1/services/?branch=${selectedBranch.branch_id}`);
                const response = await axios.get(`${baseurl}/api/v1/services/?branch=${selectedBranch.branch_id}`);
                setServices(response.data.data.services);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [selectedBranch]); // Fetch data whenever selectedBranch changes

    const handleBranchSelect = (branch) => {
        setSelectedBranch(branch);
        console.log("Branch yg ", selectedBranch)
        // You can add logic here to fetch specific data based on the selected branch if needed
    };
    return (
        <div className="bg-slate-900 p-8 mx">
            <div>

                <h1 className="text-5xl items-center font-bold mb-6 text-white text-center">OUR REGULAR SERVICES <br /> </h1>
                <h1 className="text-xl items-center font-bold mb-6 text-white text-center">Available everywhere <br /> </h1>
                <div className="grid grid-cols-3 gap-4 m-3 p-4" >
                    <div className="">
                        <Card>
                            <img src={homebgimg} alt="Shaving" />
                            <h1 className='text-center text-white text-2xl mt-4'>Shaving</h1>
                            <h1 className='text-center text-white text-xl'>Rp. 20000</h1>
                        </Card>
                    </div>
                    <div className="">
                        <Card>
                            <img src={homebgimg} alt="Shaving" />
                            <h1 className='text-center text-white text-2xl mt-4'>Nyukur</h1>
                            <h1 className='text-center text-white text-xl'>Rp. 20000</h1>
                        </Card>
                    </div>
                    <div className="">
                        <Card>
                            <img src={homebgimg} alt="Shaving" />
                            <h1 className='text-center text-white text-2xl mt-4'>Jneggot</h1>
                            <h1 className='text-center text-white text-xl'>Rp. 20000</h1>
                        </Card>
                    </div>
                </div>
            </div>
            <div>
                <h1 className='text-center text-white text-2xl mt-4'>Our Specific Branches services</h1>

            </div>
            <div className="mt-6 flex flex-col items-center justify-center">
                <h2 className="text-4xl font-bold text-white mb-4">Select Branch</h2>
                <div className="flex space-x-4">
                    {branches.map(branch => (
                        <button
                            key={branch.id}
                            className={`bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none ${selectedBranch === branch ? 'bg-blue-500' : ''}`}
                            onClick={() => handleBranchSelect(branch)}
                        >
                            {branch.branch_name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Selected branch display */}
            {selectedBranch && (
                <div className="mt-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Selected Branch:</h3>
                    <div className="bg-gray-800 text-white px-4 py-2 rounded-lg">
                        {selectedBranch.branch_name}
                    </div>
                </div>
            )}
            <div className="grid grid-cols-3 gap-4 m-3 p-4" >


                {services.map(service => (
                    <div key={service.id}>
                        <Card>
                            <img src={service.services_image} alt={service.name} />
                            <h1 className='text-center text-white text-2xl mt-4 font-bold'>{service.services_name}</h1>
                            <h1 className='text-center text-white text-l'>duration: {service.duration} minutes</h1>
                            <h1 className='text-center text-white text-l'>Available At {service.services_time}</h1>
                            <h1 className='text-center text-white text-l mb-4'>Rp.{service.price}</h1>

                            <div className="p-4 flex justify-center" >
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                    onClick={() => openModal(service.id_services, service.services_name)}
                                >
                                    Book now
                                </button>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>


            <Modal isOpen={isModalOpen} onClose={closeModal} id_booking={bookingId} serviceName={services_name}>

            </Modal>
        </div>
    );
};

export default Services;
