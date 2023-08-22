/* eslint-disable react/prop-types */
import style from './Paginate.module.css'


//paginated es un booleano que indica si la lista esta paginada o no
//allCountries es el numero total de paises que hay en la lista
//countriesPerPage es el numero de paises que hay por pagina
//currentPage es el numero de la pagina actual
//prevHandler y nextHandler son funciones que que se ejecutan cuando se hace click en los botones de anterior y siguiente.

//creamos un array vacio que va a contener los numeros de las paginas que se pueden mostrar
//hacemos un for que arranca desde 1 (primer pagina) hasta el numero maximo de paginas que se puedan tener
//el numero maximo lo calculamos dividiendo el total de paises / la cantidad de paises que queremos mostrar por pagina y lo redondeamos.
//es decir, por ejemplo: si tenemos 250 paises y queremos mostrar 10 por página, vamos a tener 25 páginas.
//agregamos el numero de pagina en el que nos situamos, la ultima posicion de i en el ejemplo va a ser 25.


const Paginate = ({ paginated, allCountries, countriesPerPage, currentPage, prevHandler, nextHandler }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
        pageNumbers.push(i);
    }

//la funcion getPageNumbers devuelve un array con los numeros de las paginas que vamos a renderizar
//lastPage es la ultima pagina
//firstPage es la primer pagina
//range muestra cuanto numeros se van a mostrar antes y despues del actual, si la pagina actual es 4, se mostraria 3 y 5.
//firstRender guarda el primer numero que se renderiza, se calcula calculando el max entre 1 y la diferencia entre la pagina actual - el rango de renderización.
// de esa forma se evita que se muestre 0 o negativos.
// lastRender guarda el ultimo numero en renderizar, usa el minimo entre la ultima pagina y la suma de la actual con el rango.
// de esa forma se evita mostrar numeros mayores al ultimo.
//creamos pages, que es un array donde vamos a contener los valores resultantes del if.
//si el numero que renderizamos primero es mayor a la primer pagina, tenemos que mostrar 1, y siempre mostramos ese 1 para poder ir siempre a la 1er pagina.
//si el primero que renderizamos es mayor que 2, significa que hay mas de un numero entre el 1 y el primero que se renderiza, son numeros que no se muestran.


    const getPageNumbers = () => {
        const lastPage = pageNumbers.length;
        const firstPage = pageNumbers[0]
        const range = 1;
        const firstRender = Math.max(1, currentPage - range);
        const lastRender = Math.min(lastPage, currentPage + range);
        let pages = [];
        if (firstRender > firstPage) {
            pages.push(1);
            if (firstRender > 2) {
                pages.push("...");
            }
        }

        //hacemos un bucle for desde la primer pagina que renderizamos hasta la ultima
        //donde vamos a mostrar los numeros en la interfaz alrededor de la pagina actual.
        for (let i = firstRender; i <= lastRender; i++) {
            pages.push(i);
        }
        //comprobamos si la ultima pagina que mostramos es menor que la pagina final, significa que hay numeros que no se muestran
        //ejemplo: si tenemos 16 y 25, hay 8 numeros que no se van a mostrar (17 al 24). el 25 siempre se muestra, como el primero.
        if (lastRender < lastPage) {
            if (lastRender < lastPage - 1) {
                pages.push("...");
            }
            pages.push(lastPage);
        }
        return pages;
    }

    return (
        <nav className={style.pagsNav}>
            <div className={style.pages}>
                <button className={`${style.pageBtn} ${style.prev}`} onClick={() => prevHandler()}></button>
                <ul className={style.pageList}>
                    {getPageNumbers().map((number, index) => (
                        <button
                            className={currentPage === number ? style.match : style.numberPage}
                            key={index}
                            onClick={number === '...'? null : () => paginated(number)}
                        >
                            {number}
                        </button>
                    ))}
                </ul>
                <button className={`${style.pageBtn} ${style.next}`} onClick={() => nextHandler()}></button>
            </div>
        </nav>
    );
}

export default Paginate