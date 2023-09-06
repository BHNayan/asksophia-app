import React, { useState } from 'react'
import SignUpStepOne from './SignUpStepOne';
import SignUp from './SignUp';

const Stepper = () => {
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        username: '', email: '',
        password: '', cpassword: '',
      });

  // setForm data values
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

      switch(step){
        case 1:
            return <SignUpStepOne handleChange={handleChange} formData={formData} step={step} setStep={setStep} />
        case 2: 
           return <SignUp handleChange={handleChange} formData={formData} setFormData={setFormData} />
        default:
            return <SignUpStepOne />
             
      }
       
}

export default Stepper