import "./app.css"
import { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Card from "./components/card/Card";
import {posts} from "./data"
import { io } from "socket.io-client";

const App= ()=>
{
  const [username, setUsername]= useState("")
  const [user, setUser]= useState("")
  const [socket, setSocket]=useState(null)
  useEffect(()=>
  {
    setSocket(io("http://localhost:3001"));
  },[])

  useEffect(()=>
  {
    socket?.emit("newUser", user)
  },[socket,user])

  return (
  <div className="container">
    {
      user ? (
        <>
        <Navbar socket={socket}></Navbar>
        {posts.map((post)=>(
        <Card key={post.id} post={post} socket={socket} user={user}></Card>))}
        
        <span className="username"> {user}</span>
        </>
      ): (
    <div className="login">
      <input type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)} />
      <button onClick={()=>setUser(username)}>Login</button>
    </div>
    )
    }
     </div>

  )};

export default App;