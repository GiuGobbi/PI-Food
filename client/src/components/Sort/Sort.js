import { useDispatch } from "react-redux"
import {sortByName, sortByHealthScore} from "../../redux/actions"
import styles from "./sort.module.css"

export default function SortRecipes({setCurrentPage}) {

    const dispatch = useDispatch();

    const handleAtoZ = (e) => {
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setCurrentPage(1);
    }

    const handleHS = (e) => {
        e.preventDefault();
        dispatch(sortByHealthScore(e.target.value));
        setCurrentPage(1);
    }

    return (
        <div>
            <div>
            <select className={styles.select} onChange={handleAtoZ}>
                <option value="all">--Sort alphabetically--</option>
                <option value="order A to Z">order A to Z</option>
                <option value="order Z to A">order Z to A</option>
            </select>
            </div>
            <div>
            <select className={styles.select} onChange={handleHS}>
                <option value="all">--Sort by Health Score--</option>
                <option value="lowerHealthScore">order by lower health score</option>
                <option value="higherHealthScore">order by higher health score</option>
            </select>
            </div>
        </div>
    )
}