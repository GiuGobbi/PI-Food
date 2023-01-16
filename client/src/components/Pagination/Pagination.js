import styles from "./pagination.module.css"

export default function Pagination({recipes, reciperPerPage, paginate}) {

    const pages = [];
    for (let i = 1; i <= Math.ceil(recipes/reciperPerPage); i++) {
        pages.push(i);
    }
    return (
        <nav>
            <ul className={styles.list}>
            {pages?.map((page) => { 
                return (
                 <li className={styles.listItems} key={page}>
                 <a className={styles.listA} onClick={() => {paginate(page)}} href="#!">
                 {page}
                 </a>
                </li>
                )
            })}
            </ul>
        </nav>
    )
}