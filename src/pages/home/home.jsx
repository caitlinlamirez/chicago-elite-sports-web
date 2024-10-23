import React from 'react'
import Countdown from './Countdown'
import Carousel from 'react-bootstrap/Carousel';
import './home.css'

export const Home = () => {
  return (
    <div className='home-container'>
            <Countdown/>
            <section id="about">
                <h2>Welcome to Chicago Elite Sports</h2>
                <Carousel>
                <Carousel.Item>
                <img class="carouselimg" src="/team.jpg" alt="Summer Cup"/>
                </Carousel.Item>
            </Carousel>
                <p>Join us for a spooky night of hockey filled with fun, frights, and festivities! Costumes are encouraged!</p>
            </section>
            <section id="teams">
                <h2>Participating Teams</h2>
                <div class="team">
                    <h3>Wicked Wizards</h3>
                </div>
                <div class="team">
                    <h3>Ghostly Ghouls</h3>
                </div>
                <div class="team">
                    <h3>Spooky Spirits</h3>
                </div>
                <div class="team">
                    <h3>Vampire Vipers</h3>
                </div>
            </section>
            <section id="contact">
                <h2>Contact Us</h2>
                <p>Email: info@hockeybash.com</p>
                <p>Phone: (123) 456-7890</p>
            </section>
        </div>
  )
}
