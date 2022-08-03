import React, {useState} from 'react';

export default function TextForm(props) {
    const handleChange = (event) => {
        setText(event.target.value);
    }
    const [text, setText] = useState('');
    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        newText.length>0 ? props.handleAlert("Converted to Uppercase!", "success") : props.handleAlert("Please enter the text!", "warning");
    }
    const handleLowClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        newText.length>0 ? props.handleAlert("Converted to Lowercase!", "success") : props.handleAlert("Please enter the text!", "warning");
    }
    const handleSentenceCase = () => {
        let newText = text;
        newText = newText.toLowerCase();
        const stringArr = newText.split(" ");
        let lastArrIndex = stringArr.length-1;
        for(let i=0; i < stringArr.length; i++) {
            if(i===0) {
                if(stringArr[i].length > 1) {
                    stringArr[i] = stringArr[i][0].toUpperCase() + stringArr[i].slice(1).toLowerCase();
                }
                else if(stringArr[i].length === 1){
                    stringArr[i] = stringArr[i][0].toUpperCase();
                } 
                else {
                    props.handleAlert("Please enter the text!", "warning");
                }
            } else if(stringArr[i] === "i" || stringArr[i] === "I") {
                stringArr[i] = stringArr[i].toUpperCase();
            } else if((stringArr[i].charAt(stringArr[i].length - 1) === '.' || stringArr[i].charAt(stringArr[i].length - 1) === '?' || stringArr[i].charAt(stringArr[i].length - 1) === '!') && i !== lastArrIndex) {
                const l = stringArr[i+1].split("").map((v,k)=>{
                    if(k===0)return v.toUpperCase();
                    return v.toLowerCase();
                }).join("");
                stringArr[i+1]=l;
            } 
        }
        newText = stringArr.join(" ");
        setText(newText);
        newText.length>0?props.handleAlert("Converted to Sentence case!", "success"):props.handleAlert("Please enter the text!", "warning");;
    }
    const handleCopyText = () => {
        const newText = document.getElementById("myBox");   //this initializes newText as an object, typeof newText is object type
        if(newText.value.length>0) {
            newText.select();
            navigator.clipboard.writeText(newText.value);
            props.handleAlert("Copied to clipboard!", "success");
        }
        else {
            props.handleAlert("Please enter the text!", "warning");
        }
    }
    const handleClrText = () => {
        if(text.length>0){
            let newText = '';
            setText(newText);
            props.handleAlert("Text cleared!", "success");
        }
        else props.handleAlert("Please enter the text!", "warning");
    }
    
    return(
        <>
            <div style={{color: props.changeMode==='dark'?'white':'black' }}>
                <div>
                    <h1>{props.heading}</h1>
                    <div className="mb-3">
                        <textarea className="form-control" value={text} onChange={handleChange} style={{color: props.changeMode==='dark'?'white':'black', backgroundColor: props.changeMode==='dark'?'#04293A':'white' }} id="myBox" rows="8"></textarea>
                    </div>
                    <button className="btn btn-primary mx-2" onClick={handleUpClick}>Convert to Uppercase</button>
                    <button className="btn btn-primary mx-2" onClick={handleLowClick}>Convert to Lowercase</button>
                    <button className="btn btn-primary mx-2" onClick={handleSentenceCase}>Convert to Sentence case</button>
                    <button className="btn btn-primary mx-2" onClick={handleCopyText}>Copy Text</button>
                    <button className="btn btn-primary mx-2" onClick={handleClrText}>Clear Text</button>
                </div>
                <div className="container my-3">
                    <h2>Your Text Summary Here</h2>
                    <p>{text.length === 0 ? 0 : text.split(" ").length} words and {text.length} characters.</p>
                    <p>{0.008 * text.split(" ").length} minutes to read.</p>
                    <h3>Preview</h3>
                    <p>{text.length > 0 ? text : "Enter something in the textbox to preview it here."}</p>
                </div>
            </div>
            
        </>
    );
}