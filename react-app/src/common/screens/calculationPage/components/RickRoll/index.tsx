import React from 'react';
import YouTube from 'react-youtube';
import {Modal, Typography} from '@mui/material';

function RickRoll({open}: any) {
    const videoOptions = {
        playerVars: {
            autoplay: 1,
            rel: 0,
            showinfo: 0,
            mute: 0,
            loop: 1,
        },
    };

    const style: any = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: 8,
        background: 'white',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    return (
        <Modal open={open}>
            <div style={{...style}}>
                <Typography variant="h4">HAHA YOU GOT RICKROLLED</Typography>
                <YouTube videoId={'dQw4w9WgXcQ'} opts={videoOptions} />
            </div>
        </Modal>
    );
}

export default RickRoll;
