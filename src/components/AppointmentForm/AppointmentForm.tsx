import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiClock } from "react-icons/fi";
import clsx from "clsx";
import styles from "./AppointmentForm.module.css";
import type { Psychologist } from "../../types/psychologist";
import { useFormHelpers } from "../../hooks/useFormHelpers";

interface AppointmentFormProps {
    psychologist: Psychologist;
    onClose: () => void;
}

const schema = yup
    .object({
        name: yup
            .string()
            .required("Name is required")
            .min(2, "Name must be at least 2 characters"),
        phone: yup
            .string()
            .required("Phone number is required")
            .matches(
                /^\+380\d{9}$/,
                "Phone number must match format +380xxxxxxxxx",
            ),
        email: yup
            .string()
            .required("Email is required")
            .email("Invalid email format"),
        comment: yup.string().required("Comment is required"),
        time: yup.string().required("Please select a time"),
    })
    .required();

type FormData = yup.InferType<typeof schema>;

// Generate time slots (e.g., 09:00 to 18:00 every 30 mins)
const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
];

const AppointmentForm: React.FC<AppointmentFormProps> = ({
    psychologist,
    onClose,
}) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const { handleSuccess } = useFormHelpers({ onClose, reset });

    const [isTimeOpen, setIsTimeOpen] = useState(false);
    const timeWrapperRef = useRef<HTMLDivElement>(null);
    const selectedTime = watch("time");

    // Click outside to close custom dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                timeWrapperRef.current &&
                !timeWrapperRef.current.contains(event.target as Node)
            ) {
                setIsTimeOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleTimeSelect = (time: string) => {
        setValue("time", time, { shouldValidate: true });
        setIsTimeOpen(false);
    };

    const onSubmit = () => {
        handleSuccess("Appointment request sent successfully!");
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                Make an appointment with a psychologist
            </h2>
            <p className={styles.description}>
                You are on the verge of changing your life for the better. Fill
                out the short form below to book your personal appointment with
                a professional psychologist. We guarantee confidentiality and
                respect for your privacy.
            </p>

            <div className={styles.psychologistInfo}>
                <img
                    src={psychologist.avatar_url}
                    alt={psychologist.name}
                    className={styles.avatar}
                />
                <div className={styles.psychologistText}>
                    <span className={styles.label}>Your psychologist</span>
                    <span className={styles.name}>{psychologist.name}</span>
                </div>
            </div>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        placeholder="Name"
                        className={styles.input}
                        {...register("name")}
                    />
                    {errors.name && (
                        <p className={styles.errorText}>
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div className={styles.inputsRow}>
                    <div className={styles.inputWrapper}>
                        <input
                            type="tel"
                            placeholder="+380998887766"
                            className={styles.input}
                            {...register("phone")}
                        />
                        {errors.phone && (
                            <p className={styles.errorText}>
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    <div
                        className={styles.timeWrapper}
                        ref={timeWrapperRef}
                        onClick={() => setIsTimeOpen(!isTimeOpen)}
                    >
                        <div
                            className={clsx(styles.timeInput, {
                                [styles.timeInputActive]: isTimeOpen,
                            })}
                        >
                            <span
                                className={clsx(styles.timeValue, {
                                    [styles.placeholder]: !selectedTime,
                                })}
                            >
                                {selectedTime || "00:00"}
                            </span>
                            <FiClock size={20} className={styles.clockIcon} />
                        </div>

                        {isTimeOpen && (
                            <div className={styles.timeDropdown}>
                                <div className={styles.timeDropdownHeader}>
                                    Meeting time
                                </div>
                                <div className={styles.timeList}>
                                    {timeSlots.map((time) => (
                                        <div
                                            key={time}
                                            className={clsx(styles.timeOption, {
                                                [styles.timeOptionSelected]:
                                                    time === selectedTime,
                                            })}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleTimeSelect(time);
                                            }}
                                        >
                                            {
                                                // Format time with spaces like mockup "09 : 00"
                                                time.replace(":", " : ")
                                            }
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <input type="hidden" {...register("time")} />
                        {errors.time && (
                            <p className={styles.errorText}>
                                {errors.time.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className={styles.inputWrapper}>
                    <input
                        type="email"
                        placeholder="Email"
                        className={styles.input}
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className={styles.errorText}>
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className={styles.inputWrapper}>
                    <textarea
                        placeholder="Comment"
                        className={styles.textarea}
                        {...register("comment")}
                    />
                    {errors.comment && (
                        <p className={styles.errorText}>
                            {errors.comment.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default AppointmentForm;
