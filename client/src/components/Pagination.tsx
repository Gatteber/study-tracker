interface props {
  cardsPerPage: number;
  totalCards: number;
  paginate: (number: number) => void;
  currentPage: number;
}
const Pagination = ({
  cardsPerPage,
  totalCards,
  paginate,
  currentPage,
}: props) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='paginate-menu'>
        {pageNumbers.map(number => (
          <li key={number} onClick={() => paginate(number)}>
            <button
              className={
                number === currentPage
                  ? 'paginate-button active'
                  : 'paginate-button'
              }
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Pagination;
