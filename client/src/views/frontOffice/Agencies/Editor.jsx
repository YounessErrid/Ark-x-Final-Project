import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';  // Ensure this is imported
import ImageResize from 'quill-image-resize-module-react';

import './style.css'

Quill.register('modules/imageResize', ImageResize);

const Editor = ({onChange, placeholder, description }) => {
  const [editorHtml, setEditorHtml] = useState('');
  const quillRef = useRef(null);

  const handleChange = useCallback((html) => {
    setEditorHtml(html);
    onChange(html)
  }, [onChange]);

  useEffect(()=>{
    if(description){
      setEditorHtml(description)
    }
  }, [description])

  const handleImageUpload = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64Image = e.target.result;
          const range = quillRef.current.getEditor().getSelection();
          quillRef.current.getEditor().insertEmbed(range.index, 'image', base64Image);
        };
        reader.readAsDataURL(file);
      }
    };
  }, []);

  return (
    <ReactQuill
      theme="snow"
      ref={quillRef}
      value={editorHtml}
      onChange={handleChange}
      modules={{
        ...Editor.modules,
        toolbar: {
          container: Editor.modules.toolbar,
          handlers: {
            image: handleImageUpload,
          },
        },
      }}
      formats={Editor.formats}
      bounds="#root"
      placeholder={placeholder}
      style={{ height: '400px' }}  // Optional: Adjust the height as needed
    />
  );
};

Editor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize'],
  },
};

Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

export default Editor;
