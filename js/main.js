MOCK_URL_SOURCE = [
    "ehZqNokVylyWk",
    "hDqq4LalRAUiQ",
    "yjTccXlnh6LXW",
    "3FjEPbKqEPhPpmC8uY",
    "3ohs7NLUXtNW98mtIQ",
    "9U8wVRThbHWA8ADPa2",
    "3og0IvJaagEkDMbRi8",
];

randomItem = () => {
    return this.MOCK_URL_SOURCE[
        Math.floor(Math.random() * this.MOCK_URL_SOURCE.length)
    ];
};


const refactorProdMap = new Map([
    ['0_0', ['st01', '1']],
    ['0_1', ['st01', '2']],
    ['0_2', ['st01', '6']],
    ['0_3', ['st01', '4']],
    ['0_4', ['st01', '5']],
    ['0_5', ['st01', '3']],
    ['1_0', ['st11', '1']],
    ['1_1', ['st11', '2']],
    ['1_2', ['st11', '3']],
    ['1_3', ['st11', '4']],
    ['1_4', ['st11', '5']],
    ['1_5', ['st11', '6']],
    ['2_0', ['st02', '1']],
    ['2_1', ['st02', '2']],
    ['2_2', ['st02', '5']],
    ['2_3', ['st02', '4']],
    ['2_4', ['st02', '3']],
    ['3_0', ['wmd06_bh06', '1']],
    ['3_1', ['wmd06_bh06', '2']],
    ['3_2', ['wmd06_bh06', '3']],
    ['3_3', ['wmd06_bh06', '4']],
]);
let resolution_s = "320x182";
let resolution_lg = "586x330";



function startPlayback(video) {
    return video.play();
}

async function asyncVideo(video) {
    const awaitedVid = await startPlayback(video).then(function() {
        console.log('The play() Promise fulfilled! Rock on!');
        video.oncanplaythrough = () => video.classList.remove("is-loading");
        video.pause();
        console.log("pause из playPromise-asyncVidLoad");
    }).catch(error => {
        console.log('The play() Promise rejected!');
        console.log('Use the Play button instead.');
        console.log(error);
        // var playButton = document.querySelector('#play');
    });
};

function InsertCorrectVideo(mapVidOptions, resolution) {
    var videos = document.getElementsByTagName("video")
    var videosList = Array.prototype.slice.call(videos);

    videosList.forEach((value, ar) => {
        mapVidOptions.forEach((model, id) => {
            if (value.id == `index-${id}`) {
                // console.log(`Options -> index-${id} = value.id: ${value.id}`); 
                let video = document.getElementById(value.id);
                let vidSource = document.createElement('source');
                console.log(video.canPlayType('video/mp4'));
                console.log(video.canPlayType('video/webm'));
                if (video.canPlayType('video/mp4').length > 0) {

                    var typeVid = 'video/mp4; codecs="avc1.4D401E, mp4a.40.2"';
                    var urlVid = `https://media0.giphy.com/media/${randomItem()}/giphy.mp4`;
                    // var pathToVid = `video/${model[0]}/${resolution}/${model[1]}.mp4`;
                } else if (video.canPlayType('video/webm').length > 0) {
                    // var typeVid = 'video/webm';
                    // var pathToVid = `video/${model[0]}/${resolution}/webm/${model[1]}.webm`;
                } else {
                    var pathToVid = "";
                }
                if (video.getElementsByTagName('source').length > 0) {
                    var sourceEl = video.getElementsByTagName("source"),
                        index;
                    for (index = sourceEl.length - 1; index >= 0; index--) {
                        sourceEl[index].parentNode.removeChild(sourceEl[index]);
                    };
                }
                vidSource.setAttribute('src', urlVid);
                vidSource.setAttribute('type', typeVid);

                video.appendChild(vidSource);

                asyncVideo(video);
            }
        });
    });
}

window.onload = function() {
    InsertCorrectVideo(refactorProdMap, resolution_lg);
}




function loadVideo(model, id) {
    return new Promise((resolve, reject) => {
        console.log("my-video enter");
        var player = videojs(`video-${ model }-${ id }`, {
            controls: true,
            autoplay: true,
            preload: 'auto'
        });
        player.src([{
                type: 'video/mp4',
                src: `${path}/${id}.mp4`,
            },
            {
                type: 'video/webm',
                src: `${path}/webm/${id}.webm`,
            },
        ]);
        player.on('ready', () => {
            console.log(player);
            console.log("my-video resolve");
            resolve();
        });
        player.on('error', () => {
            console.log("my-video reject");
            reject();
        });
    });
}

// loadVideo(st01Path, 1)
//     .then(() => loadVideo(st01, 2))
//     .then(() => loadVideo(st01, 3))
//     .then(() => loadVideo(st01, 4))
//     .then(() => loadVideo(st11, 5))
//     .then(() => loadVideo(st11, 6))
//     .then(() => loadVideo(st11, 7))
//     .then(() => loadVideo(st11, 8))
//     .then(() => loadVideo(st02, 9))
//     .then(() => loadVideo(st02, 10))
//     .then(() => loadVideo(st02, 11))
//     .then(() => loadVideo(st02, 12))
//     .catch(() => {
//         console.log("Ошибка загрузки");
//     })