'use client'
import axios from 'axios';
import React, { useEffect } from 'react'

function FilePage({params}) {
  const fileName = params.filename;

  useEffect(() => {
    axios.get('/api/transcribe?filename='+fileName)
  }, [fileName]);

  return (
    <div>{fileName}</div>
  )
}

export default FilePage;