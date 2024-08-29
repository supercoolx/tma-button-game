import { Howl } from 'howler';

const Audio = {
	click: new Howl({ src: './tma-button-game/audio/click.wav'}),
	notify: new Howl({ src: './tma-button-gameaudio/notify.wav'}),
    beat: new Howl({ src: './tma-button-gameaudio/beat.wav'})
};

export default Audio;