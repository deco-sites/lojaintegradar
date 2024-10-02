function CloseButtonModal() {
    const handleClose = () => {
        const getModal = document.getElementById("talkModal");
        if (getModal) {
            getModal.classList.add("hidden");
            getModal.classList.remove("flex");
        }
    }

    return (
        <button
            onClick={handleClose}
            class="absolute top-2 right-2 text-black"
        >
            X
        </button>
    )
}

export default CloseButtonModal