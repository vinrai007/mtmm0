// // import ReactQuill from "react-quill";
// import 'react-quill/dist/quill.snow.css';
// import { useState } from "react";
// import {useContext} from "react";
// import {Navigate} from "react-router-dom";
// import Editor from "../Editor";
// import {UserContext} from "../UserContext";

// // import sendinblue from 'sendinblue-api';


// export default function CreatePost() {
//   const base_url = `https://mtmm1-2-backend.onrender.com`;
//   const [title,setTitle] = useState('');
//   const [summary,setSummary] = useState('');
//   const [content,setContent] = useState('');
//   const [files, setFiles] = useState('');
//   const [redirect, setRedirect] = useState(false);
//   const [isClicked, setIsClicked] = useState(false);
//   const { userInfo } = useContext(UserContext);
//   const userId = userInfo.id;
//   const username = userInfo.username;
//   // const sendinBlueClient = new sendinblue({ apiKey: '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' });

//   const handleButtonClick = () => {
//     setIsClicked(true);

//     setTimeout(() => {
//       setIsClicked(false);
//     }, 1000); // 1000 milliseconds = 1 second
//   };
//   const buttonClass = isClicked ? "clicked" : "";

//   async function createNewPost(ev) {
//     const data = new FormData();
//     data.set('title', title);
//     data.set('summary', summary);
//     data.set('content', content);
//     data.set('file', files[0]);
//     data.set('userId', userId); // Include userId in the FormData
//     data.set('username', username); // Include userId in the FormData
//     ev.preventDefault();
//     const response = await fetch(`${base_url}/post`, {
//       method: 'POST',
//       // userId: userId,
//       body: data,
//       credentials: 'include',
//     });
//     if (response.ok) {
//       setRedirect(true);
//     }
//   }
    
//   // sendinBlueClient.track('createNewPost', { 'post_title': 'Your Post Title' });

//   if (redirect) {
//     return <Navigate to={'/'} />
//   }
//   return (
//     <div className="createnewpost" >
//       <form onSubmit={createNewPost}>
//       <input type="title"
//              placeholder={'Title'}
//              value={title}
//             onChange={ev => setTitle(ev.target.value)} />
      
//       <input type="summary"
//              placeholder={'Summary'}
//              value={summary}
//              onChange={ev => setSummary(ev.target.value)} />
//       <input type="file"
//              onChange={ev => setFiles(ev.target.files)} />
//       <Editor value={content} onChange={setContent} />
//       <button className={`color-change-button ${buttonClass}`}
//         onClick={handleButtonClick}
//         style={{ marginTop: '5px' }}>Create post</button>
//     </form> </div>
    
//   );
// }


// import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import {useContext} from "react";
import {Navigate} from "react-router-dom";
import Editor from "../Editor";
import {UserContext} from "../UserContext";

export default function CreatePost() {
  const base_url = `https://mtmm1-2-backend.onrender.com`;
    // const base_url = `http://localhost:4000`;
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const { userInfo } = useContext(UserContext);
  const userId = userInfo.id;
  const username = userInfo.username;

  const MAX_TITLE_LENGTH = 20;
  const MAX_SUMMARY_LENGTH = 40;

  const handleTitleChange = (ev) => {
    const inputValue = ev.target.value;
    if (inputValue.length <= MAX_TITLE_LENGTH) {
      setTitle(inputValue);
    } else {
      setTitle(inputValue.substring(0, MAX_TITLE_LENGTH));
    }
  };

  const handleSummaryChange = (ev) => {
    const inputValue = ev.target.value;
    if (inputValue.length <= MAX_SUMMARY_LENGTH) {
      setSummary(inputValue);
    } else {
      setSummary(inputValue.substring(0, MAX_SUMMARY_LENGTH));
    }
  };

  const handleButtonClick = () => {
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  };
  const buttonClass = isClicked ? "clicked" : "";

  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    data.set('userId', userId);
    data.set('username', username);
    ev.preventDefault();
    const response = await fetch(`${base_url}/post`, {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="createnewpost">
      <form onSubmit={createNewPost}>
        <input
          type="title"
          placeholder={'Title'}
          value={title}
          onChange={handleTitleChange}
        />

        <input
          type="summary"
          placeholder={'Summary'}
          value={summary}
          onChange={handleSummaryChange}
        />

        <input
          type="file"
          onChange={ev => setFiles(ev.target.files)}
        />

        <Editor value={content} onChange={setContent} />

        <button
          className={`color-change-button ${buttonClass}`}
          onClick={handleButtonClick}
          style={{ marginTop: '5px' }}
        >
          Create post
        </button>
      </form>
    </div>
  );
}
