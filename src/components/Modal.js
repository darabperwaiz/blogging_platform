import axios from "axios";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Editor from 'react-simple-wysiwyg';

const Model = ({show, setShow, handleClose, handleShow, isEditing, eidtablePost}) => {
   
  
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('');
    
    const token = localStorage.getItem('blog_token')
  
    function onChange(e) {
        setBody(e.target.value);
    }
   
    console.log(eidtablePost)

    const createPost = async () => {
         try {
            await axios({
                method: 'POST',
                url: 'http://localhost:7000/api/v1/posts/create-post',
                data: {
                    title: title,
                    body: body
                },
                headers: {
                    'token': `bearer ${token}`
                }
             })
             setTitle('')
             setBody('')
             handleClose()
             location.reload()
         } catch (error) {
            
         }

    }

    const updatePost = () => {
        console.log(title, body)
    }
  
    return (
      <>
      {eidtablePost.length == 0 ? 
        <Modal
        style={{color: 'black'}}
        // style={{maxWidth: "1080px", margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px'}}
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
           <input type="text" style={{width: "100%", padding: '10px'}} value={title} name="title" id="" onChange={(e)=> setTitle(e.target.value)} placeholder="Enter Post Title"/>
           <Editor value={body} onChange={onChange} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={isEditing ? updatePost : createPost}>{isEditing? "Update" : "Create"}</Button>
          </Modal.Footer>
        </Modal>
        :
        <Modal
        style={{color: 'black'}}
        // style={{maxWidth: "1080px", margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px'}}
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
           <input type="text" style={{width: "100%", padding: '10px'}} value={eidtablePost.title} name="title" id="" onChange={(e)=> setTitle(e.target.value)} placeholder="Enter Post Title"/>
           <Editor value={eidtablePost.body} onChange={onChange} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={isEditing ? updatePost : createPost}>{isEditing? "Update" : "Create"}</Button>
          </Modal.Footer>
        </Modal>
      }
      </>
    );
}

export default Model
