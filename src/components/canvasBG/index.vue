<script setup name="canvasBG">
import { onMounted } from 'vue'
import * as THREE from "three"
// import font from '../../assets/fonts'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { gsap } from "gsap"
onMounted(async () => {
  await init()
})
const play = () => {
  requestId = window.requestAnimationFrame(tick)
}
const stop = () => {
  window.cancelAnimationFrame(requestId)
  requestId = null
}
defineExpose({
  play,
  stop
})
let canvasBG = null
let scene = null
let fontLoader = null
let font = null
let loadFont = null
let renderer = null
let controls = null
let ambientLight = null
let camera = null
let requestId = null
const text = {
  五行: ["金", "木", "水", "火", "土"],
  八卦: ["乾", "坤", "震", "巽", "坎", "艮", "离", "兑"],
  数字: ["壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖", "拾"],
  天干: ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
  地支: [
    "子",
    "丑",
    "寅",
    "卯",
    "辰",
    "巳",
    "午",
    "未",
    "申",
    "酉",
    "戌",
    "亥"
  ],
  方位: [
    "甲",
    "卯",
    "乙",
    "辰",
    "巽",
    "巳",
    "丙",
    "午",
    "丁",
    "未",
    "坤",
    "申",
    "庚",
    "酉",
    "辛",
    "戍",
    "干",
    "亥",
    "壬",
    "子",
    "癸",
    "丑",
    "艮",
    "寅"
  ],
  节气: [
    "立  春",
    "雨  水",
    "惊  蛰",
    "春  分",
    "清  明",
    "谷  雨",
    "立  夏",
    "小  满",
    "芒  种",
    "夏  至",
    "小  暑",
    "大  暑",
    "立  秋",
    "处  暑",
    "白  露",
    "秋  分",
    "寒  露",
    "霜  降",
    "立  冬",
    "小  雪",
    "大  雪",
    "冬  至",
    "小  寒",
    "大  寒"
  ],
  天星: [
    "天辅",
    "天垒",
    "天汉",
    "天厨",
    "天市",
    "天掊",
    "天苑",
    "天衡",
    "天官",
    "天罡",
    "太乙",
    "天屏",
    "太微",
    "天马",
    "南极",
    "天常",
    "天钺",
    "天关",
    "天潢",
    "少微",
    "天乙",
    "天魁",
    "天厩",
    "天皇"
  ],
  天干1: [
    "甲",
    " ",
    "乙",
    " ",
    "丙",
    " ",
    "丁",
    " ",
    "戊",
    " ",
    "己",
    " ",
    "庚",
    " ",
    "辛",
    " ",
    "壬",
    " ",
    "癸",
    " ",
    "甲",
    " ",
    "乙",
    " "
  ],
  地支1: [
    "子",
    " ",
    "丑",
    " ",
    "寅",
    " ",
    "卯",
    " ",
    "辰",
    " ",
    "巳",
    " ",
    "午",
    " ",
    "未",
    " ",
    "申",
    " ",
    "酉",
    " ",
    "戌",
    " ",
    "亥",
    " "
  ]
}
const data = [
  {
    innerRing: 2,
    outerRing: 1.5,
    lineWidth: 0.1,
    circleWidth: [0.1, 0.1],
    lineNum: 8,
    text: [0xffffff],
    offsetX: 0,
    offsetY: 0,
    size: 0.3,
    direction: -1,
    duration: 40
  },
  {
    innerRing: 3.5,
    outerRing: 0.7,
    lineWidth: 0.15,
    circleWidth: [0.1, 0.1],
    lineNum: 24,
    text: text["方位"],
    offsetX: -0.2,
    offsetY: -0.08,
    size: 0.3,
    direction: 1,
    duration: 10
  },
  {
    innerRing: 4.2,
    outerRing: 0.7,
    lineWidth: 0.15,
    circleWidth: [0.1, 0.1],
    lineNum: 24,
    text: text["八卦"],
    offsetX: -0.2,
    offsetY: -0.08,
    size: 0.3,
    direction: -1,
    duration: 20
  },
  {
    innerRing: 4.9,
    outerRing: 1.3,
    lineWidth: 0.15,
    circleWidth: [0.1, 0.1],
    lineNum: 24,
    text: text["方位"],
    offsetX: -0.4,
    offsetY: -0.2,
    size: 0.6,
    direction: 1,
    duration: 30
  },
  {
    innerRing: 6.2,
    outerRing: 0.4,
    lineWidth: 0.15,
    circleWidth: [0, 0],
    lineNum: 60,
    text: text["地支"],
    offsetX: -0.13,
    offsetY: 0.01,
    size: 0.2,
    direction: 1,
    duration: 25
  },
  {
    innerRing: 6.6,
    outerRing: 0.4,
    lineWidth: 0.15,
    circleWidth: [0, 0],
    lineNum: 60,
    text: text["天干"],
    offsetX: -0.13,
    offsetY: -0.07,
    size: 0.2,
    direction: 1,
    duration: 25
  },
  {
    innerRing: 7,
    outerRing: 0.5,
    lineWidth: 0.15,
    circleWidth: [0.1, 0.1],
    lineNum: 36,
    text: text["天星"],
    offsetX: -0.27,
    offsetY: -0.03,
    size: 0.2,
    direction: -1,
    duration: 20
  },
  {
    innerRing: 7.5,
    outerRing: 0.5,
    lineWidth: 0.15,
    circleWidth: [0.1, 0.1],
    lineNum: 24,
    text: text["节气"],
    offsetX: -0.36,
    offsetY: -0.03,
    size: 0.2,
    direction: 1,
    duration: 30
  },
  {
    innerRing: 8,
    outerRing: 0.8,
    lineWidth: 0.15,
    circleWidth: [0.1, 0.1],
    lineNum: 48,
    text: text["方位"],
    offsetX: -0.3,
    offsetY: -0.1,
    size: 0.4,
    direction: 1,
    duration: 35
  },
  {
    innerRing: 8.8,
    outerRing: 0.8,
    lineWidth: 0.15,
    circleWidth: [0.1, 0.1],
    lineNum: 32,
    text: text["八卦"],
    offsetX: -0.3,
    offsetY: -0.1,
    size: 0.4,
    direction: -1,
    duration: 60
  },
  {
    innerRing: 9.6,
    outerRing: 0.4,
    lineWidth: 0.18,
    circleWidth: [0, 0],
    lineNum: 120,
    text: text["地支1"],
    offsetX: -0.13,
    offsetY: 0.01,
    size: 0.2,
    direction: 1,
    duration: 30
  },
  {
    innerRing: 10,
    outerRing: 0.4,
    lineWidth: 0.18,
    circleWidth: [0, 0],
    lineNum: 120,
    text: text["天干1"],
    offsetX: -0.13,
    offsetY: -0.07,
    size: 0.2,
    direction: 1,
    duration: 30
  },
  {
    innerRing: 10.4,
    outerRing: 0.5,
    lineWidth: 0.1,
    circleWidth: [0.1, 0.1],
    lineNum: 60,
    text: text["数字"],
    offsetX: -0.13,
    offsetY: -0.02,
    size: 0.2,
    direction: 1,
    duration: 25
  },
  {
    innerRing: 10.9,
    outerRing: 0.5,
    lineWidth: 0.15,
    circleWidth: [0.1, 0.1],
    lineNum: 50,
    text: text["五行"],
    offsetX: -0.13,
    offsetY: -0.02,
    size: 0.2,
    direction: 1,
    duration: 35
  },
  {
    innerRing: 11.7,
    outerRing: 1,
    lineWidth: 0.1,
    circleWidth: [1, 0],
    lineNum: 64,
    text: [0x000000],
    offsetX: 0,
    offsetY: 0,
    size: 0.3,
    direction: 1,
    duration: 30
  }
]
const Rings = []
const duration = [
  0, 0.7, 0.7, 0.7, 0.7, 0, 0.7, 0.7, 0.7, 0.7, 0.7, 0, 0.7, 0.7, 0.7
]
const init = () => {
  canvasBG = document.querySelector("canvas.webgl")
  scene = new THREE.Scene()
  const loadFont = new Promise((resolve, reject) => {
    fontLoader = new THREE.FontLoader().load('./fonts.json', (loadedFont) => {
      font = loadedFont
      console.log(123)
      resolve(loadedFont)
    })
  })


  //Light
  ambientLight = new THREE.AmbientLight(0xffffff, 1)

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  )
  camera.position.y = 10
  camera.position.x = 10
  camera.position.z = 10
  camera.lookAt(scene.position)
  console.log(scene.position)
  scene.position.y = 6
  scene.add(ambientLight)
  scene.add(camera)
  scene.add(createTaiji([0, 0, 0], [1, 1, 1]))
  //Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvasBG,
    antialias: true,
    alpha: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  //controls
  controls = new OrbitControls(camera, canvasBG)
  controls.enableDamping = true
  controls.maxDistance = 50
  controls.enablePan = false
  tick()
  loadFont.then(() => {
    console.log(222)
    data.forEach((item) => {
      Rings.push(Ring(item))
    })
    start()
  })
  window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
  })
}
const tick = () => {
  renderer.render(scene, camera)
  controls.update()
  requestId = window.requestAnimationFrame(tick)
}
const start = function () {
  const tl = gsap.timeline()
  Rings.forEach((item, idx) => {
    tl.to(".webgl", { duration: duration[idx] }).call(() => {
      showRing(item)
    })
  })
}
const showRing = (item) => {
  scene.add(item)
  item.scale.set(1.2, 1.2, 1.2)
  gsap.to(item.scale, {
    duration: 0.8,
    x: 1,
    y: 1,
    repeat: 0,
    ease: "easeInOut"
  })
}
//Ring
const Ring = ({
  innerRing,
  outerRing,
  lineWidth,
  circleWidth,
  lineNum,
  offsetX,
  offsetY,
  text,
  size,
  direction,
  duration
}) => {
  const RingGroup = new THREE.Group()
  const circle = [0, outerRing]
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
  })

  // create ring
  circle.forEach((i, j) => {
    const RingGeo = new THREE.RingGeometry(
      innerRing + i,
      innerRing + circleWidth[j] + i,
      64,
      1
    )
    const Ring = new THREE.Mesh(RingGeo, material)
    RingGroup.add(Ring)
  })

  // create line
  for (let i = 0; i < lineNum; i++) {
    const r = innerRing + circle[1] / 2
    const rad = ((2 * Math.PI) / lineNum) * i
    const x = Math.cos(rad) * r
    const y = Math.sin(rad) * r
    const planeGeo = new THREE.PlaneGeometry(lineWidth, circle[1])
    const line = new THREE.Mesh(planeGeo, material)

    line.position.set(x, y, 0)
    line.rotation.set(0, 0, rad + Math.PI / 2)
    RingGroup.add(line)
  }

  // create text
  if (text.length > 1) {
    for (let i = 0; i < lineNum; i++) {
      const r = innerRing + circle[1] / 2
      const rad = ((2 * Math.PI) / lineNum) * i + Math.PI / lineNum
      const x = Math.cos(rad) * r
      const y = Math.sin(rad) * r
      let txtGeo = new THREE.TextGeometry(text[i % text.length], {
        font: font,
        size: size,
        height: 0.001,
        curveSegments: 12
      })
      txtGeo.translate(offsetX, offsetY, 0)
      let txtMater = new THREE.MeshStandardMaterial({ color: 0xffffff })
      let txtMesh = new THREE.Mesh(txtGeo, txtMater)
      txtMesh.position.set(x, y, 0)
      txtMesh.rotation.set(0, 0, rad + -Math.PI / 2)
      RingGroup.add(txtMesh)
    }
  }

  // create bagua
  if (text.length == 1) {
    const baguaData = [
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 1],
      [0, 1, 0],
      [0, 1, 1],
      [1, 0, 0],
      [1, 0, 1],
      [1, 1, 0]
    ]
    for (let i = 0; i < lineNum; i++) {
      const r = innerRing + circle[1] / 2
      const rad = ((2 * Math.PI) / lineNum) * i + Math.PI / lineNum
      const x = Math.cos(rad) * r
      const y = Math.sin(rad) * r
      RingGroup.add(
        createBagua(baguaData[i % 8], x, y, 0.0001, rad + Math.PI / 2, text[0]),
        createBagua(baguaData[i % 8], x, y, -0.0001, rad + Math.PI / 2, text[0])
      )
    }
  }

  // animation
  {
    gsap.to(RingGroup.rotation, {
      duration: duration,
      z: Math.PI * 2 * direction,
      repeat: -1,
      ease: "none"
    })

    const amColor = { r: 1, g: 1, b: 1 }
    const explode = gsap.timeline({ repeat: -1, delay: 5 })
    explode
      .to(RingGroup.position, {
        duration: 1,
        ease: "ease.inOut",
        y: Math.random() * 10 - 5,
        delay: 5
      })
      .to(amColor, {
        r: 133 / 255,
        g: 193 / 255,
        b: 255 / 255,
        duration: 2,
        onUpdate: () =>
          ambientLight.color.setRGB(amColor.r, amColor.g, amColor.b)
      })
      .to(RingGroup.position, {
        duration: 1,
        ease: "ease.inOut",
        delay: 5,
        y: 0
      })
      .to(amColor, {
        r: 1,
        g: 1,
        b: 1,
        duration: 3,
        onUpdate: () =>
          ambientLight.color.setRGB(amColor.r, amColor.g, amColor.b)
      })
  }

  // rotate
  RingGroup.rotateX(-Math.PI / 2)
  return RingGroup
}
//taiji
const createTaiji = (position, scale) => {
  const taiji = new THREE.Group()
  const createCircle = (r, color, thetaStart, thetaLength) => {
    const material = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.DoubleSide
    })
    const geometry = new THREE.CircleGeometry(r, 64, thetaStart, thetaLength)
    const circle = new THREE.Mesh(geometry, material)
    return circle
  }

  const ying = createCircle(1.8, 0x000000, 0, Math.PI)
  const yang = createCircle(1.8, 0xffffff, Math.PI, Math.PI)
  const Lblack = createCircle(0.9, 0x000000, 0, Math.PI * 2)
  const Lwhite = createCircle(0.9, 0xffffff, 0, Math.PI * 2)
  const Sblack = createCircle(0.25, 0x000000, 0, Math.PI * 2)
  const Swhite = createCircle(0.25, 0xffffff, 0, Math.PI * 2)

  const Lblack1 = createCircle(0.9, 0x000000, 0, Math.PI * 2)
  const Lwhite1 = createCircle(0.9, 0xffffff, 0, Math.PI * 2)
  const Sblack1 = createCircle(0.25, 0x000000, 0, Math.PI * 2)
  const Swhite1 = createCircle(0.25, 0xffffff, 0, Math.PI * 2)

  Lblack.position.set(-0.9, 0, 0.001)
  Lwhite.position.set(0.9, 0, 0.001)
  Swhite.position.set(-0.9, 0, 0.002)
  Sblack.position.set(0.9, 0, 0.002)
  Lblack1.position.set(-0.9, 0, -0.001)
  Lwhite1.position.set(0.9, 0, -0.001)
  Swhite1.position.set(-0.9, 0, -0.002)
  Sblack1.position.set(0.9, 0, -0.002)

  taiji.add(
    ying,
    yang,
    Lblack,
    Lwhite,
    Swhite,
    Sblack,
    Lblack1,
    Lwhite1,
    Swhite1,
    Sblack1
  )
  gsap.to(taiji.rotation, {
    duration: 30,
    z: Math.PI * 2,
    repeat: -1,
    ease: "none"
  })
  taiji.rotateX(-Math.PI / 2)
  taiji.position.set(...position)
  taiji.scale.set(...scale)
  return taiji
}
// bagua
const createBagua = (data, x, y, z, deg, color) => {
  const idx = [-0.32, 0, 0.32]
  const bagua = new THREE.Group()
  const material = new THREE.MeshStandardMaterial({
    color: color,
    side: THREE.DoubleSide
  })
  data.forEach((i, j) => {
    if (i == 1) {
      const yang = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.2), material)
      yang.position.set(0, idx[j], 0)
      bagua.add(yang)
    }
    if (i == 0) {
      const ying1 = new THREE.Mesh(
        new THREE.PlaneGeometry(0.45, 0.2),
        material
      )
      const ying2 = new THREE.Mesh(
        new THREE.PlaneGeometry(0.45, 0.2),
        material
      )
      ying1.position.set(-0.275, idx[j], 0)
      ying2.position.set(0.275, idx[j], 0)
      bagua.add(ying1, ying2)
    }
  })
  bagua.position.set(x, y, z)
  bagua.rotation.set(0, 0, deg)
  return bagua
}
</script>
<template>
  <div class="canvasBG">
    <canvas class="webgl"></canvas>
  </div>
</template>
<style lang="less" scoped>
.canvasBG {
  width: 100vw;
  height: 100vw;
  overflow: hidden;
  position: absolute;
  background-color: #111111;
  z-index: -1;

  canvas {
    // width: 100%;
    // height: 100%;
  }
}
</style>
