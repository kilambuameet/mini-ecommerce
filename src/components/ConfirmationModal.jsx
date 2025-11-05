const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blur bg-opacity-60 flex items-center justify-center z-50">
      <div className=" p-6 rounded-lg shadow-2xl bg-gray-100 w-100">
        <p className="mb-4 text-gray-700 font-medium">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
