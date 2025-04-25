const SortByPrice = ({ onSort }) => {
    return (
      <div className="sort-by-price">
        <select onChange={(e) => onSort(e.target.value)}>
          <option value="">Sort by</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>
    );
  };
  
  export default SortByPrice;