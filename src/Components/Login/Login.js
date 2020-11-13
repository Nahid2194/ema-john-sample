import React from 'react';
import firebase from "firebase/app";
import "firebase/auth"
import firebaseConfig from './firebase.config';
import { useState } from 'react';
import { UserContext } from '../../App';
import { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
firebase.initializeApp(firebaseConfig)
function Login() {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
    })

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const provider = new firebase.auth.GoogleAuthProvider();
    const handleSignout = () => {
        firebase.auth().signOut()
            .then(res => {
                const signOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    photo: '',
                    error: '',
                    success: false
                }
                setUser(signOutUser);
            })
            .catch(err => {
                // An error happened.
            });
    }
    const handleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const { email, photoURL, displayName } = res.user;
                console.log(email, photoURL, displayName);
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(signedInUser);
            })
            .catch(err => {
                console.log(err);
                console.log(err.message);
            })
        console.log("Sign Clicked");
    }
    const handleSubmit = (e) => {
        // console.log("Submitted");
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const userInfo = { ...user };
                    userInfo.error = '';
                    userInfo.success = true;
                    setUser(userInfo)
                    updateUserName(user.name);
                })
                .catch(error => {
                    const userInfo = { ...user };
                    userInfo.error = error.message;
                    userInfo.success = false;
                    setUser(userInfo)
                    // ...
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const userInfo = { ...user };
                    userInfo.error = '';
                    userInfo.success = true;
                    setUser(userInfo);
                    setLoggedInUser(userInfo);
                    history.replace(from);
                    // console.log('Sign in User info', res);
                })
                .catch(error => {
                    const userInfo = { ...user };
                    userInfo.error = error.message;
                    userInfo.success = false;
                    setUser(userInfo)
                    // ...
                });
        }
        e.preventDefault()
    }
    const handleChange = event => {
        let isFormValid = true;
        if (event.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(event.target.value);

        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFormValid = isPasswordValid && passwordHasNumber;
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }
    const updateUserName = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(function () {
            console.log("Update User Name Successfully");
        }).catch(function (error) {
            console.log(error);
        });
    }
    return (
        <div style={{ textAlign: 'center' }}>
            {
                user.isSignedIn ? <button onClick={handleSignout}>Sign out</button> :
                    <button onClick={handleSignIn}>Sign in</button>
            }
            <div style={{ border: "1px slid red" }} className="container">
                {
                    user.isSignedIn && <div>
                        <p>Welcome , {user.name}</p><br />
                        <p>Your Email : {user.email}</p><br />
                        <img src={user.photo} alt="" />
                    </div>
                }
            </div>
            <h1>Our Own Authentication</h1>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">New User Sign Up</label>
            <form onSubmit={handleSubmit}>

                {newUser && <input onBlur={handleChange} name="name" type="text" placeholder="Enter Your Name" required />}<br />
                <input onBlur={handleChange} name="email" type="text" placeholder="Enter Your Email" required /><br />
                <br />
                <input onBlur={handleChange} name="password" type="password" placeholder="Enter Your Password" /><br />
                <br />
                <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Login'} Successfully</p>}
        </div>
    );
}

export default Login;
