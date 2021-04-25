import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Nav from '../nav/nav.component';

import './homepage.styles.scss';
import completed from '../../assets/completed.svg';
import hiking from '../../assets/hiking.svg';

import { getLoggedOutMessage } from '../../redux/temporary/temporary.selectors';

const HomePage = ({ currentUser, loggedOutMessage }) => (
    <div className='homepage'>
        <Nav currentUser={currentUser} isTransparent={true} />
        <div className='homepage-container'>
            <div className='homepage-text-container'>
                {
                    !loggedOutMessage ?
                        <>
                            <h1 className='homepage-text'>Daily <br/> Achievements</h1>
                            <p className='homepage-subtext'>Achieve greatness!</p>
                        </>
                    :
                        <div>
                            <h1 className='homepage-text'>You have successfully logged out</h1>
                            <p className='homepage-subtext'>Enjoy your day!</p>
                        </div>
                }
            </div>
            <div className='graphic-container'>
                {
                    !loggedOutMessage ?
                        <img className='homepage-graphic' src={completed} alt='checklist'/>
                    :
                        <img className='homepage-graphic' src={hiking} alt='hiking'/>

                }
            </div>
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    loggedOutMessage: getLoggedOutMessage
});

export default connect(mapStateToProps)(HomePage);