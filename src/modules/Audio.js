import { Howl } from 'howler';

const Audio = {
	click: new Howl({ src: './audio/click.wav'}),
	reset: new Howl({ src: './audio/reset.wav'}),
	jackpot: new Howl({ src: './audio/jackpot.mp3'}),
	none: new Howl({ src: './audio/none.mp3'}),
    beat: new Howl({ src: './audio/beat.wav'})
};

export default Audio;