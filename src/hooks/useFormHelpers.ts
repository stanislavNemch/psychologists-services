import toast from "react-hot-toast";

interface UseFormHelpersProps {
    onClose: () => void;
    reset?: () => void;
}

export const useFormHelpers = ({ onClose, reset }: UseFormHelpersProps) => {
    const handleSuccess = (message: string) => {
        toast.success(message);
        if (reset) {
            reset();
        }
        onClose();
    };

    const handleError = (
        error: any,
        defaultMessage: string = "An error occurred",
    ) => {
        console.error(error);
        const message = error.message || defaultMessage;
        toast.error(message);
        return message;
    };

    return { handleSuccess, handleError };
};
