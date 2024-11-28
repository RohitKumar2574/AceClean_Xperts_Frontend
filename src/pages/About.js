import React, { useState } from 'react';
import '../styles/AboutUs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/AboutUs.module.css';

export const About = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = '1Bsgv6DnTiI';
  const playVideo = () => {
    setIsPlaying(true);
  };
  const teamMembers = [
    {
      name: "James Wong",
      role: "Cleaning Supervisor",
      image: "/assets/img/about/james.jpg",
      twitter: "link_to_james_twitter",
    },
    {
      name: "Sarah Johnson",
      role: "Operations Manager",
      image: "/assets/img/about/sarah.jpg",
      twitter: "link_to_sarah_twitter",
    },
    {
      name: "David Nguyen",
      role: "Cleaning Technician",
      image: "/assets/img/about/david.jpg",
      twitter: "link_to_david_twitter",
    },
    {
      name: "Samantha Lee",
      role: "Marketing Coordinator",
      image: "/assets/img/about/samantha.jpg",
      twitter: "link_to_samantha_twitter",
    },
  ];
  return (  
    <>
    <div className="banner text-center">
      <div className="banner-text">
        <h1>About Us</h1>
        <p>Years of experience in cleaning industry</p>
      </div>
    </div>
    <section className={styles.aboutUs}>
      <div className={styles.contentWrapper}>
        {/* Left Section: Heading and Description */}
        <div className={styles.aboutText}>
          <h4>About Us</h4>
          <h2>Clean Home with Our Professional Cleaning Services</h2>
          <p>
            Faucibus commodo aenean et sit quisque ipsum. Consequat eu id ut
            dolor felis quis. Sagittis a sapien pulvinar etiam.
          </p>
        </div>

        {/* Right Section: Skill Bars */}
        <div className={styles.skillBars}>
          <div className={styles.skillItem}>
            <span>Experienced</span>
            <div className={styles.progressBar}>
              <div className={styles.progress} style={{ width: '98%' }}>
                98%
              </div>
            </div>
          </div>
          <div className={styles.skillItem}>
            <span>Reliable</span>
            <div className={styles.progressBar}>
              <div className={styles.progress} style={{ width: '86%' }}>
                86%
              </div>
            </div>
          </div>
          <div className={styles.skillItem}>
            <span>Skilled & Capable</span>
            <div className={styles.progressBar}>
              <div className={styles.progress} style={{ width: '90%' }}>
                90%
              </div>
            </div>
          </div>
          <div className={styles.skillItem}>
            <span>Flexible</span>
            <div className={styles.progressBar}>
              <div className={styles.progress} style={{ width: '80%' }}>
                80%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.videoContainer}>
      {!isPlaying ? (
        // Show play button overlay before playing the video
        <div className={styles.playButtonContainer}>
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} // YouTube video thumbnail
            alt="Video Thumbnail"
            className={styles.thumbnail}
          />
          <FontAwesomeIcon
            icon={faPlayCircle}
            className={styles.playButton}
            onClick={playVideo}
          />
        </div>
      ) : (
        // Show the iframe when play button is clicked
        <iframe
          className={styles.videoIframe}
          width="1200px"
          height="450px"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
      </div>
      <div className={styles.teamSection}>
        <h2 className={styles.title}>Meet Our Cleaning Team</h2>
        <div className={styles.teamContainer}>
          {teamMembers.map((member, index) => (
            <div className={styles.memberCard} key={index}>
              <img
                src={member.image}
                alt={member.name}
                className={styles.memberImage}
              />
              <h3 className={styles.memberName}>{member.name}</h3>
              <p className={styles.memberRole}>{member.role}</p>
              <a href="#" className={styles.twitterLink}>
                Follow on Twitter
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}

