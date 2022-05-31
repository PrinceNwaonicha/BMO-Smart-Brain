import React    from "react";
import './ImageLinkForm.css'
import '../../App.css'
const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
    return (
        <div >
            
            <p className="f3">
                {'BMO will detect faces in your pictures. Give it a try!' }
            </p>
            
            <div className="center">
                <div className="pa4 br3 shadow-5 center form" >
                <input className="f4 pa2 w-70 center textbox"type="tex" onChange={onInputChange}/>
                    <button className="f4 w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
                        onClick={onPictureSubmit}
                    >Detect</button>
                
                </div>
                </div>
            
        </div>
        
    )
};

export default ImageLinkForm;