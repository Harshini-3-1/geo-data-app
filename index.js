import { useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);

  const register = async () => {
    try {
      const response = await axios.post('http://localhost:3000/register', { username, password });
      console.log('Registered:', response.data);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      console.log('Logged in:', response.data);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('File uploaded:', response.data);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <div>
      <h1>Geospatial Data Management and Visualization</h1>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={register}>Register</button>
        <button onClick={login}>Login</button>
      </div>
      <div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={uploadFile}>Upload File</button>
      </div>
      <Map />
    </div>
  );
}
