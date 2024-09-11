import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure CSS import

export const ToastMessage = (status, msg) => {
	const options = {
		position: "top-right",
		autoClose: 3000, // 3 seconds
		hideProgressBar: false,
		closeButton: true,
		draggable: true,
		pauseOnHover: true,
	};
	// Customize the toast based on status
	if (status == 200) {
		toast.success(msg, options); // Success messages
	} else {
		toast.error(msg, options); // Informational messages for other statuses
	}
};

export default ToastMessage;
