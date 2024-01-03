// MattersThatMatter.js
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MattersThatMatter = () => {
  const handleSubscribeClick = () => {
    //   toast.success('Subscribed!');
      toast.success('You are now Subscribed!');

    // You can implement the actual subscription logic here
  };

  return (
    <div className='about'>
      <h1>Why Matters that Matter ?</h1>
      <p className='para-head'>
        How do I define MTM: A zero-crap daily news platform to keep you on top of all the relevant global issues in a minimal amount of time coz we ain’t trifling with time here!
      </p>
      
      <p>
        As much as we all love the satisfaction that comes with being aware of what's happening in the world, committing to a traditional newspaper or navigating through various platforms can be daunting. That's why I have designed "Matters that Matter," a Newsletter aiming to deliver the most important news and captivating case studies directly to your inbox in just a 5-minute read! ✨
      </p>

      <h2>What sets "Matters that Matter" apart:</h2>
      <ul>
        <li>💡 <strong>Direct and Relevant:</strong> Cut to the chase with only the most significant headlines and developments from around the globe.</li>
        <li>📊 <strong>Sunday Case Studies (exclusively for Subscribers):</strong> A deep dive into burning topics to understand various perspectives.</li>
        <li>⌛ <strong>Bite-sized Format:</strong> Maximum output in a minimal amount of time with a 5-minute read structure.</li>
        <li>📩 <strong>Seamless Accessibility:</strong> Conveniently delivered every day to your inbox, ensuring that you never miss a beat.</li>
      </ul>

      <p>
        <strong>Subscribe Now:</strong> Stay informed in just 5 minutes a day! Subscribe to "Matters that Matter" and join us in building a community of responsible and informed citizens.
      </p>
      
      <button onClick={handleSubscribeClick}>Subscribe</button>

      <p>
        Feel free to subscribe to the newsletter to get exclusive access to Sunday Stories and help create a community where we take a step towards being responsible and informed citizens of the world on a daily basis! ☀️
      </p>

      <p>
        {/* <strong>Subscribed</strong> */}
      </p>

      <p>
        P.S. Your feedback is invaluable! If you have any suggestions, please don't hesitate to reach out. Let's embark on this exciting journey of knowledge and growth together to build a better tomorrow!
      </p>
    </div>
  );
};

export default MattersThatMatter;
