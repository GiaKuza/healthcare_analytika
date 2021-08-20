import React, {Fragment} from 'react'

const ImageUpload = () => {


    return(
        <Fragment>
            <form>
                <div className="custom-file mb-4" >
                    <input type="file" name="customFile"className="custom-file-input" id='upload' />    
                    <label className="custom-file-label" htmlFor={'upload'}>
                        Choose Image
                    </label>
                  
                    
                </div>
                
            </form>

        </Fragment>
    )
}

export default ImageUpload;