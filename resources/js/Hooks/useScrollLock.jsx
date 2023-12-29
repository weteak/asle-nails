import { useEffect } from "react";

const useScrollLock = (showModal, setShowModal, modalRef) => {
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (showModal && modalRef.current && !modalRef.current.contains(event.target)) {
                setShowModal(false);
            }
        };

        // Lock scroll when modal is open
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Attach event listener
        document.addEventListener('mousedown', handleOutsideClick);

        // Clean up
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.body.style.overflow = 'unset'; // Ensure scroll is enabled when unmounting
        };
    }, [showModal, modalRef, setShowModal]);
};

export default useScrollLock;
