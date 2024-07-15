# **chatPFQ Server**

# **Built & Designed by Matthew Johnston, Barry James, Liam Houghton and Jake Slattery**

---

## **React Native App**

Github Repo Link: [https://github.com/rambatinoo/chat-pfq-native-app]

---

## **React Web App** 

Github Repo Link: [https://github.com/mjj677/chat-pfq-web-app]

---

## **GENERAL**

chatPFQ is a real-time chat application that utilises React & React Native to allow cross-platform instant communication. Running off the server in this repo,
that is built using Express.js and Socket.IO. Within this server, we also integrated multiple machine learning models for sentiment analysis and message
categorisation. 

---

# **SETUP & INSTALLATION**

### **REQUIREMENTS**

"axios": "^1.7.2",
"compromise": "^14.13.0",
"cors": "^2.8.5",
"dotenv": "^16.4.5",
"express": "^4.19.2",
"http": "^0.0.1-security",
"natural": "^7.0.7",
"node-nlp": "^4.27.0",
"sentiment": "^5.0.2",
"socket.io": "^4.7.5",
"wink-nlp": "^2.3.0"

### **CLONING THE REPO**

#### IN THE TERMINAL:

```
$ git clone https://github.com/mjj677/chat-pfq-server.git
```

#### SETTING UP THE ENVIRONMENT:

_ONE_ `.env.` file needs to be created in order for the app to function as expected.

- `.env` containing: `PORT=6969`

## **SCRIPTS**

### **INSTALLING DEPENDENCIES**

You can install the required dependencies by executing the following command in your terminal:

```
$ npm install
```

### **STARTING THE SERVER LOCALLY**

In order to get the server running locally, you need to run the following script, after installing all
dependencies - 

```
$ npm run start
```
