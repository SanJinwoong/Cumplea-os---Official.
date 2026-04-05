import Phaser from 'phaser'
import './style.css'

class BaseScene extends Phaser.Scene {
  constructor() {
    super('BaseScene')
  }

  create() {
    this.cameras.main.setBackgroundColor('#101820')
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'app',
  width: 2000,
  height: 1562,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [BaseScene],
}

new Phaser.Game(config)

const app = document.querySelector('#app')

const giftIntroOverlay = document.createElement('div')
giftIntroOverlay.className = 'gift-intro-overlay'
giftIntroOverlay.innerHTML = `
  <button class="gift-intro-button" type="button" aria-label="Abrir regalo">
    <img class="gift-intro-image" src="/assets/videos/intro/abreme.png" alt="Abreme" draggable="false" />
  </button>
`

app.appendChild(giftIntroOverlay)

const ROOM_PLAYER_SPEED_PX_PER_SEC = 420
const ROOM_PLAYER_WALK_ANIMATION_STEP_MS = 120
const ROOM_PLAYER_WALK_FRAME_SEQUENCE = ['base', 'step1', 'base', 'step2']
const ROOM_PLAYER_COLLISION_SWEEP_STEP_PX = 6
const ROOM_ENTRY_ZOOM_HOLD_MS = 2000
const ROOM_ENTRY_ZOOM_RELEASE_DURATION_MS = 1500
const ROOM_ENTRY_WHITE_VISIBLE_MS = 980
const ROOM_LETTERS_TO_FIND = 3
const ROOM_LETTER_INTERACT_DISTANCE_PX = 90
const ROOM_EXIT_ZONE_PADDING_PX = 26
const ROOM_LETTER_CLOSED_IMAGE = '/assets/images/clothing/accessories/CARTA CERRADA.PNG'
const ROOM_LETTER_OPEN_IMAGE = '/assets/images/clothing/accessories/CARTA ABIERTA.PNG'
const ROOM_ENDING_VIDEO_SOURCE = '/assets/images/backgrounds/ending/FINAL.mp4'
const ROOM_LETTER_MESSAGES = {
  1: `Lala tqm, la neta eres una increible amiga y persona, amo q seas socialmente conciente de muchas cosas, q siempre estes dispuesta a dar la razon si alguien la tiene, a disculparte o ayudar en lo que alguien necesite, y por sobretodo amo q seas lesbianichis, oye lala si tu y yo...
Dibujas increible aunque no lo quieras aceptar, esta semana es santa gracias a ti beba, deseo mucho q te sigas rodeando de personas que te merezcan w, te encargo checar eso, cualquier cosa ya sabes que estoy aqui amenos que este en medio de un sesuachis w, el sesuachis c respeta w
Atte.: jojolove`,
  2: `Lala feliz cum espero y no te hayas enojado por no felicitarte en tu cum, ni en el grupo sinceramente odio a las personas que piden que las feliciten o que le den su regalo, no lo se es algo que me irrita pq siento que exigen cuando asi no funciona las cosas uk, y tambien para molestarte por lo de ale o como se llame ni la topo w, gracias por jugar conmigo aprecio el tiempo que pasamos, siento que res la mejor para jugar cualquier juego uwu, asi que solo pensare en ti cada que quiera entrarle a un nuevo juego, pq para las otras cosas no owO, este es la primera vez que le hago un programa para alguien, asi que aprecialo pq esto cobraria una persona de programacion que hasta te regale un dominio que cuesta para subirte en las redes pero buee, no entenderias todas las noche que pase para esto para que luego te quejes que no hago lo mismo que tu bruh, pero bueno solo disfruta pq de mi parte no vas a recibir otro regalo JAJAJA (ojoconesow) nada tqm si llego a distanciarme no te sorprendas la neta ya di mi todo contigo y no te dais cuenta.
att :shunwoochin`,
  3: `ola w no mande mis deseo w sigo siendo shunwoo pero escriubiendo como si fuera evo w jaja lol que pedo w att evo : omg yetsbeiib`,
}

const ROOM_PLAYER_SPRITES = {
  up: {
    base: '/assets/images/character/base/personaje arriba.png',
    step1: '/assets/images/character/base/personaje arriba 1.png',
    step2: '/assets/images/character/base/personaje arriba 2.png',
  },
  down: {
    base: '/assets/images/character/base/personaje abajo.png',
    step1: '/assets/images/character/base/personaje abajo 1.png',
    step2: '/assets/images/character/base/personaje abajo 2.png',
  },
  left: {
    base: '/assets/images/character/base/personaje izquierda.png',
    step1: '/assets/images/character/base/personaje izquierda 1.png',
    step2: '/assets/images/character/base/personaje izquierda 2.png',
  },
  right: {
    base: '/assets/images/character/base/personaje derecha.png',
    step1: '/assets/images/character/base/personaje derecha 1.png',
    step2: '/assets/images/character/base/personaje derecha 2.png',
  },
}

const introOverlay = document.createElement('div')
introOverlay.className = 'intro-overlay is-gift-locked'
introOverlay.innerHTML = `
  <video class="intro-video" muted playsinline preload="auto">
    <source src="/assets/videos/intro/intro.mp4" type="video/mp4" />
  </video>
  <div class="intro-white-fade" aria-hidden="true"></div>
  <h1 class="intro-title">the<br />Birthday<br />of lala</h1>
  <button class="start-button" id="start-button" type="button">Start</button>
`

app.appendChild(introOverlay)

const introVideo = introOverlay.querySelector('.intro-video')
const whiteFade = introOverlay.querySelector('.intro-white-fade')
const startButton = introOverlay.querySelector('#start-button')
const hoverSound = new Audio('/assets/videos/intro/hoversound.m4a')
const clickSound = new Audio('/assets/videos/intro/clicksound.m4a')
const secondSceneButtonClickSound = new Audio('/assets/videos/intro/boton click el 2do.m4a')
const backgroundMusic = new Audio('/assets/videos/intro/background.m4a')
const introStartSound = new Audio('/assets/images/backgrounds/wardrobe/introsonido.mp3')
const scene2Music = new Audio('/assets/images/backgrounds/ending/escena 2 sonido.m4a')
const scene3Music = new Audio('/assets/images/backgrounds/ending/escena 3 sonido.m4a')
const characterHoverSounds = {
  evo: new Audio('/assets/images/backgrounds/wardrobe/evosonido.m4a'),
  jojolop: new Audio('/assets/images/backgrounds/wardrobe/jojolopsonido.m4a'),
  shun: new Audio('/assets/images/backgrounds/wardrobe/shunsonido.m4a'),
}

hoverSound.preload = 'auto'
clickSound.preload = 'auto'
secondSceneButtonClickSound.preload = 'auto'
backgroundMusic.preload = 'auto'
introStartSound.preload = 'auto'
scene2Music.preload = 'auto'
scene3Music.preload = 'auto'
hoverSound.volume = 1
clickSound.volume = 1
secondSceneButtonClickSound.volume = 1
backgroundMusic.volume = 0.6
backgroundMusic.loop = true
introStartSound.volume = 0.7
introStartSound.loop = true
scene2Music.volume = 0.72
scene2Music.loop = true
scene3Music.volume = 0.72
scene3Music.loop = true

Object.values(characterHoverSounds).forEach((audio) => {
  audio.preload = 'auto'
  audio.volume = 1
})

let isAudioUnlocked = false
let hasStartedIntroSound = false
let hasOpenedGift = false

const playIntroStartSound = () => {
  if (!hasOpenedGift || isIntroClosed || hasStartedIntroSound) {
    return
  }

  hasStartedIntroSound = true
  introStartSound.currentTime = 0
  introStartSound.play().catch(() => {
    hasStartedIntroSound = false
  })
}

const stopIntroStartSound = () => {
  introStartSound.pause()
  introStartSound.currentTime = 0
}

const stopLoopAudio = (audio) => {
  audio.pause()
  audio.currentTime = 0
}

const playLoopAudio = (audio) => {
  if (!isAudioUnlocked) {
    return
  }

  if (!audio.paused) {
    return
  }

  audio.currentTime = 0
  audio.play().catch(() => {
    // Ignore blocked playback errors from strict browser policies.
  })
}

const stopAllBackgroundAudio = () => {
  ;[backgroundMusic, introStartSound, scene2Music, scene3Music].forEach(stopLoopAudio)
}

const unlockAudio = () => {
  if (isAudioUnlocked) {
    return
  }

  isAudioUnlocked = true

  ;[
    hoverSound,
    clickSound,
    secondSceneButtonClickSound,
    backgroundMusic,
    scene2Music,
    scene3Music,
    ...Object.values(characterHoverSounds),
  ].forEach((audio) => {
    audio.muted = true
    audio.play()
      .then(() => {
        audio.pause()
        audio.currentTime = 0
      })
      .catch(() => {
        // Ignore unlock failures on browsers with stricter policies.
      })
      .finally(() => {
        audio.muted = false
      })
  })

  if (!isIntroClosed) {
    playIntroStartSound()
  }
}

document.addEventListener('pointerdown', unlockAudio, { once: true })
document.addEventListener('keydown', unlockAudio, { once: true })

const playSound = (audio) => {
  if (!isAudioUnlocked) {
    return
  }

  audio.currentTime = 0
  audio.play().catch(() => {
    // Ignore blocked playback errors from strict browser policies.
  })
}

let isIntroClosed = false
let isHoverActive = false

let hasRevealedContent = false

const revealIntroContent = () => {
  if (hasRevealedContent || !hasOpenedGift) {
    return
  }

  hasRevealedContent = true
  introOverlay.classList.add('is-revealed')

  // If the button appears under a cursor that is already in place,
  // trigger hover audio once so the principal screen feels responsive.
  if (startButton.matches(':hover')) {
    handleStartHover()
  }
}

introVideo.addEventListener('play', () => {
  window.setTimeout(revealIntroContent, 1800)
}, { once: true })

// Fallback in case the play event timing differs across browsers.
window.setTimeout(revealIntroContent, 2200)

const handleGiftIntroClick = () => {
  if (hasOpenedGift) {
    return
  }

  hasOpenedGift = true
  unlockAudio()
  playIntroStartSound()

  introOverlay.classList.remove('is-gift-locked')
  giftIntroOverlay.classList.add('is-opening')

  introVideo.currentTime = 0
  introVideo.play().catch(() => {
    // Ignore blocked playback errors from strict browser policies.
  })

  window.setTimeout(() => {
    giftIntroOverlay.remove()
  }, 520)
}

const giftIntroButton = giftIntroOverlay.querySelector('.gift-intro-button')
if (giftIntroButton instanceof HTMLButtonElement) {
  giftIntroButton.addEventListener('click', handleGiftIntroClick)
}

const handleStartHover = () => {
  if (isIntroClosed || isHoverActive) {
    return
  }

  isHoverActive = true
  playSound(hoverSound)
}

const resetHoverState = () => {
  isHoverActive = false
}

const handleStartClick = () => {
  if (isIntroClosed) {
    return
  }

  unlockAudio()
  isIntroClosed = true
  stopIntroStartSound()
  playSound(clickSound)
  startButton.disabled = true
  startButton.removeEventListener('mouseenter', handleStartHover)
  startButton.removeEventListener('pointerenter', handleStartHover)
  startButton.removeEventListener('mousemove', handleStartHover)
  startButton.removeEventListener('mouseleave', resetHoverState)
  startButton.removeEventListener('pointerleave', resetHoverState)
  startButton.removeEventListener('click', handleStartClick)

  introOverlay.classList.add('is-transitioning', 'is-zooming')

  // Stage 1: brief zoom into intro video, then wash to white.
  window.setTimeout(() => {
    introOverlay.classList.add('is-white')
  }, 350)

  // Stage 2: switch to loading cinematic once the white fade fully covers screen.
  window.setTimeout(() => {
    introOverlay.classList.add('is-loading')
    introVideo.src = '/assets/videos/intro/cargando.mp4'
    introVideo.currentTime = 0
    stopLoopAudio(backgroundMusic)
    introVideo.play().catch(() => {
      // Ignore blocked playback errors from strict browser policies.
    })
    introOverlay.classList.remove('is-zooming')

    // Reveal loading video from white.
    window.setTimeout(() => {
      introOverlay.classList.remove('is-white')
    }, 120)
  }, 1250)

  let hasStartedFinalFade = false
  let roomPlayerController = null
  let roomPlayerPositionPercent = { x: 50, y: 50 }
  let roomLettersState = []
  let nearestRoomLetterId = null
  let roomOverlayOpen = false
  let hasCompletedRoomLetters = false
  let hasTriggeredRoomExit = false
  let isRoomGameplayActive = false
  let roomEntryZoomTimeoutId = 0
  let roomEntryWhiteFadeTimeoutId = 0

  const ensureWardrobeLayer = () => {
    let layer = app.querySelector('.wardrobe-bg-layer')

    if (!layer) {
      layer = document.createElement('div')
      layer.className = 'wardrobe-bg-layer'
      app.prepend(layer)
    }

    return layer
  }

  const ensureWardrobeBodyLayer = () => {
    let bodyLayer = app.querySelector('.wardrobe-body-layer')

    if (!bodyLayer) {
      bodyLayer = document.createElement('div')
      bodyLayer.className = 'wardrobe-body-layer'
      app.appendChild(bodyLayer)
    }

    return bodyLayer
  }

  const ensureWardrobeSideCharactersLayer = () => {
    let sideCharactersLayer = app.querySelector('.wardrobe-side-characters-layer')

    if (!sideCharactersLayer) {
      sideCharactersLayer = document.createElement('div')
      sideCharactersLayer.className = 'wardrobe-side-characters-layer'
      sideCharactersLayer.innerHTML = `
        <div class="wardrobe-side-character is-evo" data-character="evo" role="img" aria-label="Evo" tabindex="0">
          <img class="wardrobe-side-character-portrait" src="/assets/images/backgrounds/wardrobe/evo(1).png" alt="Evo" draggable="false" />
          <img class="wardrobe-side-speech" src="/assets/images/backgrounds/wardrobe/evo speech.gif" alt="" aria-hidden="true" draggable="false" />
        </div>
        <div class="wardrobe-side-character is-jojolop" data-character="jojolop" role="img" aria-label="Jojolop" tabindex="0">
          <img class="wardrobe-side-character-portrait" src="/assets/images/backgrounds/wardrobe/jojolop(1).png" alt="Jojolop" draggable="false" />
          <img class="wardrobe-side-speech" src="/assets/images/backgrounds/wardrobe/jojolop speech.gif" alt="" aria-hidden="true" draggable="false" />
        </div>
        <div class="wardrobe-side-character is-shun" data-character="shun" role="img" aria-label="Shun" tabindex="0">
          <img class="wardrobe-side-character-portrait" src="/assets/images/backgrounds/wardrobe/shun(1).png" alt="Shun" draggable="false" />
          <img class="wardrobe-side-speech" src="/assets/images/backgrounds/wardrobe/shun speech.gif" alt="" aria-hidden="true" draggable="false" />
        </div>
      `
      app.appendChild(sideCharactersLayer)
    }

    if (sideCharactersLayer.dataset.hoverSoundReady !== 'true') {
      sideCharactersLayer.dataset.hoverSoundReady = 'true'

      sideCharactersLayer.querySelectorAll('.wardrobe-side-character').forEach((characterElement) => {
        const characterId = characterElement.dataset.character
        const characterSound = characterId ? characterHoverSounds[characterId] : null

        if (!characterSound) {
          return
        }

        characterElement.addEventListener('mouseenter', () => {
          playSound(characterSound)
        })

        characterElement.addEventListener('focus', () => {
          playSound(characterSound)
        })
      })
    }

    return sideCharactersLayer
  }

  const setWardrobeSideCharacterInteractivity = (sideCharactersLayer, enabled) => {
    if (!sideCharactersLayer) {
      return
    }

    sideCharactersLayer.classList.toggle('is-disabled', !enabled)

    sideCharactersLayer.querySelectorAll('.wardrobe-side-character').forEach((characterElement) => {
      characterElement.setAttribute('tabindex', enabled ? '0' : '-1')
    })
  }

  const setupWardrobeBlinkLoop = (bodyLayer) => {
    if (!bodyLayer || bodyLayer.dataset.blinkReady === 'true') {
      return
    }

    bodyLayer.dataset.blinkReady = 'true'

    // Preload blink frame so the first blink does not pop or disappear.
    const blinkFrameImage = new Image()
    blinkFrameImage.src = '/assets/images/character/base/laladurmiendo.png'

    const triggerBlink = () => {
      bodyLayer.classList.add('is-blinking')

      // Keep the closed-eyes frame very short so it reads as a blink.
      window.setTimeout(() => {
        bodyLayer.classList.remove('is-blinking')
      }, 130)

      const nextDelay = 2500 + Math.random() * 2300
      window.setTimeout(triggerBlink, nextDelay)
    }

    const initialDelay = 1200 + Math.random() * 1200
    window.setTimeout(triggerBlink, initialDelay)
  }

  const ensureWardrobeOutfitLayer = () => {
    let outfitLayer = app.querySelector('.wardrobe-outfit-layer')

    if (!outfitLayer) {
      outfitLayer = document.createElement('div')
      outfitLayer.className = 'wardrobe-outfit-layer'
      outfitLayer.innerHTML = `
        <div class="wardrobe-outfit-column is-set-2" data-set="2" aria-hidden="true">
          <div class="wardrobe-outfit-slot is-top" data-part="top" data-item-id="set-2-top"></div>
          <div class="wardrobe-outfit-slot is-middle" data-part="middle" data-item-id="set-2-middle"></div>
          <div class="wardrobe-outfit-slot is-bottom" data-part="bottom" data-item-id="set-2-bottom"></div>
        </div>
        <div class="wardrobe-outfit-column is-set-1" data-set="1" aria-hidden="true">
          <div class="wardrobe-outfit-slot is-top" data-part="top" data-item-id="set-1-top"></div>
          <div class="wardrobe-outfit-slot is-middle" data-part="middle" data-item-id="set-1-middle"></div>
          <div class="wardrobe-outfit-slot is-bottom" data-part="bottom" data-item-id="set-1-bottom"></div>
        </div>
        <div class="wardrobe-outfit-column is-set-3" data-set="3" aria-hidden="true">
          <div class="wardrobe-outfit-slot is-top" data-part="top" data-item-id="set-3-top"></div>
          <div class="wardrobe-outfit-slot is-middle" data-part="middle" data-item-id="set-3-middle"></div>
          <div class="wardrobe-outfit-slot is-bottom" data-part="bottom" data-item-id="set-3-bottom"></div>
        </div>
      `
      app.appendChild(outfitLayer)
    }

    return outfitLayer
  }

  const ensureWardrobeCharacterOutfitLayer = () => {
    let characterOutfitLayer = app.querySelector('.wardrobe-character-outfit-layer')

    if (!characterOutfitLayer) {
      characterOutfitLayer = document.createElement('div')
      characterOutfitLayer.className = 'wardrobe-character-outfit-layer'
      app.appendChild(characterOutfitLayer)
    }

    return characterOutfitLayer
  }

  const ensureRoomBgLayer = () => {
    let roomLayer = app.querySelector('.room-bg-layer')

    if (!roomLayer) {
      roomLayer = document.createElement('div')
      roomLayer.className = 'room-bg-layer'
      app.appendChild(roomLayer)
    }

    return roomLayer
  }

  const ensureRoomFrameLayer = () => {
    let roomFrameLayer = app.querySelector('.room-frame-layer')

    if (!roomFrameLayer) {
      roomFrameLayer = document.createElement('div')
      roomFrameLayer.className = 'room-frame-layer'
      app.appendChild(roomFrameLayer)
    }

    return roomFrameLayer
  }

  const ensureRoomFurnitureBackLayer = () => {
    let roomBackLayer = app.querySelector('.room-furniture-back-layer')

    if (!roomBackLayer) {
      roomBackLayer = document.createElement('div')
      roomBackLayer.className = 'room-furniture-back-layer'
      app.appendChild(roomBackLayer)
    }

    return roomBackLayer
  }

  const ensureRoomFurnitureBackItemsLayer = () => {
    let roomBackItemsLayer = app.querySelector('.room-furniture-back-items-layer')

    if (!roomBackItemsLayer) {
      roomBackItemsLayer = document.createElement('div')
      roomBackItemsLayer.className = 'room-furniture-back-items-layer'
      app.appendChild(roomBackItemsLayer)
    }

    roomBackItemsLayer.innerHTML = `
      <div class="room-furniture-back-item is-1" aria-hidden="true"></div>
      <div class="room-furniture-back-item is-2" aria-hidden="true"></div>
      <div class="room-furniture-back-item is-3" aria-hidden="true"></div>
    `

    return roomBackItemsLayer
  }

  const ensureRoomLettersLayer = () => {
    let roomLettersLayer = app.querySelector('.room-letters-layer')

    if (!roomLettersLayer) {
      roomLettersLayer = document.createElement('div')
      roomLettersLayer.className = 'room-letters-layer'
      app.appendChild(roomLettersLayer)
    }

    return roomLettersLayer
  }

  const ensureRoomObjectiveLayer = () => {
    let objectiveLayer = app.querySelector('.room-objective-layer')

    if (!objectiveLayer) {
      objectiveLayer = document.createElement('div')
      objectiveLayer.className = 'room-objective-layer'
      objectiveLayer.innerHTML = `
        <p class="room-objective-text"></p>
        <p class="room-interact-hint" aria-live="polite"></p>
      `
      app.appendChild(objectiveLayer)
    }

    return objectiveLayer
  }

  const ensureRoomLetterOverlay = () => {
    let letterOverlay = app.querySelector('.room-letter-overlay')

    if (!letterOverlay) {
      letterOverlay = document.createElement('div')
      letterOverlay.className = 'room-letter-overlay'
      letterOverlay.innerHTML = `
        <div class="room-letter-modal" role="dialog" aria-modal="true" aria-label="Carta abierta">
          <button class="room-letter-close" type="button" aria-label="Cerrar carta">x</button>
          <img class="room-letter-open-image" src="${ROOM_LETTER_OPEN_IMAGE}" alt="Carta abierta" draggable="false" />
          <p class="room-letter-body" aria-live="polite"></p>
        </div>
      `
      app.appendChild(letterOverlay)
    }

    return letterOverlay
  }

  const ensureRoomExitIndicator = () => {
    let exitIndicator = app.querySelector('.room-exit-indicator')

    if (!exitIndicator) {
      exitIndicator = document.createElement('div')
      exitIndicator.className = 'room-exit-indicator'
      exitIndicator.innerHTML = '<span class="room-exit-indicator-dot" aria-hidden="true"></span>'
      app.appendChild(exitIndicator)
    }

    return exitIndicator
  }

  const ensureRoomExitTransition = () => {
    let transitionLayer = app.querySelector('.room-exit-transition-layer')

    if (!transitionLayer) {
      transitionLayer = document.createElement('div')
      transitionLayer.className = 'room-exit-transition-layer'
      app.appendChild(transitionLayer)
    }

    return transitionLayer
  }

  const ensureRoomEndingOverlay = () => {
    let endingOverlay = app.querySelector('.room-ending-overlay')

    if (!endingOverlay) {
      endingOverlay = document.createElement('div')
      endingOverlay.className = 'room-ending-overlay'
      endingOverlay.innerHTML = `
        <video class="room-ending-video" playsinline preload="auto" aria-label="Ending">
          <source src="${ROOM_ENDING_VIDEO_SOURCE}" type="video/mp4" />
        </video>
      `
      app.appendChild(endingOverlay)
    }

    return endingOverlay
  }

  const startRoomEndingVideo = () => {
    const endingOverlay = ensureRoomEndingOverlay()
    const endingVideo = endingOverlay.querySelector('.room-ending-video')
    const transitionLayer = ensureRoomExitTransition()

    if (!(endingVideo instanceof HTMLVideoElement)) {
      return
    }

    endingVideo.controls = false
    endingVideo.loop = false
    endingVideo.playsInline = true
    endingOverlay.classList.add('is-visible')
    endingVideo.currentTime = 0
    endingVideo.play().catch(() => {
      // Ignore autoplay blocks on strict browsers.
    })

    window.setTimeout(() => {
      transitionLayer.classList.remove('is-visible')
    }, 120)
  }

  const getFoundLettersCount = () => roomLettersState.filter((entry) => entry.found).length

  const updateRoomObjectiveUi = () => {
    const objectiveLayer = ensureRoomObjectiveLayer()
    const objectiveText = objectiveLayer.querySelector('.room-objective-text')
    const interactHint = objectiveLayer.querySelector('.room-interact-hint')

    if (!(objectiveText instanceof HTMLElement) || !(interactHint instanceof HTMLElement)) {
      return
    }

    const foundCount = getFoundLettersCount()

    if (foundCount >= ROOM_LETTERS_TO_FIND) {
      objectiveText.textContent = 'Feliz cumpleaños, dirigete a la salida.'
      objectiveLayer.classList.add('is-complete')
    } else {
      objectiveText.textContent = `Busca las (${foundCount}/${ROOM_LETTERS_TO_FIND}) cartas escondidas en el cuarto.`
      objectiveLayer.classList.remove('is-complete')
    }

    if (nearestRoomLetterId !== null && !roomOverlayOpen && foundCount < ROOM_LETTERS_TO_FIND) {
      interactHint.textContent = 'Presiona F para leer la carta.'
      interactHint.classList.add('is-visible')
    } else {
      interactHint.textContent = ''
      interactHint.classList.remove('is-visible')
    }
  }

  const setRoomExitIndicatorVisibility = (visible) => {
    const exitIndicator = ensureRoomExitIndicator()
    exitIndicator.classList.toggle('is-visible', visible)
  }

  const triggerRoomExitTransition = () => {
    if (hasTriggeredRoomExit) {
      return
    }

    hasTriggeredRoomExit = true
    isRoomGameplayActive = false
    roomPlayerController?.deactivate()
    stopAllBackgroundAudio()

    const transitionLayer = ensureRoomExitTransition()
    transitionLayer.classList.add('is-visible')
    app.classList.add('is-room-exit-zoom')

    window.setTimeout(() => {
      startRoomEndingVideo()
    }, 1150)
  }

  const updateRoomLetterProximity = () => {
    if (!isRoomGameplayActive) {
      nearestRoomLetterId = null
      updateRoomObjectiveUi()
      return
    }

    const appRect = app.getBoundingClientRect()
    if (!appRect.width || !appRect.height) {
      return
    }

    const playerViewportX = appRect.left + (appRect.width * roomPlayerPositionPercent.x) / 100
    const playerViewportY = appRect.top + (appRect.height * roomPlayerPositionPercent.y) / 100

    let closestId = null
    let closestDistance = Number.POSITIVE_INFINITY

    roomLettersState.forEach((letterEntry) => {
      if (letterEntry.found) {
        return
      }

      const letterRect = letterEntry.element.getBoundingClientRect()
      const centerX = letterRect.left + letterRect.width / 2
      const centerY = letterRect.top + letterRect.height / 2
      const distance = Math.hypot(centerX - playerViewportX, centerY - playerViewportY)

      if (distance < closestDistance) {
        closestDistance = distance
        closestId = letterEntry.id
      }
    })

    nearestRoomLetterId = closestDistance <= ROOM_LETTER_INTERACT_DISTANCE_PX ? closestId : null

    const foundCount = getFoundLettersCount()
    if (foundCount >= ROOM_LETTERS_TO_FIND) {
      hasCompletedRoomLetters = true
      setRoomExitIndicatorVisibility(true)
    }

    if (hasCompletedRoomLetters) {
      const exitIndicator = ensureRoomExitIndicator()
      const exitRect = exitIndicator.getBoundingClientRect()
      const isAtExitZone =
        playerViewportX >= exitRect.left - ROOM_EXIT_ZONE_PADDING_PX &&
        playerViewportX <= exitRect.right + ROOM_EXIT_ZONE_PADDING_PX &&
        playerViewportY >= exitRect.top - ROOM_EXIT_ZONE_PADDING_PX &&
        playerViewportY <= exitRect.bottom + ROOM_EXIT_ZONE_PADDING_PX

      if (isAtExitZone) {
        triggerRoomExitTransition()
      }
    }

    updateRoomObjectiveUi()
  }

  const openRoomLetterOverlay = (letterId) => {
    const overlay = ensureRoomLetterOverlay()
    const letterBody = overlay.querySelector('.room-letter-body')
    if (letterBody instanceof HTMLElement) {
      letterBody.textContent = ROOM_LETTER_MESSAGES[letterId] || ''
    }

    overlay.classList.add('is-visible')
    roomOverlayOpen = true
    updateRoomObjectiveUi()
  }

  const closeRoomLetterOverlay = () => {
    const overlay = ensureRoomLetterOverlay()
    overlay.classList.remove('is-visible')
    roomOverlayOpen = false
    updateRoomLetterProximity()
    updateRoomObjectiveUi()
  }

  const collectRoomLetter = (letterId) => {
    const letterEntry = roomLettersState.find((entry) => entry.id === letterId)
    if (!letterEntry || letterEntry.found) {
      return
    }

    letterEntry.found = true
    letterEntry.element.classList.add('is-found')

    if (getFoundLettersCount() >= ROOM_LETTERS_TO_FIND) {
      hasCompletedRoomLetters = true
      setRoomExitIndicatorVisibility(true)
    }

    nearestRoomLetterId = null
    openRoomLetterOverlay(letterId)
    updateRoomObjectiveUi()
  }

  const setupRoomLetterHunt = () => {
    const lettersLayer = ensureRoomLettersLayer()

    lettersLayer.innerHTML = `
      <div class="room-letter-item is-1" data-letter-id="1" aria-hidden="true"></div>
      <div class="room-letter-item is-2" data-letter-id="2" aria-hidden="true"></div>
      <div class="room-letter-item is-3" data-letter-id="3" aria-hidden="true"></div>
    `

    roomLettersState = Array.from(lettersLayer.querySelectorAll('.room-letter-item')).map((element) => ({
      id: Number(element.dataset.letterId),
      element,
      found: false,
    }))

    nearestRoomLetterId = null
    roomOverlayOpen = false
    hasCompletedRoomLetters = false
    hasTriggeredRoomExit = false
    setRoomExitIndicatorVisibility(false)
    ensureRoomObjectiveLayer().classList.add('is-visible')
    closeRoomLetterOverlay()
    updateRoomObjectiveUi()
  }

  const roomLetterOverlay = ensureRoomLetterOverlay()
  const roomLetterCloseButton = roomLetterOverlay.querySelector('.room-letter-close')

  if (roomLetterCloseButton instanceof HTMLButtonElement && roomLetterOverlay.dataset.closeReady !== 'true') {
    roomLetterOverlay.dataset.closeReady = 'true'
    roomLetterCloseButton.addEventListener('click', closeRoomLetterOverlay)
    roomLetterOverlay.addEventListener('click', (event) => {
      if (event.target === roomLetterOverlay) {
        closeRoomLetterOverlay()
      }
    })
  }

  if (app.dataset.roomLetterInputReady !== 'true') {
    app.dataset.roomLetterInputReady = 'true'

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape' && roomOverlayOpen) {
        closeRoomLetterOverlay()
        return
      }

      if (event.code !== 'KeyF' || !isRoomGameplayActive || roomOverlayOpen || nearestRoomLetterId === null) {
        return
      }

      event.preventDefault()
      collectRoomLetter(nearestRoomLetterId)
    })
  }

  const ensureRoomFurnitureFrontLayer = () => {
    let roomFrontLayer = app.querySelector('.room-furniture-front-layer')

    if (!roomFrontLayer) {
      roomFrontLayer = document.createElement('div')
      roomFrontLayer.className = 'room-furniture-front-layer'
      app.appendChild(roomFrontLayer)
    }

    return roomFrontLayer
  }

  const ensureRoomPlayerLayer = () => {
    let roomPlayerLayer = app.querySelector('.room-player-layer')

    if (!roomPlayerLayer) {
      roomPlayerLayer = document.createElement('div')
      roomPlayerLayer.className = 'room-player-layer'
      roomPlayerLayer.innerHTML = `
        <img
          class="room-player-sprite"
          src="${ROOM_PLAYER_SPRITES.down.base}"
          alt="Player"
          draggable="false"
        />
      `
      app.appendChild(roomPlayerLayer)
    }

    return roomPlayerLayer
  }

  const setupRoomPlayerController = (roomPlayerLayer, isBlockedAtPercent, onPositionUpdated) => {
    if (!roomPlayerLayer) {
      return null
    }

    const spriteElement = roomPlayerLayer.querySelector('.room-player-sprite')

    if (!(spriteElement instanceof HTMLImageElement)) {
      return null
    }

    const pressedKeys = new Set()
    const directionByKeyCode = {
      KeyW: 'up',
      KeyA: 'left',
      KeyS: 'down',
      KeyD: 'right',
    }

    let isActive = false
    let positionXPercent = 50
    let positionYPercent = 50
    let lastDirection = 'down'
    let lastFrameVariant = 'base'
    let walkFrameIndex = 0
    let walkFrameElapsedMs = 0
    let wasMoving = false
    let animationFrameId = 0
    let previousTimestamp = 0

    const setSpriteFrame = (direction, frameVariant) => {
      const directionSprites = ROOM_PLAYER_SPRITES[direction]
      const frameSource = directionSprites?.[frameVariant]

      if (!frameSource) {
        return
      }

      lastDirection = direction
      lastFrameVariant = frameVariant
      if (spriteElement.src.endsWith(frameSource)) {
        return
      }

      spriteElement.src = frameSource
    }

    const resetWalkCycle = () => {
      walkFrameIndex = 0
      walkFrameElapsedMs = 0
    }

    const setIdleDownFrame = () => {
      resetWalkCycle()
      setSpriteFrame('down', 'base')
    }

    const applyPosition = () => {
      roomPlayerLayer.style.setProperty('--room-player-x', `${positionXPercent}%`)
      roomPlayerLayer.style.setProperty('--room-player-y', `${positionYPercent}%`)
      onPositionUpdated?.(positionXPercent, positionYPercent)
    }

    const getClampedPosition = (xPercent, yPercent) => {
      const appRect = app.getBoundingClientRect()
      if (!appRect.width || !appRect.height) {
        return { x: xPercent, y: yPercent }
      }

      const halfWidthPercent = ((roomPlayerLayer.offsetWidth * 0.5) / appRect.width) * 100
      const fullHeightPercent = (roomPlayerLayer.offsetHeight / appRect.height) * 100

      return {
        x: Math.max(halfWidthPercent, Math.min(100 - halfWidthPercent, xPercent)),
        y: Math.max(fullHeightPercent, Math.min(100, yPercent)),
      }
    }

    const clampPositionToViewport = () => {
      const clamped = getClampedPosition(positionXPercent, positionYPercent)
      positionXPercent = clamped.x
      positionYPercent = clamped.y
    }

    const resetToCenter = () => {
      positionXPercent = 50
      positionYPercent = 50
      wasMoving = false
      setIdleDownFrame()
      clampPositionToViewport()
      applyPosition()
    }

    const moveWithCollisionSweep = (targetXPercent, targetYPercent) => {
      const appRect = app.getBoundingClientRect()
      if (!appRect.width || !appRect.height) {
        positionXPercent = targetXPercent
        positionYPercent = targetYPercent
        return
      }

      const deltaXPercent = targetXPercent - positionXPercent
      const deltaYPercent = targetYPercent - positionYPercent
      const deltaXPx = (deltaXPercent / 100) * appRect.width
      const deltaYPx = (deltaYPercent / 100) * appRect.height
      const maxDeltaPx = Math.max(Math.abs(deltaXPx), Math.abs(deltaYPx))
      const sweepSteps = Math.max(1, Math.ceil(maxDeltaPx / ROOM_PLAYER_COLLISION_SWEEP_STEP_PX))

      let resolvedX = positionXPercent
      let resolvedY = positionYPercent
      let allowEscapeFromCollision = Boolean(isBlockedAtPercent?.(positionXPercent, positionYPercent))

      for (let step = 1; step <= sweepSteps; step += 1) {
        const progress = step / sweepSteps
        const candidatePosition = getClampedPosition(
          positionXPercent + deltaXPercent * progress,
          positionYPercent + deltaYPercent * progress,
        )

        const candidateBlocked = Boolean(isBlockedAtPercent?.(candidatePosition.x, candidatePosition.y))

        if (candidateBlocked && !allowEscapeFromCollision) {
          break
        }

        resolvedX = candidatePosition.x
        resolvedY = candidatePosition.y

        if (!candidateBlocked) {
          allowEscapeFromCollision = false
        }
      }

      positionXPercent = resolvedX
      positionYPercent = resolvedY
    }

    const tick = (timestamp) => {
      if (!isActive) {
        return
      }

      if (!previousTimestamp) {
        previousTimestamp = timestamp
      }

      const deltaSeconds = Math.min((timestamp - previousTimestamp) / 1000, 0.05)
      previousTimestamp = timestamp

      const horizontalInput = (pressedKeys.has('KeyD') ? 1 : 0) - (pressedKeys.has('KeyA') ? 1 : 0)
      const verticalInput = (pressedKeys.has('KeyS') ? 1 : 0) - (pressedKeys.has('KeyW') ? 1 : 0)

      const isMoving = horizontalInput !== 0 || verticalInput !== 0

      if (isMoving) {
        const inputLength = Math.hypot(horizontalInput, verticalInput) || 1
        const normalizedX = horizontalInput / inputLength
        const normalizedY = verticalInput / inputLength
        const movementDirection =
          Math.abs(horizontalInput) > Math.abs(verticalInput)
            ? (horizontalInput > 0 ? 'right' : 'left')
            : (verticalInput > 0 ? 'down' : 'up')

        if (!wasMoving || movementDirection !== lastDirection) {
          resetWalkCycle()
          setSpriteFrame(movementDirection, 'base')
        }

        const appRect = app.getBoundingClientRect()
        if (appRect.width && appRect.height) {
          const deltaXPercent = ((normalizedX * ROOM_PLAYER_SPEED_PX_PER_SEC * deltaSeconds) / appRect.width) * 100
          const deltaYPercent = ((normalizedY * ROOM_PLAYER_SPEED_PX_PER_SEC * deltaSeconds) / appRect.height) * 100

          const targetPosition = getClampedPosition(positionXPercent + deltaXPercent, positionYPercent + deltaYPercent)
          moveWithCollisionSweep(targetPosition.x, targetPosition.y)

          applyPosition()
        }

        walkFrameElapsedMs += deltaSeconds * 1000
        while (walkFrameElapsedMs >= ROOM_PLAYER_WALK_ANIMATION_STEP_MS) {
          walkFrameElapsedMs -= ROOM_PLAYER_WALK_ANIMATION_STEP_MS
          walkFrameIndex = (walkFrameIndex + 1) % ROOM_PLAYER_WALK_FRAME_SEQUENCE.length
          setSpriteFrame(movementDirection, ROOM_PLAYER_WALK_FRAME_SEQUENCE[walkFrameIndex])
        }

        wasMoving = true
      } else if (wasMoving || lastDirection !== 'down' || lastFrameVariant !== 'base') {
        wasMoving = false
        setIdleDownFrame()
      }

      animationFrameId = window.requestAnimationFrame(tick)
    }

    const onKeyDown = (event) => {
      if (!isActive || !directionByKeyCode[event.code]) {
        return
      }

      event.preventDefault()
      pressedKeys.add(event.code)
    }

    const onKeyUp = (event) => {
      if (!directionByKeyCode[event.code]) {
        return
      }

      pressedKeys.delete(event.code)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', () => {
      pressedKeys.clear()
    })

    applyPosition()

    return {
      activate() {
        if (isActive) {
          return
        }

        isActive = true
        roomPlayerLayer.classList.add('is-visible')
        previousTimestamp = 0
        animationFrameId = window.requestAnimationFrame(tick)
      },
      deactivate() {
        if (!isActive) {
          return
        }

        isActive = false
        pressedKeys.clear()
        roomPlayerLayer.classList.remove('is-visible')
        if (animationFrameId) {
          window.cancelAnimationFrame(animationFrameId)
          animationFrameId = 0
        }

        wasMoving = false
        setIdleDownFrame()
      },
      resetToCenter,
    }
  }

  const ensureWardrobeSceneWhiteFade = () => {
    let fadeLayer = app.querySelector('.wardrobe-scene-white-fade')

    if (!fadeLayer) {
      fadeLayer = document.createElement('div')
      fadeLayer.className = 'wardrobe-scene-white-fade'
      app.appendChild(fadeLayer)
    }

    return fadeLayer
  }

  const ensureWardrobeNextButton = () => {
    let nextButton = app.querySelector('.wardrobe-next-button')

    if (!nextButton) {
      nextButton = document.createElement('button')
      nextButton.type = 'button'
      nextButton.className = 'start-button wardrobe-next-button'
      nextButton.textContent = 'Next'
      app.appendChild(nextButton)
    }

    return nextButton
  }

  const setupWardrobeDressUp = (outfitLayer, characterOutfitLayer, onOutfitStateChange) => {
    if (!outfitLayer || !characterOutfitLayer || outfitLayer.dataset.dressupReady === 'true') {
      return
    }

    outfitLayer.dataset.dressupReady = 'true'

    const closetItems = Array.from(outfitLayer.querySelectorAll('.wardrobe-outfit-slot'))
    const wornByPart = new Map()
    let dragState = null

    const notifyOutfitState = () => {
      const isFullyEquipped = ['top', 'middle', 'bottom'].every((part) => wornByPart.has(part))
      onOutfitStateChange?.(isFullyEquipped)
    }

    const returnItemToCloset = (part) => {
      const entry = wornByPart.get(part)
      if (!entry) {
        return
      }

      entry.wornElement.remove()
      entry.closetElement.classList.remove('is-in-use')
      wornByPart.delete(part)
      notifyOutfitState()
    }

    const equipItemOnCharacter = (closetItem) => {
      const part = closetItem.dataset.part
      const set = closetItem.closest('.wardrobe-outfit-column')?.dataset.set || ''
      if (!part) {
        return
      }

      if (wornByPart.has(part)) {
        returnItemToCloset(part)
      }

      const wornElement = document.createElement('button')
      wornElement.type = 'button'
      wornElement.className = `wardrobe-worn-item is-${part}`
      wornElement.dataset.part = part
      wornElement.dataset.set = set
      wornElement.dataset.originItemId = closetItem.dataset.itemId || ''

      const computed = window.getComputedStyle(closetItem)
      wornElement.style.backgroundImage = computed.backgroundImage
      wornElement.style.backgroundSize = computed.backgroundSize
      wornElement.style.backgroundPosition = computed.backgroundPosition
      wornElement.style.backgroundRepeat = computed.backgroundRepeat

      wornElement.addEventListener('click', () => {
        if (wornElement.dataset.skipClick === 'true') {
          wornElement.dataset.skipClick = 'false'
          return
        }

        returnItemToCloset(part)
      })

      // Allow removing equipped items either by click or by dragging.
      let wornDragStartX = 0
      let wornDragStartY = 0
      let wornDidDrag = false

      wornElement.addEventListener('pointerdown', (event) => {
        if (event.button !== 0) {
          return
        }

        wornDragStartX = event.clientX
        wornDragStartY = event.clientY
        wornDidDrag = false
        wornElement.classList.add('is-dragging')
        wornElement.setPointerCapture(event.pointerId)
      })

      wornElement.addEventListener('pointermove', (event) => {
        const dx = event.clientX - wornDragStartX
        const dy = event.clientY - wornDragStartY
        if (!wornDidDrag && Math.hypot(dx, dy) > 6) {
          wornDidDrag = true
        }
      })

      const finishWornPointer = (event) => {
        if (wornElement.hasPointerCapture(event.pointerId)) {
          wornElement.releasePointerCapture(event.pointerId)
        }

        wornElement.classList.remove('is-dragging')

        if (wornDidDrag) {
          wornElement.dataset.skipClick = 'true'
          returnItemToCloset(part)
        }
      }

      wornElement.addEventListener('pointerup', finishWornPointer)
      wornElement.addEventListener('pointercancel', finishWornPointer)

      closetItem.classList.add('is-in-use')
      characterOutfitLayer.appendChild(wornElement)
      wornByPart.set(part, {
        closetElement: closetItem,
        wornElement,
      })
      notifyOutfitState()
    }

    const cleanupDrag = () => {
      if (!dragState) {
        return
      }

      const { closetItem, ghostElement, pointerId } = dragState

      if (ghostElement && ghostElement.isConnected) {
        ghostElement.remove()
      }

      if (closetItem.hasPointerCapture(pointerId)) {
        closetItem.releasePointerCapture(pointerId)
      }

      closetItem.classList.remove('is-dragging')
      dragState = null
    }

    const handlePointerDown = (event) => {
      const closetItem = event.currentTarget

      if (!(closetItem instanceof HTMLElement) || closetItem.classList.contains('is-in-use')) {
        return
      }

      if (event.button !== 0) {
        return
      }

      dragState = {
        closetItem,
        ghostElement: null,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        offsetX: 0,
        offsetY: 0,
        isDraggingVisual: false,
      }
      closetItem.setPointerCapture(event.pointerId)
    }

    const handlePointerMove = (event) => {
      if (!dragState || event.pointerId !== dragState.pointerId) {
        return
      }

      if (!dragState.isDraggingVisual) {
        const dx = event.clientX - dragState.startX
        const dy = event.clientY - dragState.startY

        if (Math.hypot(dx, dy) <= 6) {
          return
        }

        const rect = dragState.closetItem.getBoundingClientRect()
        if (!rect.width || !rect.height) {
          return
        }

        const ghostElement = dragState.closetItem.cloneNode(true)
        if (!(ghostElement instanceof HTMLElement)) {
          return
        }

        const computed = window.getComputedStyle(dragState.closetItem)
        ghostElement.className = `${dragState.closetItem.className} is-drag-ghost`
        ghostElement.style.width = `${rect.width}px`
        ghostElement.style.height = `${rect.height}px`
        ghostElement.style.backgroundImage = computed.backgroundImage
        ghostElement.style.backgroundSize = computed.backgroundSize
        ghostElement.style.backgroundPosition = computed.backgroundPosition
        ghostElement.style.backgroundRepeat = computed.backgroundRepeat
        document.body.appendChild(ghostElement)

        dragState.ghostElement = ghostElement
        dragState.offsetX = event.clientX - rect.left
        dragState.offsetY = event.clientY - rect.top
        dragState.isDraggingVisual = true
        dragState.closetItem.classList.add('is-dragging')
      }

      if (dragState.ghostElement) {
        dragState.ghostElement.style.left = `${event.clientX - dragState.offsetX}px`
        dragState.ghostElement.style.top = `${event.clientY - dragState.offsetY}px`
      }
    }

    const handlePointerEnd = (event) => {
      if (!dragState || event.pointerId !== dragState.pointerId) {
        return
      }

      const characterRect = characterOutfitLayer.getBoundingClientRect()
      const droppedOnCharacter =
        event.clientX >= characterRect.left &&
        event.clientX <= characterRect.right &&
        event.clientY >= characterRect.top &&
        event.clientY <= characterRect.bottom

      const draggedClosetItem = dragState.closetItem
      const wasDraggingVisual = dragState.isDraggingVisual
      cleanupDrag()

      if (droppedOnCharacter) {
        equipItemOnCharacter(draggedClosetItem)
        return
      }

      // Quick click on closet item also equips it.
      if (!wasDraggingVisual) {
        equipItemOnCharacter(draggedClosetItem)
      }
    }

    closetItems.forEach((item) => {
      item.addEventListener('pointerdown', handlePointerDown)
    })

    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerup', handlePointerEnd)
    document.addEventListener('pointercancel', handlePointerEnd)

    notifyOutfitState()
  }

  const showWardrobeBackground = () => {
    const wardrobeLayer = ensureWardrobeLayer()
    const wardrobeSideCharactersLayer = ensureWardrobeSideCharactersLayer()
    const wardrobeBodyLayer = ensureWardrobeBodyLayer()
    const wardrobeOutfitLayer = ensureWardrobeOutfitLayer()
    const wardrobeCharacterOutfitLayer = ensureWardrobeCharacterOutfitLayer()
    const roomFrameLayer = ensureRoomFrameLayer()
    const roomLayer = ensureRoomBgLayer()
    const roomBackItemsLayer = ensureRoomFurnitureBackItemsLayer()
    const roomBackLayer = ensureRoomFurnitureBackLayer()
    const roomLettersLayer = ensureRoomLettersLayer()
    const roomFrontLayer = ensureRoomFurnitureFrontLayer()
    const roomPlayerLayer = ensureRoomPlayerLayer()
    const sceneWhiteFadeLayer = ensureWardrobeSceneWhiteFade()
    const wardrobeNextButton = ensureWardrobeNextButton()
    const roomObjectiveLayer = ensureRoomObjectiveLayer()
    const roomExitIndicator = ensureRoomExitIndicator()
    const roomExitTransitionLayer = ensureRoomExitTransition()
    const roomEndingOverlay = ensureRoomEndingOverlay()
    const roomEndingVideo = roomEndingOverlay.querySelector('.room-ending-video')

    if (!roomPlayerController) {
      roomPlayerController = setupRoomPlayerController(roomPlayerLayer, (xPercent, yPercent) => {
        const appRect = app.getBoundingClientRect()
        if (!appRect.width || !appRect.height) {
          return false
        }

        const playerBaseX = appRect.left + (appRect.width * xPercent) / 100
        const playerBaseY = appRect.top + (appRect.height * yPercent) / 100
        const playerCollisionWidth = Math.max(12, roomPlayerLayer.offsetWidth * 0.18)
        const playerCollisionHeight = Math.max(10, roomPlayerLayer.offsetHeight * 0.08)

        const playerCollisionBox = {
          left: playerBaseX - playerCollisionWidth * 0.5,
          right: playerBaseX + playerCollisionWidth * 0.5,
          top: playerBaseY - playerCollisionHeight,
          bottom: playerBaseY - 1,
        }

        const furnitureElements = roomBackItemsLayer.querySelectorAll(
          '.room-furniture-back-item.is-1, .room-furniture-back-item.is-2, .room-furniture-back-item.is-3',
        )

        for (const furnitureElement of furnitureElements) {
          const furnitureRect = furnitureElement.getBoundingClientRect()
          const intersects = !(
            playerCollisionBox.right <= furnitureRect.left ||
            playerCollisionBox.left >= furnitureRect.right ||
            playerCollisionBox.bottom <= furnitureRect.top ||
            playerCollisionBox.top >= furnitureRect.bottom
          )

          if (intersects) {
            return true
          }
        }

        return false
      }, (xPercent, yPercent) => {
        roomPlayerPositionPercent = { x: xPercent, y: yPercent }
        updateRoomLetterProximity()
      })
    }

    let hasStartedRoomTransition = false

    const handleProceedToRoom = () => {
      if (hasStartedRoomTransition) {
        return
      }

      hasStartedRoomTransition = true
      playSound(secondSceneButtonClickSound)
      stopLoopAudio(scene2Music)
      playLoopAudio(scene3Music)
      wardrobeNextButton.disabled = true
      wardrobeNextButton.classList.remove('is-visible')
      wardrobeNextButton.classList.add('is-hidden')
      sceneWhiteFadeLayer.classList.add('is-visible')

      window.setTimeout(() => {
        roomFrameLayer.classList.add('is-visible')
        roomLayer.classList.add('is-visible')
        roomBackLayer.classList.add('is-visible')
        roomBackItemsLayer.classList.add('is-visible')
        roomLettersLayer.classList.add('is-visible')
        roomFrontLayer.classList.add('is-visible')
        roomObjectiveLayer.classList.add('is-visible')
        setupRoomLetterHunt()
        isRoomGameplayActive = true
        roomPlayerController?.resetToCenter()
        roomPlayerLayer.classList.add('is-visible')
        app.style.setProperty('--room-entry-origin-x', `${roomPlayerPositionPercent.x}%`)
        app.style.setProperty('--room-entry-origin-y', `${roomPlayerPositionPercent.y}%`)
        app.classList.remove('is-room-entry-zoom-out')
        app.classList.add('is-room-entry-zoom-hold')

        if (roomEntryZoomTimeoutId) {
          window.clearTimeout(roomEntryZoomTimeoutId)
          roomEntryZoomTimeoutId = 0
        }

        roomEntryZoomTimeoutId = window.setTimeout(() => {
          app.classList.remove('is-room-entry-zoom-hold')
          app.classList.add('is-room-entry-zoom-out')

          roomEntryZoomTimeoutId = window.setTimeout(() => {
            app.classList.remove('is-room-entry-zoom-out')
            roomEntryZoomTimeoutId = 0
          }, ROOM_ENTRY_ZOOM_RELEASE_DURATION_MS)
        }, ROOM_ENTRY_ZOOM_HOLD_MS)

        if (roomEntryWhiteFadeTimeoutId) {
          window.clearTimeout(roomEntryWhiteFadeTimeoutId)
          roomEntryWhiteFadeTimeoutId = 0
        }

        roomEntryWhiteFadeTimeoutId = window.setTimeout(() => {
          sceneWhiteFadeLayer.classList.remove('is-visible')
          roomEntryWhiteFadeTimeoutId = 0
        }, ROOM_ENTRY_WHITE_VISIBLE_MS)

        roomPlayerController?.activate()
        wardrobeLayer.classList.remove('is-visible')
        wardrobeSideCharactersLayer.classList.remove('is-visible')
        setWardrobeSideCharacterInteractivity(wardrobeSideCharactersLayer, false)
        wardrobeBodyLayer.classList.remove('is-visible')
        wardrobeOutfitLayer.classList.remove('is-visible')
        wardrobeCharacterOutfitLayer.classList.remove('is-visible')
      }, 360)

    }

    wardrobeNextButton.onmouseenter = null
    wardrobeNextButton.onpointerenter = null
    wardrobeNextButton.onclick = handleProceedToRoom

    wardrobeNextButton.disabled = false
    wardrobeNextButton.classList.remove('is-visible', 'is-hidden')
    roomFrameLayer.classList.remove('is-visible')
    roomLayer.classList.remove('is-visible')
    roomBackLayer.classList.remove('is-visible')
    roomBackItemsLayer.classList.remove('is-visible')
    roomLettersLayer.classList.remove('is-visible')
    roomFrontLayer.classList.remove('is-visible')
    roomObjectiveLayer.classList.remove('is-visible')
    roomExitIndicator.classList.remove('is-visible')
    roomExitTransitionLayer.classList.remove('is-visible')
    roomEndingOverlay.classList.remove('is-visible')
    stopLoopAudio(scene3Music)
    if (roomEndingVideo instanceof HTMLVideoElement) {
      roomEndingVideo.pause()
      roomEndingVideo.currentTime = 0
    }
    if (roomEntryZoomTimeoutId) {
      window.clearTimeout(roomEntryZoomTimeoutId)
      roomEntryZoomTimeoutId = 0
    }
    if (roomEntryWhiteFadeTimeoutId) {
      window.clearTimeout(roomEntryWhiteFadeTimeoutId)
      roomEntryWhiteFadeTimeoutId = 0
    }
    app.classList.remove('is-room-entry-zoom-hold', 'is-room-entry-zoom-out')
    app.classList.remove('is-room-exit-zoom')
    isRoomGameplayActive = false
    roomPlayerController?.deactivate()
    closeRoomLetterOverlay()
    sceneWhiteFadeLayer.classList.remove('is-visible')

    setupWardrobeBlinkLoop(wardrobeBodyLayer)
    setWardrobeSideCharacterInteractivity(wardrobeSideCharactersLayer, true)
    setupWardrobeDressUp(wardrobeOutfitLayer, wardrobeCharacterOutfitLayer, (isFullyEquipped) => {
      if (hasStartedRoomTransition) {
        return
      }

      wardrobeNextButton.classList.toggle('is-visible', isFullyEquipped)
      if (!isFullyEquipped) {
        wardrobeNextButton.classList.remove('is-hidden')
      }
    })

    wardrobeLayer.classList.add('is-visible')
    wardrobeSideCharactersLayer.classList.add('is-visible')
    wardrobeBodyLayer.classList.add('is-visible')
    wardrobeOutfitLayer.classList.add('is-visible')
    wardrobeCharacterOutfitLayer.classList.add('is-visible')

    const canvas = app.querySelector('canvas')
    if (canvas) {
      canvas.style.display = 'none'
    }

    introOverlay.addEventListener('transitionend', (event) => {
      if (event.target === introVideo && event.propertyName === 'opacity') {
        introOverlay.remove()
      }
    }, { once: true })

    window.setTimeout(() => {
      introOverlay.remove()
    }, 1400)
  }

  const startFinalFade = () => {
    if (hasStartedFinalFade) {
      return
    }

    hasStartedFinalFade = true
    introOverlay.classList.add('is-fade-to-wardrobe')
    stopLoopAudio(backgroundMusic)
    playLoopAudio(scene2Music)
    showWardrobeBackground()
  }

  introVideo.addEventListener('timeupdate', () => {
    if (!introOverlay.classList.contains('is-loading') || hasStartedFinalFade) {
      return
    }

    if (introVideo.currentTime >= 10) {
      startFinalFade()
    }
  })

  introVideo.addEventListener('ended', () => {
    if (!hasStartedFinalFade) {
      startFinalFade()
    }
  }, { once: true })
}

startButton.addEventListener('mouseenter', handleStartHover)
startButton.addEventListener('pointerenter', handleStartHover)
startButton.addEventListener('mousemove', handleStartHover)
startButton.addEventListener('mouseleave', resetHoverState)
startButton.addEventListener('pointerleave', resetHoverState)
startButton.addEventListener('click', handleStartClick)
