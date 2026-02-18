import { useState, useRef, useEffect } from "react";
import styles from "./Filters.module.css";
import clsx from "clsx";
import { FaChevronDown } from "react-icons/fa";

interface FiltersProps {
    onFilterChange: (filter: string) => void;
}

const options = [
    "A to Z",
    "Z to A",
    "Less than 10$",
    "Greater than 10$",
    "Popular",
    "Not popular",
    "Show all",
];

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Show all");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSelect = (option: string) => {
        setSelected(option);
        onFilterChange(option);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.filtersContainer}>
            <label className={styles.label}>Filters</label>
            <div className={styles.selectWrapper} ref={dropdownRef}>
                <button
                    className={styles.triggerButton}
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    aria-expanded={isOpen}
                >
                    {selected}
                    <FaChevronDown
                        className={clsx(styles.chevron, {
                            [styles.chevronOpen]: isOpen,
                        })}
                        size={14}
                    />
                </button>
                {isOpen && (
                    <div className={styles.dropdownMenu}>
                        {options.map((option) => (
                            <div
                                key={option}
                                className={clsx(styles.option, {
                                    [styles.selectedOption]:
                                        selected === option,
                                })}
                                onClick={() => handleSelect(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Filters;
