# 11 - Shop-redux

In this small application, I learned how to use Redux, Redux Toolkit in conjunction with React. How to run async code with Redux. How to handle side effects. PUT and POST methods implemented. I demostrate how easy it is to manage state, reducers and actions with Redux Toolkit instead of having to set up everything on your own.
I was using core Redux concepts (using "configureStore" for creating of Central Data Store and argument as reducers, merging reducers and other core concepts...)
Also i have learned how to use Redux manage data, e.c.: using "useSelector" in components to read data from Redux managed state.
And how to use "useDispatch" to get access to dispatch function which I use to dispatch actions which then leads to Redux state being changed.
In additional I learned when working with Redux, when code dispatch some action. that would involve the side effect, like a HTTP request, that should be sent, where I should then put that side effect code (where should be put asynchronous code when working with Redux). I explore two places for that - directly into the Component and create for this new action creator function. So I don't use automatically generated ones redux toolkit gives me but instead I write my own action creators.
In addition I learn how to pass extra data to actions.
The project used a Firebase.  

<h3>npm install @reduxjs/toolkit</h3>
<h3>npm run start</h3>

<h3 align="center">About App:</h3>
<div>- The user can add to the Cart two books and see them into Cart</div>
<div>- In the Cart user can add or remove quantity of books</div>

<h3 align="center">Thanks for reading this entire post.</h3>
