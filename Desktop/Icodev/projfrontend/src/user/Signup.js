import React,{useState} from "react";
import { signup } from "../auth/helper";
import Base from "../core/Base";
import { addItenCart } from "../core/helper/CartHelpers";
const Signup=()=>{
const [values,setvalues]=useState({
    name:"",
    email:"",
    password:"",
    error:"",
    success:false
});

const {name,email,password,error,success}=values;

const handleChange=(name)=>
        (event)=>{
            setvalues({...values,error:false,[name]:event.target.value});
        };

const onSubmit=(event)=>{
    event.preventDefault();
    setvalues({...values,error:false})
    signup({name,email,password})
    .then((data)=>{
        console.log("Dagftsgt",data);
        if(data.email===email){
            setvalues({
                ...values,
                name:"",
                email:"",
                password:"",
                error:"",
                success:true
            })
        }else{
            setvalues({
                ...values,
                error:true,
                success:false
            })
        }
    })
    .catch((e)=>console.log(e))

}

const successMessage=()=>{
    return(
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-success"
                     style={{display:success ? "":"none"}}>
                    New Account created succesfully.Please Login
                </div>
            </div>
        </div>
    )
}
const errorMessage=()=>{
    return(
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-danger"
                     style={{display:error ? "":"none"}}>
                    Check the fields properly.
                </div>
            </div>
        </div>
    )
}

const signUpForm=()=>{
    return(
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <form>
                    <div className="form-group">
                        <label className="text-light">Name</label>
                        <input 
                        className="form-control"
                        value={name}
                        onChange={handleChange("name")}
                        type="text"
                    />
                    </div>
                    <div className="form-group">
                        <label className="text-light">Email</label>
                        <input 
                        className="form-control"
                        value={email}
                        onChange={handleChange("email")}
                        type="text"
                    />
                    </div>
                    <div className="form-group">
                        <label className="text-light">Password</label>
                        <input 
                        className="form-control"
                        value={password}
                        onChange={handleChange("password")}
                        type="password"
                    />
                    </div>
                    <button className="btn btn-success btn-block" onClick={onSubmit}>Submit</button>
                </form>
            </div>
        </div>
    )
}


        return (
            <Base title="Signup page" description="Sign up for ecart">
                {successMessage()}
                {errorMessage()}
                {signUpForm()}
        <p className="text-white text-center">{JSON.stringify(values)}</p>
            </Base>
        )
}


export default Signup