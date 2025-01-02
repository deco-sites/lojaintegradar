function CloseButtonModal() {
    const handleClose = () => {
        const modalIds = ["talkModal", "SecondTimeModal", "TimeModal"];
        modalIds.forEach((modalId) => {
            const modalElement = document.getElementById(modalId);
            if (modalElement) {
                modalElement.classList.add("hidden");
                modalElement.classList.remove("flex");
            }
        });
    };

    return (
        <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-black"
        >
            X
        </button>
    );
}

export default CloseButtonModal;
