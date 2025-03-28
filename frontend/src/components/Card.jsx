const Card = ({ children, className }) => {
    return (
      <div className={`bg-white shadow-md rounded-lg p-4 border ${className}`}>
        {children}
      </div>
    );
  };
  
  export default Card;
  