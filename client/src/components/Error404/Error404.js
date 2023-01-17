import styles from "./error.module.css";


export default function Error() {
    return (
        <div className={styles.container}>
            <h1 className={styles.errorh1}>Recipe not found! Try again</h1>
        </div>
    )
}