
//Using arrow functions to make code more concise
const Button = ({ value, id, btnDisabbled, handleClick}) => {
  return (
    <button className="btn-item" id={id} disabled={btnDisabbled} onClick={handleClick}>
      {value}
    </button>
  );
};

export default Button;
