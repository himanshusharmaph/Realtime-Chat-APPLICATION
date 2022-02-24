const socket=io('http://localhost:8000');

//get DOM element in respective js variables
const form= document.getElementById('send-container');
const messageinput=document.getElementById('messageinp');
const messagecontainer=document.querySelector(".container");

//audio that will play on receiving messages
var audio=new Audio("./images/ting.mp3");

//function which will append event to the container

const append =(message, position) =>{ 
const messageElement=document.createElement('div');

messageElement.innerText = message;

messageElement.classList.add('message')

messageElement.classList.add(position)

messagecontainer.append(messageElement);

if(position=='left'){
        audio.play();
}

}

//ask new user for his/her name and let the server know
const names=prompt("Enter your name to join ");
socket.emit('new-user-joined', names);

//if a new user joins, receive his/her name from the server
socket.on('user-joined',names=>{
       
        append(`${names} joined the chat`,'right')
})

//if server sends a message receive it
socket.on('receive',data=>{
       
        append(`${data.names}: ${data.message}`, 'left');
})

//if user leaves the chat append the info to the container
socket.on('left', (names)=>{
       
        append(`${names} left the chat`, 'right');
})


//if the form get submitted send server the message
form.addEventListener('submit',(e)=>{
        e.preventDefault(); //donot reload the page
        const message=messageinput.value;
        append(`You: ${message}`, `right`);
        socket.emit('send', message);
        messageinput.value='';

})
