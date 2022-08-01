import React, {useState, useEffect} from 'react';
import { Button, Form, Grid, Loader} from "semantic-ui-react";
import {storage, db} from "../firebase";
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import {ref} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import {async}  from '@firebase/util';



const initialState={
    name:"",
    email_address:"",
    graduation_year:"",
    cohort:"",
    personal_info:"",
    country_of_origin:""
};

const AddAlumni = () => {

    
    const[data, setData]=useState(initialState);
    const {name,email_address,graduation_year, cohort, personal_info, country_of_origin} = data;
    const[file,setFile]=useState(null);
    const[progress, setProgress]=useState(null);
    const[errors, setErrors]=useState({});
    const[isSubmit, setIsSubmit]=useState(false);
    const navigate = useNavigate();

    //posting of data into firebase

    useEffect(()=>{
        const uploadFile=()=>{
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, file.name); //was ref and changed to Ref
            const uploadTask = uploadBytesResumable(storageRef,file);

            uploadTask.on("state_changed", (snapshot)=>{
                const progress=(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
                switch(snapshot.state){
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        break;
                }
            },
            (error)=>{
                console.log(error);
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((DownloadURL)=>{
                    setData((previous)=>({...previous, img: DownloadURL }));
                });
            }
            );
        };
        file && uploadFile();
    },[file]);


    const handleChange=(e)=>{
        setData({...data, [e.target.name]: e.target.value});
    };

    
    const validate=()=>{
        let errors={};
        if(!name){
            errors.name="Name is Reuired.";
        }
    
   
        
        if(!email_address){
            errors.email_address="Email Address is Reuired.";
        }

    
        
        if(!graduation_year){
            errors.graduation_year="Year of garduation Reuired.";
        }
 
        
        if(!cohort){
            errors.cohort="your cohort is Reuired.";
        }
   
      
        if(!personal_info){
            errors.name="Your Personal information is Reuired.";
        }
    
        if(!country_of_origin){
            errors.country_of_origin="your country of origin is Required.";
        }
        return errors;
    };

    //submission of data into firebasedatabase
        const handleSubmit=async(e)=>{
            e.preventDefault();
            let errors= validate();
            if(Object.keys(errors).length) return setErrors(errors);
            setIsSubmit(true);
            await addDoc(collection(db, "users"),{
                ...data,
                timestamp:serverTimestamp(),
            });
            navigate("/");
        };
        
    return(
    <div>
        <Grid centered verticalAlign="middle" columns="3" style={{height:"80vh"}}>
            <Grid.Row>
                <Grid.Column textAlign="center">
                    <div>
                        {isSubmit ? <Loader active inline="centered" size="huge"/>:(
                            <>
                            <h2>Add Alumni</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Input 
                                label="Name" 
                                error={errors.name ? {content: errors.name} :null}
                                placeholder="Enter Name" 
                                name="name" 
                                onChange={handleChange}
                                value={name}
                                //autoFocus
                                /> 
                                 <Form.Input 
                                label="Email-Adress" 
                                error={errors.email_address ? {content: errors.email_address} :null}
                                placeholder="Enter Email Adress" 
                                name="email_address" 
                                onChange={handleChange}
                                value={email_address}
                                //autoFocus
                                /> 
                                 <Form.Input 
                                label="Graduation year" 
                                error={errors.graduation_year ? {content: errors.graduation_year} :null}
                                placeholder="Enter Year Of Graduation" 
                                name="graduation_year" 
                                onChange={handleChange}
                                value={graduation_year}
                                //autoFocus
                                /> 
                                 <Form.Input 
                                label="Chort" 
                                error={errors.cohort ? {content: errors.cohort} :null}
                                placeholder="Enter Your Cohort" 
                                name="cohort" 
                                onChange={handleChange}
                                value={cohort}
                                //autoFocus
                                /> 
                                 <Form.TextArea 
                                label="Personal Information"
                                error={errors.personal_info ? {content: errors.personal_info} :null} 
                                placeholder="Enter Your Personal Information" 
                                name="personal_info" 
                                onChange={handleChange}
                                value={personal_info}
                                //autoFocus
                                /> 
                                 <Form.Input 
                                label="County Of Origin" 
                                error={errors.country_of_origin ? {content: errors.country_of_origin} :null}
                                placeholder="Enter Your Country Of Origin" 
                                name="country_of_origin" 
                                onChange={handleChange}
                                value={country_of_origin}
                                //autoFocus
                                /> 
                                <Form.Input 
                                label="Upload" 
                                placeholder="Enter Your Country Of Origin" 
                                type="file" 
                                onChange={(e)=>setFile(e.target.files[0])}
                                
                                /> 
                                <Button 
                                primary 
                                type="submit"
                                disabled={progress !== null && progress < 100}>
                                    Submit
                                </Button>
                            </Form>
                            </>
                        )}
                    </div>
                </Grid.Column>
            </Grid.Row>

        </Grid>       
    </div>
    )

}
export default AddAlumni;
