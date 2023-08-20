import "./category-item.styles.scss";

// the functional component
const CategoryItem = ({ category }) => {
  // destructure to get the elements we need from the prop
  const { imageUrl, title } = category;
  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now Here</p>
      </div>
    </div>
  );
};
export default CategoryItem;
