import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import Input from './Input';
 
const MaterialContainer = styled.div`
  width: 100%; 
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url('https://lh4.googleusercontent.com/-XplyTa1Za-I/VMSgIyAYkHI/AAAAAAAADxM/oL-rD6VP4ts/w1184-h666/Android-Lollipop-wallpapers-Google-Now-Wallpaper-2.png'); /* Replace with your actual background image URL */
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  overflow: hidden;
`;

const Box = styled.div`
  position: relative;
  top: 0;
  opacity: 1;
  float: left;
  padding: 60px 50px 40px 50px;
  margin-top:100px;
  background: #fff;
  border-radius: 15px; /* Dodajemo zaobljene ivice */
  z-index: 5;
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1), 0 0 40px rgba(0, 0, 0, 0.1); 
  padding: 50px;  
  margin:20%;
`;



const Title = styled.div`
  width: 100%;
  float: left;
  line-height: 46px;
  font-size: 34px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #ED2553;
  position: relative;
  margin-bottom: 30px;
`;

 

const Button = styled.div`
  width: 100%;
  float: left;
  margin-top: 40px;

  button {
    width: 100%;
    line-height: 64px;
    background-color: #fff;
    color: #ED2553;
    border: none;
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-weight: 300;
    cursor: pointer;
  }
`;

function LoginRegisterComponent({setToken}) {
  const [isLogin, setIsLogin] = useState(true);   
  const [username, setUsername] = useState('anamitic01@gmail.com');
  const [password, setPassword] = useState('password');
  const [repeatPassword, setRepeatPassword] = useState('password');
  let navigate=useNavigate();
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: username,
        password: password,
      });
      console.log('Login response:', response.data);
      sessionStorage.setItem("token", response.data.token);
      setToken(response.data.token)
      if(response.data.user.role=="admin"){
        navigate('/admin')
      }else{
        navigate('/mojProfil');

      }
    } catch (error) {
      console.error('Login error:', error);   
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name: username,
        email: username,
        password: password,
      
      });
      console.log('Register response:', response.data);
      alert("USPEH")
    } catch (error) {
      console.error('Register error:', error);
      alert("GRESKA")
    }
  };

  return (
    <MaterialContainer>
      {isLogin ? (
        <Box>
          <Title>LOGIN</Title>
          <form onSubmit={handleLogin}>
            <Input label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button>
              <button type="submit">GO</button>
            </Button>
          </form>
          <a href="#" className="pass-forgot">Forgot your password?</a>
          <Button>
            <button onClick={toggleForm}>Switch to Register</button>
          </Button>
        </Box>
      ) : (
        <Box>
          <Title>REGISTER</Title>
          <form onSubmit={handleRegister}>
            <Input label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input label="Repeat Password" type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
            <Button>
              <button type="submit">NEXT</button>
            </Button>
          </form>
          <Button>
            <button onClick={toggleForm}>Switch to Login</button>
          </Button>
        </Box>
      )}
    </MaterialContainer>
  );
}


export default LoginRegisterComponent;
