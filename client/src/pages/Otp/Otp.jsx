import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import firebase from './firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons'


import './Otp.css'

const Otp = () => {
    const [mobile, setMobile] = useState('')
    const [otp, setOtp] = useState('')
    const [otpSent, setOtpSent] = useState(false)

    const navigate = useNavigate()


    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'mobile') {
            setMobile(value)
        } else if (name === 'otp') {
            setOtp(value)
        }
    }

    const configureCaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                onSignInSubmit();
                console.log("recaptcha Verified");
            },
            defaultCountry: "IN"
        });
    }

    const onSignInSubmit = (e) => {
        e.preventDefault()

        configureCaptcha()
        const phoneNumber = "+91" + mobile;
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                console.log("OTP has been snt");
                setOtpSent(true);
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                // ...
                console.log("SMS not sent");
            });
    }

    const onSubmitOTP = (e) => {
        e.preventDefault()

        const code = otp
        window.confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log(JSON.stringify(user));
            alert("User is verified")
            navigate('/');
            // ...
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
        });
    }

    return (
        <div className='otp-main-container'>
            {!otpSent ? ( // render sign-in form if OTP not sent
                <form onSubmit={onSignInSubmit}>

                    <div className="fa-phone"><p><FontAwesomeIcon icon={faPhone} /></p></div>
                    <h4>Verify your phone number</h4>
                    <div id="sign-in-button"></div>
                    <input type="number" name="mobile" placeholder="Mobile number" required onChange={handleChange} />
                    <button className='btn-no-otp' type="submit">Submit</button>

                </form>
            ) : ( // render OTP form if OTP sent
                <form onSubmit={onSubmitOTP}>
                    <div className="fa-phone"><p><FontAwesomeIcon icon={faUnlockKeyhole} /></p></div>
                    <h4>Enter OTP</h4>
                    <input type="number" name="otp" placeholder="OTP Number" required onChange={handleChange} />
                    <button className='btn-no-otp' type="submit">Submit</button>

                </form>
            )}
        </div>
    )
}

export default Otp
