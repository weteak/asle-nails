import { useEffect } from "react";

const useScrollLock = (showModal, setShowModal) => {

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        const handleOutsideClick = (event) => {
            if (showModal && !event.target.closest('.modal-content')) {
                setShowModal(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [showModal]);
};

export default useScrollLock;
