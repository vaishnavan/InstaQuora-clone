import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react';
import htmlparser from 'react-html-parser';
import moment from 'moment';
import {Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ScrollableFeed from 'react-scrollable-feed'
import './home.css';



function Home(props) {
    const [userpost, setUserPost] = useState([])
    const getData = JSON.parse(localStorage.getItem('auth'))


    

    useEffect(() =>{
        axios.get("https://myinsta5.herokuapp.com/allpost", {
            headers:{
                "Authorization":getData.token
            }
        })
        .then((res) => {
            setUserPost(res.data.posts)
            // console.log(res.data.posts)
        })
        
    }, [getData.token,userpost])
    
    const likeData = (id) => {
        const postData = {
            postId:id
        }
        axios.put('https://myinsta5.herokuapp.com/like', postData, {
            headers:{
                "Content-Type":"application/json",
                "Authorization":getData.token
            },
        })
        .then((res) => {
            // setShow(true)
            const newData = userpost.map(item => {
                if(item._id === res._id){
                    return res
                }else{
                    return item
                }
            })
            setUserPost(newData)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const unlikePost = (id) => {
        const postData = {
            postId:id
        }
        axios.put('https://myinsta5.herokuapp.com/unlike', postData, {
            headers:{
                "Content-Type":"application/json",
                "Authorization":getData.token
            },
        })
        .then((res) => {
            // setShow(false)
            const newData = userpost.map(item => {
                
                if(item._id === res._id){
                    console.log("hellooo")
                    console.log(res)
                    return res
                }else{
                    return item
                }
            })
            setUserPost(newData)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const makeComment = (text, postId) => {
        const postData = {
            postId,
            text
        }
        axios.put('https://myinsta5.herokuapp.com/comment', postData, {
            headers:{
                "Content-Type":"application/json",
                "Authorization":getData.token
            },
        })
        .then(result=>{
            console.log(result.data.comments[0].postedBy.username)
            const newData = userpost.map(item=>{
              if(item._id==result._id){
                  return result
              }else{
                  return item
              }
           })
        //    setCommentUser(result.data.comments)
          setUserPost(newData)
        }).catch(err=>{
            console.log(err)
        })
    }

    // commentUser.map((data) => {
    //     console.log(data.postedBy.username)
    // })
    // const comments = userpost.comments;
    // console.log(comments)
    

    


    
    return (
        <div className="container mt-5">
            <div className="greet">
               <div className="greet_info">
               <h3 style={{textTransform:"capitalize"}}>Welcome, {getData.user.username}</h3>
                <button className="btn btn-info mt-3" onClick={() => {localStorage.removeItem('auth'); props.history.push('/login'); }} >logout</button>
               </div>
               <div className="greet_add">
                   <Link to="/addpost">
                    <Icon color="blue" name="add circle" size="big" />
                   </Link>
               </div>
            </div>
            

            {userpost.map((data,i) => {
                return(
                    <div key={data._id} className="card_main mt-3">
                        <div className="card_header">
                            <div className="card_profile_img">
                                <img src="https://img2.pngio.com/instagram-person-profile-user-icon-instagram-person-icon-png-512_512.png" alt="no" />
                            </div>
                            <div className="card_profile_name">
                                <h3>{data.postedBy.username}</h3>
                            </div>
                        </div>
                        <div className="card_desc">
                            <div className="card_desc_content">
                                <p><b>{data.title}</b></p>
                                <p className="mt-1 ml-1">{(htmlparser(data.body))}</p>
                            </div>
                        </div>
                        <div className="like_status p-3">   

                            {data.likes.includes(getData.user._id) ?
                            <>
                            <Icon size="large" color="blue" name="thumbs up" onClick={() => unlikePost(data._id) } />
                            <span className="mt-2">{data.likes.length} likes</span>
                            </>
                            
                            :
                            <>
                            <Icon size="large"  name="thumbs up" onClick={() => likeData(data._id)} />   
                            <span className="mt-2">{data.likes.length} likes</span>
                            </>
                            }
                            
                           
                            <p className="mt-2">{data.comments.length} comments</p>
                        </div>
                        <ScrollableFeed>
                            <div className="comment-section">
                                {
                                data.comments.sort((a,b) => a._id < b._id ? 1:-1).map((showData,i) => {
                                    return(
                                        <div className="comment_card" key={showData._id}>
                                            <p key={showData._id}><span style={{fontWeight:"800", textTransform:"capitalize"}}>{showData.postedBy.username}: </span> {showData.text}</p>
                                        </div> 
                                    )
                                })
                                }
                                
                            </div>
                            </ScrollableFeed>
                            <div className="comment_form">
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,data._id)
                                    e.target[0].value="";
                                    }}>
                                <input type="text" placeholder="Add a comment..." />  
                                </form>
                            </div>
                        <div style={{textAlign:"right"}} className="card_created_date m-2">
                            <span >{moment(data.createdAt).format("lll")}</span>
                        </div> 
                    </div>
                )
            })}

        </div>
    )
}

export default Home
