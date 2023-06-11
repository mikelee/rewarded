import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Nav from '../../components/nav/nav.component';

import './homepage.styles.scss';
import CompletedSVG from '../../components/svg-components/completed-svg.component';
import HikingSVG from '../../components/svg-components/hiking-svg.component';

import { User } from '../../../types';

import { getLoggedOutMessage } from '../../redux/temporary/temporary.selectors';

interface OwnProps {
    currentUser: User | null
}

interface StateProps {
    loggedOutMessage: boolean
}

type Props = OwnProps & StateProps;

const HomePage: React.FC<Props> = ({ currentUser, loggedOutMessage }) => (
    <div className='homepage'>
        <Nav currentUser={currentUser} isTransparent={true} />
        <div className='slant-background-container'>
            <div className='slant-background'></div>
        </div>
            <div className='content'>
                <div className='text-container'>
                    {
                        !loggedOutMessage ?
                            <>
                                <h1 className='text'>Rewarded</h1>
                                <p className='subtext'>Achieve greatness!</p>
                            </>
                        :
                            <>
                                <h1 className='text'>You have successfully logged out</h1>
                                <p className='subtext'>Enjoy your day!</p>
                            </>
                    }
                </div>
                <div className='graphic-container'>
                    <div className='graphic'>
                        {
                            !loggedOutMessage ?
                            <CompletedSVG />
                            :
                            <HikingSVG />
                        }
                    </div>
                </div>
            </div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    loggedOutMessage: getLoggedOutMessage
});

export default connect(mapStateToProps)(HomePage);