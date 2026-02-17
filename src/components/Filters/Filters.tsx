import styles from "./Filters.module.css";

interface FiltersProps {
    onFilterChange: (filter: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
    return (
        <div className={styles.filtersContainer}>
            <label className={styles.label}>Filters</label>
            <div className={styles.selectWrapper}>
                <select
                    className={styles.select}
                    defaultValue="Show all"
                    onChange={(e) => onFilterChange(e.target.value)}
                >
                    <option value="A to Z">A to Z</option>
                    <option value="Z to A">Z to A</option>
                    <option value="Less than 10$">Less than 10$</option>
                    <option value="Greater than 10$">Greater than 10$</option>
                    <option value="Popular">Popular</option>
                    <option value="Not popular">Not popular</option>
                    <option value="Show all">Show all</option>
                </select>
            </div>
        </div>
    );
};

export default Filters;
