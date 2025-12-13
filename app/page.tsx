'use client';

import { useState } from 'react';
import skills from '../data/skills.js';
import projects from '../data/projects.js';
import articles from '../data/articles.js';
import videos from '../data/videos.js';
import Image from 'next/image';
import bannerImage from '../public/meme-banner.jpg'; 


export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  //const [showOverlay, setShowOverlay] = useState(true);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/c2c4ebf243e50e31d804807d0e6c9237", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams([...formData] as [string, string][]).toString(),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        form.reset(); // clear form
      } else {
        alert("There was a problem submitting the form.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };


  return (
    <div className="min-h-screen font-sans text-white-800">
      {/* Hero Section */}
      <section id="home" className="pt-28 min-h-screen text-center">
        <h1 className="text-5xl font-bold mb-4">Hi, I am Bheki Daweti👋, a full stack developer ..</h1>
        <p className="text-lg mb-6">
            This is my personal portfolio website, please have your nose...
        </p>
          <div className="flex justify-center">
            <Image
              src={bannerImage}
              alt="meme-banner"
              className="rounded-lg w-full max-w-5xl h-auto"
              width={1000}
              height={300}
              priority
            />
          </div>
      </section>
      {/* Skills Section */}      
      <section id="skills" className="min-h-screen py-20">
        <h2 className="text-3xl font-semibold text-center mb-10">Tech Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          
          {skills.map((skill, i) => (
                <div key={i} className="p-4 border rounded-lg text-center">
                  <Image 
                        src={skill.icon} 
                        alt={skill.name} className="w-20 h-20 mx-auto mb-4" 
                        width={1000}
                        height={300}
                        priority
                      />
                        <p>{skill.name}</p>
                </div>
              ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-20 text-center">
          <h2 className="text-4xl font-bold mb-10">Projects and Clients</h2>
          <p className="max-w-3xl mx-auto mb-10">
            I&apos;m still improving and adding new features whenever new ideas pop up!
            For the full list of all my projects and my Open Source contributions, please check out my<a 
                href="https://github.com/bhekidaweti" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 hover:text-blue-700 transition-colors"> GitHub
              </a> profile.
          </p>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
            {projects.map((project, index) => (
              <div key={index} className="border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{project.summary}</p>
                <Image 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-40 object-cover cursor-pointer rounded mb-4 hover:opacity-80 transition-opacity"
                    width={1000}
                    height={300}
                    priority
                    onClick={() => setSelectedImage(project.image)}
                  />
                <div className="space-y-2">
                  {project.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 transition-colors block"
                    >
                      {link.text}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {selectedImage && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" 
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative">
                <Image 
                src={selectedImage} alt="Enlarged Project" className="rounded-lg max-w-full max-h-screen"
                width={1000}
                height={300}
                priority
                 />
                <button 
                  className="absolute top-2 right-2 text-white text-2xl"
                  onClick={() => setSelectedImage(null)}
                >
                  ✖
                </button>
              </div>
            </div>
          )}
        </section>

        
      {/* Blog Section */}
          <section id="articles" className="min-h-screen py-20 text-center">
          <h2 className="text-4xl font-bold mb-10">Articles</h2>
          <p className="max-w-3xl mx-auto mb-10">
           Some of the articles I have written and published for OpenGenus:
          </p>
          
          <div className="space-y-4">
            {articles.map((article, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 transition-colors text-lg font-semibold"
                >
                  {article.title}
                </a>
              </div>
            ))}
          </div>
        </section>
        {/* Videos Section */}
        <section id="videos" className="min-h-screen py-20 text-center">
          <h2 className="text-4xl font-bold mb-10">Youtube Content</h2>
          
          <div className="space-y-4">
            {videos.map((video, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <a
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 transition-colors text-lg font-semibold"
                >
                  {video.title}
                </a>
              </div>
            ))}
          </div>
        </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20 text-center">
        <h2 className="text-3xl font-semibold mb-10">Let&apos;s Connect</h2>
        <p className="max-w-3xl mx-auto mb-10">
          I am always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>
        <form onSubmit={handleFormSubmit} className="max-w-lg mx-auto flex flex-col gap-4">
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="New contact form message" />

          <input name="name" placeholder="Your Name" className="p-2 border dark:bg-gray-900" required />
          <input type="email" name="email" placeholder="Your Email" className="p-2 border dark:bg-gray-900" required />
          <textarea name="message" placeholder="Your Message" className="p-2 border dark:bg-gray-900" required />

          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white p-2 rounded">Send Message</button>
        </form>
      </section>
{/*      {showOverlay && (
        <div 
          className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl text-center max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Welcome</h2>
              <p className="mb-6 text-gray-800 dark:text-gray-300">Please choose where you want to go first:</p>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setShowOverlay(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded"
                >
                  Continue to main page_
                </button>

                <a href="/projects"
                className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white block"
                >
                  View projects directly_
                </a>
              </div>
            </div>
          </div>
        )
      }*/}
 

      <footer className="text-center py-4 text-sm text-gray-500 transition-colors duration-300"> 
        <div className="flex justify-center items-center gap-2">
          &copy; {new Date().getFullYear()} Bheki Daweti. All rights reserved.
          <a 
            href="https://github.com/bhekidaweti" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className="inline-block"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.111.82-.261.82-.578 0-.285-.011-1.041-.016-2.043-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.303-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.323 3.301 1.23a11.5 11.5 0 0 1 6.002 0c2.293-1.553 3.3-1.23 3.3-1.23.653 1.653.242 2.874.119 3.176.769.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.625-5.475 5.921.43.372.814 1.104.814 2.222 0 1.606-.014 2.901-.014 3.293 0 .32.218.694.825.576C20.565 21.796 24 17.298 24 12 24 5.373 18.627 0 12 0z"/>
            </svg>
          </a>
        </div>
      </footer>


    </div>
  );
}
