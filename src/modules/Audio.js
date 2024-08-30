import { Howl } from 'howler';

const Audio = {
	click: new Howl({ src: './audio/click.wav'}),
	notify: new Howl({ src: './audio/notify.wav'}),
    beat: new Howl({ src: './audio/beat.wav'})
};

export default Audio;