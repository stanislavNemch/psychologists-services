import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, database } from "../../firebase/firebase";
import { DB_ROOT } from "../../firebase/constants";
import { ref, set } from "firebase/database";
import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from "../shared/Form.module.css";
import { useFormHelpers } from "../../hooks/useFormHelpers";

const schema = yup
    .object({
        name: yup
            .string()
            .required("Name is required")
            .min(2, "Name must be at least 2 characters"),
        email: yup
            .string()
            .required("Email is required")
            .email("Invalid email format"),
        password: yup
            .string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .matches(/[a-zA-Z]/, "Password must contain latin letters")
            .matches(/[0-9]/, "Password must contain numbers"),
        // .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain special characters")
    })
    .required();

type FormData = yup.InferType<typeof schema>;

interface RegistrationFormProps {
    onClose: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onClose }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const { handleSuccess, handleError } = useFormHelpers({ onClose });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setServerError(null);
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password,
            );
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: data.name,
            });

            // Save user to Realtime Database
            await set(
                ref(database, `${DB_ROOT}/psychologists/users/${user.uid}`),
                {
                    username: data.name,
                    email: data.email,
                },
            );

            handleSuccess("Registration successful!");
        } catch (error: any) {
            if (error.code === "auth/email-already-in-use") {
                const msg = "Email is already in use.";
                setServerError(msg);
                handleError(error, msg);
            } else {
                const msg = handleError(error, "Failed to register.");
                setServerError(msg);
            }
        }
    };

    return (
        <form
            className={styles.formContainer}
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className={styles.title}>Registration</h2>
            <p className={styles.description}>
                Thank you for your interest in our platform! In order to
                register, we need some information. Please provide us with the
                following information.
            </p>

            <div className={styles.inputGroup}>
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
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className={styles.input}
                        {...register("password")}
                    />
                    <button
                        type="button"
                        className={styles.passwordToggle}
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? (
                            <FiEyeOff size={20} />
                        ) : (
                            <FiEye size={20} />
                        )}
                    </button>
                    {errors.password && (
                        <p className={styles.errorText}>
                            {errors.password.message}
                        </p>
                    )}
                </div>
            </div>

            {serverError && <p className={styles.errorText}>{serverError}</p>}

            <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
            >
                {isSubmitting ? "Registering..." : "Sign Up"}
            </button>
        </form>
    );
};

export default RegistrationForm;
