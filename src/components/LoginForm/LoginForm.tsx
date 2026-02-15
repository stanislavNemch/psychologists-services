import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from "../shared/Form.module.css";

const schema = yup
    .object({
        email: yup
            .string()
            .required("Email is required")
            .email("Invalid email format"),
        password: yup.string().required("Password is required"),
    })
    .required();

type FormData = yup.InferType<typeof schema>;

interface LoginFormProps {
    onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

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
            await signInWithEmailAndPassword(auth, data.email, data.password);
            onClose(); // Close modal on success
        } catch (error: any) {
            console.error("Login error:", error);
            setServerError("Invalid email or password.");
        }
    };

    return (
        <form
            className={styles.formContainer}
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className={styles.title}>Log In</h2>
            <p className={styles.description}>
                Welcome back! Please enter your credentials to access your
                account and continue your search for a psychologist.
            </p>

            <div className={styles.inputGroup}>
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
                {isSubmitting ? "Logging in..." : "Log In"}
            </button>
        </form>
    );
};

export default LoginForm;
