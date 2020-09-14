// implementation of quilljs in react
import React, { useEffect } from 'react'
import { useQuill } from 'react-quilljs'
import config from 'APPSRC/app/appConfig'

import 'quill/dist/quill.snow.css'


export default props => {
  
  const options = {
//     debug: 'info',
    modules: {
      toolbar: "#toolbar"
    },
    placeholder: 'Compose an epic...',
    theme: 'snow',
    
  }
  
  const { quill, quillRef } = useQuill('#editor', options)
  
  const insertToEditor = url => {
    const range = quill.getSelection()
    quill.insertEmbed(range.index, 'image', url)
  }
  
  const saveToServer = async (file) => {
    const body = new FormData()
    body.append('file', file)
    
    const res = await fetch(config.endpoint.posts, {
      method: 'POST',
      body
    })
    insertToEditor(res.uploadImageUrl)
  }
  
  const selectLocalImage = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    
    input.onchange = () => {
      const file = input.files[0]
      saveToServer(file)
    }
  }
  
  useEffect(() => {
    if(quill){
      // add custom handler for Image upload
      quill.getModule('toolbar')
        .addHandler('image', selectLocalImage)
    }
  }, [quill])
  
  return (
    <div className="rich-editor" style={props.style}>
      <div ref={quillRef} defaultValue={props.default}/>
      <div id="toolbar"/>
    </div>
  )
}
