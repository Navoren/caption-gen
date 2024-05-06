'use client'
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from "next/navigation";


function HeroSection() {
    const [progress, setProgress] = useState(false);
    const router = useRouter();
    const handleUpload= async (e) => {
        e.preventDefault();
        setProgress(true);
        const files = e.target?.files;
        if (files.length > 0) {
            const file = files[0];
            const res = await axios.postForm('/api/upload', {
                file,
            });
            console.log(res.data);
            setProgress(false);
            const newName = res.data.newName;
            router.push('/'+newName);
        }
    };


return (
    <main>
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/3d-wireframe-grid-room-background_53876-101083.jpg?w=1380&t=st=1714658524~exp=1714659124~hmac=09f2ddcbeb1d3775825cf9d88af83f8310fc63ffd4b09fcb46361915625682a9)' }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="text-center hero-content">
        <div className="max-w-md">
            <h1 className="mb-5 text-7xl font-bold">Caption <span className="text-yellow-300">Banao </span></h1>
                    <p className="mb-5 text-white/60">
                        Caption Banao is a tool to generate captions for your videos. <span className='text-white'>Upload and we will do the rest.</span>
                    </p>
                    <div className='flex flex-col w-48 mx-auto'>
                    <label className="btn btn-accent btn-outline">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                        <input type="file" onChange={handleUpload} className='hidden' />
                        {progress ? 'Uploading...' : 'Choose File'}
                    </label>
                        {progress && <progress className='progress progress-warning mt-3' />}
                        </div>
                </div>
                
            </div>
        </div>
    </main>
)
}

export default HeroSection