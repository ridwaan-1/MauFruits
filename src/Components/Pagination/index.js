import './pagination.css';

const PaginationItem = ({number, activePage, onClick}) => (
    <li onClick={onClick} value={number} className={`pagination-item${activePage ? ' active-pagination' : ''}`}>
        {number}
    </li>
)

const Pagination = ({ onClick, totalProducts, currentActive, productLimit }) => {
    let s = [];
    const totalPage = Math.ceil((totalProducts/productLimit));
    for(let i=1; i<=totalPage; i++){
        s.push(i);
    }

    return ( 
        <ul className="pagination-container">
            {s.map((number, index) =>  
                <PaginationItem 
                    key={index} 
                    number={number} 
                    activePage={number===currentActive} 
                    onClick={onClick} 
                />
            )}
        </ul>
    );
}
 
export default Pagination;