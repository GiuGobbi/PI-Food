import styles from "./error.module.css";

export default function Error({error}) {

    function handleBack(e) {
        e.preventDefault();
        window.location.reload(false)
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.errorh1}>404 - Recipe not found</h1>
            <button className={styles.back} onClick={handleBack}>Go back</button>
        </div>
    );
};