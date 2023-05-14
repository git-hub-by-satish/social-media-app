import { Component } from "react";

import {BsFillPersonVcardFill} from 'react-icons/bs'
import {BiLike, BiCommentDetail, BiShareAlt} from 'react-icons/bi'

import {getDownloadURL, ref, uploadBytesResumable, listAll} from 'firebase/storage'
import {storage} from "../../firebase";

import Header from "../Header";
import "./index.css";

class Home extends Component {
  state = { progress: '0', postsList:[]}

  componentDidMount() {
    this.downloadFiles()
  }

  onSubmitForm = event => {
    event.preventDefault()
    console.log(event.target[0].files[0])
    const file = event.target[0].files[0]
    this.uploadFiles(file)
  }

  uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/posts/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on('state_changed', (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100);
        this.setState({progress: prog})
    }, (err) => console.log(err), () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then((url) => console.log(url));
    })
  }

  downloadFiles = () => {
    const listRef = ref(storage, '/posts')
    listAll(listRef)
  .then((res) => {
    res.prefixes.forEach((folderRef) => {
      // All the prefixes under listRef.
      // You may call listAll() recursively on them.
    });
    res.items.forEach((itemRef) => {
      // All the items under listRef.
      getDownloadURL(itemRef).then(url => {
        this.setState((prevState) => (
          {
            postsList: [...prevState.postsList, url]
          }
        ))
      })
    });
  }).catch((error) => {
    console.log(error)
  });
  }

  getFileType = (url) => {
    const endIndex = url.indexOf('?')
    const urlSlice = url.slice(0, endIndex)
    console.log(urlSlice)
    if (urlSlice.endsWith('jpeg') || urlSlice.endsWith('png') || urlSlice.endsWith('gif') || urlSlice.endsWith('jpg')) {
      return 'image'
    }
    else if (urlSlice.endsWith('mp4') || urlSlice.endsWith('mov') || urlSlice.endsWith('wmv') || urlSlice.endsWith('webm')) {
      return 'video'
    }
  }


  render() {
    const {progress, postsList} = this.state
    //console.log(postsList)
    return (
        <div className="home-background">
        <Header />
        <div className="file-upload-section">
          <div className="file-upload-heading">
            <BsFillPersonVcardFill/>
          <p>What's on your mind?</p>
          </div>
        <form className="file-upload-form" onSubmit={this.onSubmitForm}>
          <input type="file" className="choose-file-input"/>
          <button className="upload-button" type="submit">Upload</button>
        </form>
        {(progress !=='0') && <h1 className="upload-percentage">Uploaded {progress}%</h1>
        }
        </div>
        <ul className="posts-list">
          {postsList.map((url) => {
            const fileType = this.getFileType(url)
            console.log(fileType)
            let post
            switch(fileType) {
              case 'image':
                 post = <li className="post-item"><img className="users-post" src={url} alt="post"/>
                 <div className="social-icons">
                  <BiLike/>
                  <BiCommentDetail/>
                  <BiShareAlt/>
                 </div>
                 </li>
                 break;
              case 'video':
                post = <li className="post-item">
                  <video className="users-post">
                    <source src={url} type="video/mp4"/>
                    <source src={url} type="video/mov"/>
                    <source src={url} type="video/webm"/>
                  </video>
                </li>
                 break;
              default:
                <li>Not supported format</li>
            } 
            return post
          })}
        </ul>
        </div>
    );
  }
}

export default Home;
