import React from 'react'

export default function Loading() {
    return (
        <div className='loading'>
            <div className='loading__icon'>
                <svg width="330" height="330" viewBox="0 0 330 330" >
                <g className="heart">
                    <path d="M186.5195,194.22a126.674,126.674,0,0,1-21.51,14.39c-.01,0-.01,0-.01.01,0-.01,0-.01-.01-.01-15.76-8.5-26.28-17.64-33.29-26.17-14.07-17.07-14.08-31.69-14.03-33.74v-.22c0-14.15,10.23-27.1,25.6-27.1a21.27474,21.27474,0,0,1,14.54,5.42,25.22028,25.22028,0,0,1,7.19,11.59c2.42-8.22,9.5-17.01,21.73-17.01,15.37,0,25.6,12.95,25.6,27.1v.22C212.39951,151.22,212.34946,172.58,186.5195,194.22Z" style={{ fill: '#7851a9', stroke: ' #261a35', strokeLinecap: 'round' ,strokeLinejoin: 'bevel', strokeWidth: "3px"}} />
                    <ellipse cx="197.50783" cy="134.50775" rx="4.8264" ry="8.41647" transform="translate(-37.26264 179.05553) rotate(-45)" style={{fill: '#fff', opacity: 0.7000000000000001}} />
                </g>
            </svg>
            </div>
        </div>
    )
}
