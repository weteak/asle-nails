import React from 'react';

const AsleCardSubscribePrompt = () => {
    return (
        <div className="flex items-center justify-center p-6 m-4 rounded-lg shadow-lg bg-white border border-gray-200">
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get the Most with Asle Card</h2>
                <p className="text-gray-600 mb-6">Unlock exclusive features and rewards by subscribing to the Asle Card. Join now to enhance your experience!</p>
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                    Subscribe Now
                </button>
            </div>
        </div>
    );
};

export default AsleCardSubscribePrompt;
