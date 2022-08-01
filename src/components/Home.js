import React, {useState, useEffect} from 'react'
import {db} from "../firebase";
import {Card,Grid,Container,Image} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";
import {collection, onSnapshot} from "firebase/firestore";


const Home=()=>{
  const[users, setUsers]=useState([]);
    const[loading, setLoading]=useState(false);
    const navigate=useNavigate();

    //fetching of the data from the firebase 
    useEffect(()=>{
      setLoading(true);
      const unsubscribe=onSnapshot(
        collection(db, "users"),
        (snapshot)=>{
          let dataList =[];
          snapshot.docs.forEach((doc)=>{
            dataList.push({id: doc.id, ...doc.data()});
          });
          setUsers(dataList);
          setLoading(false);
        },
        (error)=>{
          console.log(error)
        }
      );
      return()=>{
        unsubscribe();
      }
    },[]);

   //const AlumniHandler=(e)=>{
    //console.log(e);
    //setUsers(e);
   //}

  return (
       
       <Container>
        <h3>List of Moringa Alumni:</h3>
       <hr/>
        <Card.Group>
          <Grid columns={3} stackable>
            {users && users.map((details)=>{
              return(
                
              <Grid.Column>
                <Card key={details.id}>
                  <Card.Content>
                    <Image 
                      src={details.img}
                      size="medium"
                      style={{
                        height:"150x",
                        width:"400px",
                        borderRadius:"50%",
                      }}
                    />
                    <Card.Header style={{marginTop:"10px"}}>{details.name}</Card.Header>
                    <Card.Description>Personal Info:{details.personal_info}</Card.Description>
                    <Card.Description>Email:{details.email_address}</Card.Description>
                    <Card.Description>Country:{details.country_of_origin}</Card.Description>
                    <Card.Description>Grad Yr:{details.graduation_year}</Card.Description>
                    <Card.Description>Cohort:{details.cohort}</Card.Description>

                  </Card.Content>

                </Card>
                
              </Grid.Column>
              
              )
            })}
          </Grid>
        </Card.Group>
       </Container>
  )
}

export default Home;

{/**<Dropdown/>
          placeholder='Select Friend'
          fluid
          selection
          options={users}
         /> */}