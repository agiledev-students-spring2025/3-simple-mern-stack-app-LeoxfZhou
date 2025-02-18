import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AboutUs.css';

function AboutUs() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get('http://localhost:5002/about');
        setAboutData(response.data.aboutData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load about page data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!aboutData) return <div>No data available</div>;

  return (
    <div className="about-container">
      <h1>About Us</h1>
      <div className="profile">
        <img 
          src={aboutData.imageUrl} 
          alt={aboutData.name}
          className="profile-image" 
        />
        <h2>{aboutData.name}</h2>
        {aboutData.bio.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

export default AboutUs;