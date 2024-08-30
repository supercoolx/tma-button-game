import { Howl } from 'howler';

const Audio = {
	click: new Howl({ src: './tma-button-game/audio/click.wav'}),
	notify: new Howl({ src: './tma-button-game/audio/notify.wav'}),
    beat: new Howl({ src: './tma-button-game/audio/beat.wav'})
};

export default Audio;