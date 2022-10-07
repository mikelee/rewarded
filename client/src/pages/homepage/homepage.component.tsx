import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Nav from '../../components/nav/nav.component';

import './homepage.styles.scss';
import CompletedSVG from '../../components/svg-components/completed-svg.component';
import HikingSVG from '../../components/svg-components/hiking-svg.component';

import { User, ReduxState } from '../../../types';

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
                <div className='homepage-graphic'>
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

const mapStateToProps = createStructuredSelector<ReduxState, { loggedOutMessage: boolean }>({
    loggedOutMessage: getLoggedOutMessage
});

export default connect(mapStateToProps)(HomePage);