import InputField from "../../Components/InputField";
import TextareaField from "../../Components/TextareaField";
import Button from "../../Components/Button";
import { GrMail } from "react-icons/gr";
import { BsFillTelephoneFill } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";
import './contact.css';
import useRequest from "../../hooks/useRequest";
import Loader from "../../Components/Loader";
import { useState } from "react";
import { useSelector } from "react-redux";
import { serverUrl } from "../../Constants/serverUrl";

const Contact = () => {
    const user = useSelector(state => state.user);
    const { loading, fetchData } = useRequest();
    const [success, setSuccess] = useState({})

    const [formData, setFormData] = useState({
        fname: '',
        othername: '',
        email: user.registered ? user.auth.email : '',
        subject: '',
        message: ''
    });

    const contactFormHandler = e => {
        e.preventDefault();
        fetchData({
            url: `${serverUrl}/contact/sendmail`,
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: formData
        }, (response) => {
            setSuccess(response);
        })
    };

    const contactInputHandler = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return ( 
        <main>
            <div className='color-w center-text m-top-30'>
                <h1>Get in touch</h1>
                <p className='m-top-10'>If you have any questions or remarks, just write us a message.</p>
            </div>
            <div className='contactUs-container flex'>
                <div className='contact-info'>
                    <h2>Contact Information</h2>
                    <p className='m-top-10'>Fill up the form and we will get back to you as soon as possible</p>

                    <div className='contact-details'>
                        <div className='each-contact-detail flex center-v m-top-30'>
                            <BsFillTelephoneFill className='contactIcon'/> 
                            <div>
                                <p>+2305938349</p>
                                <p>+2309839982</p>
                            </div>
                        </div>
                        <div className='each-contact-detail flex center-v m-top-20'>
                            <GrMail className='contactIcon' /> 
                            <p>maufruits@gmail.com</p>
                        </div>
                        <div className='each-contact-detail flex center-v m-top-20'>
                            <ImLocation2 className='contactIcon' /> 
                            <p>maufruits@gmail.com</p>
                        </div>
                    </div>
                </div>
                
                <form onSubmit={contactFormHandler} className='contactUs-form'>
                    {loading && <Loader />}
                    <h2>Send us a message</h2>
                    {success && <h3 className="green-text m-top-10">{success.message}</h3>}
                    <div className='name-field flex'>
                        <InputField value={formData.fname} onChange={contactInputHandler} name='fname' placeholder={'First Name'} />
                        <InputField value={formData.othername} onChange={contactInputHandler} name='othername' placeholder={'Other Names'} />
                    </div>
                    <InputField value={formData.email} onChange={contactInputHandler} name='email' placeholder={'Your email'} type={'email'} />
                    <InputField value={formData.subject} onChange={contactInputHandler} name='subject' placeholder={'Subject'} />
                    <TextareaField value={formData.message} onChange={contactInputHandler} name='message' placeholder={'Your message'} />
                    <Button type='submit'>Send message</Button>
                </form>
            </div>
        </main>
    );
}
 
export default Contact;