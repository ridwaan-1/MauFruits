import './errorDiv.css';

const ErrorDiv = (props) => {
    return (
        <div className='error-displayBox'>
            <p className='center-text'>{props.msg}</p>
        </div>
    );
}

export default ErrorDiv;