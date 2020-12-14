import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { animated, useSpring} from 'react-spring'
import CreateProject from 'components/CreateProject'

export default function PopUpModal({hide, show}: {show: boolean,  hide: () => void}) {

    const { x } = useSpring({ from: { x: 0 }, x: show ? 1 : 0, config: { duration: 200, mass: 5, tension: 350, friction: 40, precision: .1 } })

    console.log(show)
    
    return (
        <PopUpContainer
            style={{
                // @ts-ignore
                opacity: x.to({ range: [0, 1], output: [0, 1] }),
                top: x.to({ range: [0, 1], output: [-100, 100] }),
                transform: x.to(x => `scale(${x})`),
                transformOrigin:' 50% 50% 0px;',
                left: 0,
                right: 0,
                marginLeft: 'auto',
                marginRight: 'auto'
            }}
        >
            <CreateProject hide={hide} />
        </PopUpContainer>
    )
}


const PopUpContainer = styled(animated.div)`
    position: absolute;
    z-index: 5;
    border: 2px solid black;
    border-radius: 6%;
    background-color: #ffff;
    width: 70%;
    height: 70%;
`