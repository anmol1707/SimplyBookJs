import * as React from "react";
import Lottie from 'react-lottie';

interface Props {
}

interface State {
}

export default class LoadingComponent extends React.Component<Props, State> {
    render() {
        return (
            <div>
                <Lottie options={{
                    loop: true,
                    autoplay: true,
                    animationData: require('../assets/animation-w500-h500.json'),
                    rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice'
                    }
                }}
                        isStooped={false}
                        isPaused={false}
                        height={250}
                        width={250}/>
            </div>
        );
    }
}
