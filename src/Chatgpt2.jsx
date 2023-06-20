import { useState } from "react";
import "./styles.css";

function ChatGPT() {
  const apiUrl = "process.env.REACT_APP_API_URL";
  const aaa = "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";
  console.log(apiUrl);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: (
        <div className="message-content">
          {" "}
          <p>Hello from MohiT! How can I help you today?</p>{" "}
          <p>
            You can ask me almost any question! As a language model, I am
            designed to understand and respond to a wide range of topics and
            queries.
          </p>{" "}
          <ul>
            {" "}
            <li>Can you tell me a joke?</li>{" "}
            <li>Write a letter for job holiday</li>{" "}
            <li>Write an essay on India?</li>{" "}
            <li>Can you recommend a good book to read?</li>{" "}
            <li>What is the difference between a virus and a bacteria?</li>{" "}
          </ul>{" "}
        </div>
      )
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListning, setIsListning] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);

  const recognition = new window.webkitSpeechRecognition(); // create a new instance of SpeechRecognition

  const handleVoiceInput = () => {
    //  setIsLoading(true); // set loading state to true
    setIsListning(true);
    recognition.start(); // start recording user's voice input

    recognition.onresult = (event) => {
      const userMessage = {
        role: "user",
        content: event.results[0][0].transcript
      };
      //  setConversationHistory((prevHistory) => [...prevHistory, userMessage]); // add user's message to the conversation history
      setInputValue(event.results[0][0].transcript); // set the input value to the user's spoken text

      //  handleUserInput(); // call the function to handle the user's input
    };

    recognition.onend = () => {
      setIsListning(false); // set loading state back to false after recording ends
    };
  };

  const handleUserInput = async () => {
    setIsLoading(true); // set loading state to true
    // add the user's message to the conversation history
    setConversationHistory((prevHistory) => [
      ...prevHistory,
      { role: "user", content: inputValue }
    ]);
    const formattedInput = inputValue
      .trim()
      .split("\n")
      .map((line, index) => (
        <div key={index} className="message user">
          {" "}
          {line}{" "}
        </div>
      ));
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: formattedInput }
    ]);
    setInputValue("");
    let val = [...conversationHistory, { role: "user", content: inputValue }];
    console.log(val);
    console.log(val);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${aaa}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: val
      })
    });

    const data = await response.json();
    console.log(data);
    const output = data.choices[0].message.content;
    // output.split(" =>
    const formattedOutput = output.split("\n").map((line, index) => (
      <div key={index} className="message assistant">
        {line}
      </div>
    ));
    // add the bot's response to the conversation history
    const botMessage = { role: "assistant", content: output };
    setConversationHistory((prevHistory) => [...prevHistory, botMessage]);
    console.log(formattedOutput);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "assistant", content: formattedOutput }
    ]);
    setIsLoading(false); // set loading state back to false after response is received
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {" "}
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {" "}
            {message.content}{" "}
          </div>
        ))}{" "}
      </div>{" "}
      <button
        className={`voice-button ${isListning ? "loading" : ""}`}
        onClick={handleVoiceInput}
      >
        {isListning
          ? "I am Listening plz speak..."
          : "Click to use Voice for Input"}
      </button>
      <div className="chat-input">
        {" "}
        <input
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleUserInput();
            }
          }}
        />
        {!isLoading && (
          <button className="send-button" onClick={handleUserInput}>
            {" "}
            Send{" "}
          </button>
        )}
        {isLoading && <div className="loading-spinner"></div>}
      </div>{" "}
    </div>
  );
}
export default ChatGPT;
