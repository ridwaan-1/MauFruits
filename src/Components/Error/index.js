import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../Button";
import './error.css';

const Error = ({ error }) => {
    return (  
        <div className='error-container'>
            <div className="icon">
                <FaExclamationTriangle className="w-100 h-100"/>
            </div>
            <div className="center-text">
                <p className="error-code bold-text m-top-20">Error {error.statusCode}</p>
                <p className="error-message m-top-10">{error.message}<br />Please try again later</p>
            </div>
            <Link to='/'>
                <Button className="m-top-20" light={true}>Dismiss</Button>
            </Link>
        </div>
    );
}
 
export default Error;