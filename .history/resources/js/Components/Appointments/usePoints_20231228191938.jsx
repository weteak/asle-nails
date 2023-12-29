
import { motion } from "framer-motion"
export default function UsePoints({  showModal, setShowModal, handleUsePoints, points, points_value }) {
    return showModal && (<>
        <div   className="fixed  bg-blue-500 backdrop-blur-md bg-opacity-5  h-screen w-full"></div>
            <motion.div initial={{ opacity: 0, y: '4%' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '4%' }}
                transition={{ duration: 0.25, ease: 'easeInOut' }} className="fixed  left-10 right-10 z-50 top-1/4  p-5 border border-slate-500 border-opacity-40  shadow-lg rounded-md bg-white">
                <h1 className='text-center bg-blue-500 bg-opacity-10 py-2 rounded-md'>You have <span className='text-blue-700 font-bold'>{points}</span> points available</h1>
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Use {points_value} Points</h3>
                    <div className="mt-2 px-7 py-3">
                        <p className="text-sm text-gray-500">
                            You have enough points to book this appointment for free. Would you like to use your points?
                        </p>
                    </div>
                    <div className="items-center px-4 py-3">
                        <button id="ok-btn" className="px-4 py-2 bg-indigo-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-900" onClick={() => handleUsePoints()}>
                            Yes, use my points
                        </button>
                        <button id="cancel-btn" className="px-4 py-2 mt-3 underline bg-white text-indigo-500 text-base font-medium rounded-md w-full  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-900" onClick={() => handleUsePoints()}>
                            No, maybe later
                        </button>
                    </div>
                </div>
            </motion.div>
            </>
    )
}