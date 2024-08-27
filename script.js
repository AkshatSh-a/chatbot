document.addEventListener("DOMContentLoaded", function(){
    const chatbox=document.getElementById("chat-box");
    const userInput = document.getElementsById('user-input');

    function isSustainabilityRelated(query){
        const sustainabilityKeywords=[
            "sustainability", "environment", "green", "eco-friendly", 
            "climate change", "renewable energy", "carbon footprint",
            "global warming", "earth-friendly", "clean energy", 
            "carbon emissions", "sustainable development", "recycling",
            "greenhouse gases", "energy efficiency", "organic",
            "renewable resources", "pollution", "zero waste",
            "sustainabilities", "environments", "greens", "eco-friendlies",
            "climate changes", "renewable energies", "carbon footprints",
            "global warmings", "earth-friendlies", "clean energies",
            "carbon emissions", "sustainable developments", "recyclings",
            "greenhouse gases", "energy efficiencies", "organics",
            "renewable resources", "pollutions", "zero wastes",'sustainable','energy','types of energy sources'            
        ];
        return sustainabilityKeywords.some(keyword=>query.toLowerCase().includes(keyword));
    }

    function appendMessage(message, sender){
        const messageElement=document.createElement("div");
        messageElement.classList.add("message");
        messageElement.textContent=message;
    
        if (sender==="user"){
            messageElement.classList.add("user-message");
        } else {
            messageElement.classList.add("ai-message");
        }
    
        chatBox.appendChild(messageElement);
        chatBox.scrollTop=chatBox.scrollHeight;
    }

    function sendMessage(){
        const userMessage=userInput.value.trim();
        if (userMessage==="") return;

        appendMessage(userMessage, "user");
        userInput.value="";

        if (!isSustainabilityRelated(userMessage)) {
            appendMessage("Please ask a question related to sustainability.", "ai");
            return;
        }
        fetch('https://jamsapi.hackclub.dev/openai/chat/completions',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer Apikeyhere'
            },
            body: JSON.stringify({
                'model':'gpt-3.5-turbo',
                'messages': [
                    {
                        'role': 'user',
                        'content': userMessage
                    }
                ]
            })
        })
        .then(result=>result.json())
        .then(response=>{
            if (response.choices && response.choices.length > 0) {
                const aiMessage=response.choices[0].message.content;
                appendMessage(aiMessage, "ai");
            } else {
                appendMessage("Sorry, I couldn't understand that.", "ai");
            }
        })
        .catch(error => console.error("Error:", error));
    }

    userInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    const sendButton = document.getElementById("send-button");
    sendButton.addEventListener("click", sendMessage);
});