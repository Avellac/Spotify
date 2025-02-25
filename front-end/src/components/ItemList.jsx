import React from 'react'
import SingleItem from './SingleItem';
import { Link, useLocation } from 'react-router-dom';

const ItemList = ({ title, itens, itemsArray, path, idPath }) => {
    //const pathname = useLocation().pathname;     // mesma forma da instrução debaixo 
    const { pathname } = useLocation();
    const isHome = pathname === "/";
    const finalItems = isHome ? itens : Infinity;

    return (
        <div className='item-list'>
            <div className='item-list__header'>
                <h2>{title} populares</h2>
                {isHome ?
                <Link className="item-list__link" to={path}>
                    Mostrar tudo
                </Link> 
                : <></>}
            </div>   

            <div className='item-list__container'>
                {itemsArray.filter((currentValue, index) => index < finalItems).map((currObj, index) =>
                    <SingleItem
                        idPath={idPath}
                        {...currObj}
                        key={`${title}-${index}`}
                    />
                )}
            </div>

            { (title === 'Artistas') ? <div className='item-list__gap'/> : <></> }
        </div>
    );
}

export default ItemList