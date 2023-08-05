import React from 'react';
import style from './Paginate.module.css'

export default function Paginate({ paginated, allCountries, countriesPerPage, currentPage, prevHandler, nextHandler }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
        pageNumbers.push(i);
    }
    const getDisplayedPageNumbers = () => {
        const lastPage = pageNumbers.length;
        const firstPage = pageNumbers[0]
        const displayRange = 1;
        const firstDisplayed = Math.max(1, currentPage - displayRange);
        const lastDisplayed = Math.min(lastPage, currentPage + displayRange);
        console.log('first display ' + firstDisplayed)
        console.log('last display ' + lastDisplayed )
        console.log('current ' + currentPage)
        let pages = [];
        console.log(pages)
        if (firstDisplayed > firstPage) {
            pages.push(1);
            if (firstDisplayed > 2) {
                pages.push("...");
                if (currentPage === 3 ){
                    pages = pages.filter((c) => c !== "...")}
            }
        }
        for (let i = firstDisplayed; i <= lastDisplayed; i++) {
            pages.push(i);
        }

        if (lastDisplayed < lastPage) {
            if (lastDisplayed < lastPage - 1) {
                pages.push("...");
            }
            pages.push(lastPage);
        }

        return pages;
    }


    return (
        <nav>
            <div className={style.pags}>
                <button disabled={currentPage === 1} className={`${style.pageBtn} ${style.prev}`} onClick={() => prevHandler()}></button>
                <ul className={style.pageList}>
                    {getDisplayedPageNumbers().map((number, index) => (
                        <button
                            className={currentPage === number ? style.match : style.numberPage}
                            key={index}
                            onClick={number === '...'? null : () => paginated(number)}
                            
                        >
                            {number}
                        </button>
                    ))}
                </ul>
                <button disabled={currentPage === pageNumbers[pageNumbers.length - 1]} className={`${style.pageBtn} ${style.next}`} onClick={() => nextHandler()}></button>
            </div>
        </nav>
    );

    
}