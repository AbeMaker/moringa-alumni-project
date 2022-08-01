import React from 'react';
import {Menu, Container, Button, Image} from "semantic-ui-react"; //Image
import {useNavigate, Link} from "react-router-dom";
//import logo from "./my-assets/react-js-icon.svg";

 const NavBar = () => {
    const navigate=useNavigate();

  return (
    <Menu inverted borderless style={{padding:"0.3rem", marginBottom: "20px"}} attached>
        <Container>
            <Menu.Item name="home">
                <Link to="/">
                    {/*<Image size='mini' src={logo} alt="logo"/>*/}
                    </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <h2>Moringa Alumni Records</h2>
                    </Menu.Item>
                    <Menu.Item positiin='right'>
                        <Button size='mini' primary onClick={()=>navigate("/")}>Home</Button>
                    </Menu.Item>
                    <Menu.Item positiin='right'>
                        <Button size='mini' primary onClick={()=>navigate("/add")}>Add Alumni</Button>
                    </Menu.Item>
                  
                   <Menu.Item>
                        <Button size='mini' primary onClick={()=>navigate("/projects")}>Projects</Button>
                   </Menu.Item>
                   <Menu.Item>
                        <Button size='mini' primary onClick={()=>navigate("/events")}>Events</Button>
                   </Menu.Item>
                   <Menu.Item>
                        <Button size='mini' primary onClick={()=>navigate("/about")}>About</Button>
                   </Menu.Item>
        
                </Container>
    </Menu>

  )
}
export default NavBar;

{/*

 const NavBar = () => {
    const navigate=useNavigate();

  return (
    <Menu inverted border style={{padding:"0.3rem", marginBottom: "20px"}} attached>
        <Container>
            <Menu.Item name="home">
                <Link to="/">
                    {/*<Image size='mini' src={logo} alt="logo"/>
                    </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <h2>Moringa Alumni Records</h2>
                    </Menu.Item>
                    <Menu.Item positiin='right'>
                        <Button size='mini' primary onClick={()=>navigate("/add")}>Add Alumni</Button>
                        
                    </Menu.Item>
                   <Menu.Item>
                        <Button size='mini' primary onClick={()=>navigate("/about")}>About</Button>
                   </Menu.Item>
        
                </Container>
        
            </Menu>
          )
        }
        export default NavBar;

*/}