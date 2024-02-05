import EmailIcon from '../../assets/Email.svg';
import Input from '../shared/Input';
import CustomButton from '../shared/Button';
import handelEmailInput from './hooks/handleEmailInput';
import handelButtonClick from './hooks/handelButtonClick';
import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { TAppDispatch } from '../../store/app-store';
import { ForgetPasswordThunk } from '../../store/slices/auth/auth-actions';

const ForgotPassword = () => {
    const emailHandeler = handelEmailInput();
    const dispatch = useDispatch<TAppDispatch>();

    const handleForgetPassword = handelButtonClick([emailHandeler], () => {
        dispatch(
            ForgetPasswordThunk({
                email: emailHandeler.email,
            })
        );
    });

    const handleFormSubmitting = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleForgetPassword();
    };

    return (
        <>
            <title>Forgot Password</title>

            <div className="parent-container flex items-center justify-center w-screen h-screen bg-primary">
                <div className="child-element flex items-start flex-col w-[80%] sm:w-[60%] lg:w-[36%] h-[55%] bg-secondary rounded-[10px] px-12 py-8 justify-center">
                    <h1 className="text-white font-bold text-3xl sm:text-4xl selft-start mb-2">
                        Forgot Password?
                    </h1>

                    <form className="w-full flex flex-col self-start px-1" onSubmit={handleFormSubmitting}>
                        {/* Email Input */}
                        <Input
                            type="text"
                            id="email"
                            placeholder="yourname@gmail.com"
                            IconSrc={EmailIcon}
                            IconAlt="Email Icon"
                            className="bg-[#3B2063] text-white "
                            value={emailHandeler.email}
                            inputLabel="Enter your email address"
                            inputError={emailHandeler.emailError}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                emailHandeler.handleEmailChange(e.target.value)
                            }
                        />

                        {/* Reset Password button */}
                        <div className="mt-2">
                            <CustomButton type="submit">
                                <span className="text-white">Reset Password</span>
                            </CustomButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
