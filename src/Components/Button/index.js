import './button.css';

const Button = (props) => {
    const { onClick, className='', width, light, type='button', disabled=false } = props;
    return (
        <button disabled={disabled} onClick={onClick} type={type} className={`${className} ${width ? 'w-100' : ''} btn${light ? '-light' : ''}`}>
            {props.children}
        </button>
    );
}
 
export default Button;