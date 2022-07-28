const album_image = document.querySelector('.album_image'),
    song_name = document.querySelector('.song_name'),
    description = document.querySelector('.description'),
    replay_btn = document.querySelector('.replay_btn'),
    rewind_btn = document.querySelector('.rewind_btn'),
    play_btn = document.querySelector('.play_btn'),
    forward_btn = document.querySelector('.forward_btn'),
    like_btn = document.querySelector('.like_btn'),
    progress_bar_container = document.querySelector('.progress-bar-container'),
    progress_bar = document.querySelector('.progress_bar'),
    progress_time = document.querySelector('.progress_time');

const music_library = [{
        image: '1.jpg',
        name: 'Tron the legacy',
        artist: 'Daft punk',
        path: '1.mp3',
        like: "",
    },
    {
        image: '2.jpg',
        name: 'Bounty',
        artist: 'noname',
        path: '2.mp3',
        like: false,
    },
    {
        image: '3.jpg',
        name: '7.35AM HOLLYWOOD BLVD',
        artist: 'DJ YUNG VAMP',
        path: '3.mp3',
        like: true,
    },

]
const audio_tag = document.createElement('audio');
let track_id = 0;
let stop_flag = true;
audio_tag.loop = false;

let trackLoader = () => {
    audio_tag.src = `./music/${music_library[track_id].path}`
    if (music_library[track_id].image.length > 0) album_image.style = `background-image: url(./music/img/${music_library[track_id].image})`
    else album_image.style = ``
    song_name.innerHTML = music_library[track_id].name
    description.innerHTML = music_library[track_id].artist
    if (music_library[track_id].like) like_btn.style = `background-image: url(./images/like_active.svg)`
    else like_btn.style = `background-image: url(./images/likebtn.svg)`
    stop_flag = true
    const trackloop = false;
    trackloopControl(trackloop)
    playContol()
}

let playContol = () => {
    if (stop_flag) {
        audio_tag.play()
        stop_flag = false
        play_btn.style = 'background-image: url(./images/pausebtn.svg);'
    } else {
        audio_tag.pause()
        stop_flag = true
        play_btn.style = 'background-image: url(./images/playstopbtn.svg);'
    }
}
let trackloopControl = (trackloop) => {
    if (audio_tag.loop || trackloop === false) {
        audio_tag.loop = false
        replay_btn.style = `background-image: url(./images/replaybtn.svg);
        animation: none;
    -webkit-animation: none;`
    } else {
        audio_tag.loop = true
        replay_btn.style = `background-image: url(./images/replaybtnactive.svg);
        animation: 1s linear 0s normal none infinite running replay_btn;
    -webkit-animation: 1s linear 0s normal none infinite running replay_btn;`
    }
}

window.onload = () => {
    audio_tag.src = `./music/${music_library[track_id].path}`
    if (music_library[track_id].image.length > 0) album_image.style = `background-image: url(./music/img/${music_library[track_id].image})`
    song_name.innerHTML = music_library[track_id].name
    description.innerHTML = music_library[track_id].artist
};

replay_btn.addEventListener('click', () => {
    const trackloop = true;
    trackloopControl(trackloop)
})

rewind_btn.addEventListener('click', () => {
    if (track_id != 0) {
        track_id--
        trackLoader()
    }
})

play_btn.addEventListener('click', () => {
    playContol()
})


forward_btn.addEventListener('click', () => {
    if (track_id != music_library.length - 1) {
        track_id++
        trackLoader()
    } else {
        track_id = 0
        trackLoader()
    }
})

like_btn.addEventListener('click', () => {
    if (!music_library[track_id].like) {
        like_btn.style = `background-image: url(./images/like_active.svg)`
        music_library[track_id].like = true
    } else {
        like_btn.style = `background-image: url(./images/likebtn.svg)`
        music_library[track_id].like = false
    }
})

audio_tag.addEventListener('ended', () => {
    track_id++;
    trackLoader()
})


audio_tag.addEventListener("timeupdate", () => {
    let audioTime = Math.round(audio_tag.currentTime); // Получаем значение на какой секунде песня
    let audioLength = Math.round(audio_tag.duration) // Получаем всё время песни
    progress_bar.style.width = (audioTime * 100) / audioLength + '%' // Назначаем ширину элементу progress_bar
    let tt = "0";
    let min = Math.floor(audio_tag.currentTime / 60);
    let sec = Math.floor(audio_tag.currentTime - min * 60);
    if (sec < 10) {
        sec = "0" + sec;
    }
    if (min > 10) {
        tt = "";
    }
    progress_time.innerHTML = tt + min + ":" + sec;
});

progress_bar_container.addEventListener('click', (e) => {
    let progressLength = progress_bar_container.clientWidth
    let clickedOffSetX = e.offsetX
    let songDuration = audio_tag.duration
    audio_tag.currentTime = (clickedOffSetX / progressLength) * songDuration
})
















// if (audioTime == audioLength && track_id < 3) {
//     treck++; // То Увеличиваем переменную 
//     switchTreck(treck); // Меняем трек
// // Иначе проверяем тоже самое, но переменная treck больше или равна четырём
// } else if (audioTime == audioLength && treck >= 3) {
//     treck = 0; // То присваиваем treck ноль
//     switchTreck(treck); 
// }