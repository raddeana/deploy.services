
/**
 * 指示器
 * @author Philip
 */
let ele, container
let camera, scene, renderer, position
let mesh, geometry, material

let mouseX = -90,
    mouseY = 50
let start_time = Date.now()

let windowHalfX = window.innerWidth / 2
let windowHalfY = window.innerHeight / 2

function clouds (id) {
  ele = document.getElementById(id)

  container = document.createElement('div')
  ele.appendChild( container )

  // Bg gradient

  let canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = ele.scrollHeight

  let context = canvas.getContext('2d')
  let gradient = context.createLinearGradient( 0, 0, 0, canvas.height )

  gradient.addColorStop(0, '#1e4877')
  gradient.addColorStop(0.5, '#4584b4')

  context.fillStyle = gradient
  context.fillRect(0, 0, canvas.width, canvas.height)

  container.style.background = 'url(' + canvas.toDataURL('image/png') + ')'
  container.style.backgroundSize = '32px 100%'

  camera = new THREE.PerspectiveCamera( 30, ele.scrollWidth / ele.scrollHeight, 1, 3000 )
  camera.position.z = 6000

  scene = new THREE.Scene()
  geometry = new THREE.Geometry()

  let texture = new THREE.TextureLoader().load('https://raddeana-materials.oss-cn-hangzhou.aliyuncs.com/images/cloud.png', animate)

  texture.magFilter = THREE.LinearMipMapLinearFilter
  texture.minFilter = THREE.LinearMipMapLinearFilter

  let fog = new THREE.Fog( 0x4584b4, - 100, 3000 )

  material = new THREE.ShaderMaterial({
    uniforms: {
      'map': { type: 't', value: texture },
      'fogColor': { type: 'c', value: fog.color },
      'fogNear': { type: 'f', value: fog.near },
      'fogFar': { type: 'f', value: fog.far }
    },
    vertexShader: document.getElementById('vs').textContent,
    fragmentShader: document.getElementById('fs').textContent,
    depthWrite: false,
    depthTest: false,
    transparent: true
  })

  let plane = new THREE.Mesh(new THREE.PlaneGeometry(64, 64))

  for (let i = 0; i < 8000; i++) {
    plane.position.x = Math.random() * 1000 - 500
    plane.position.y = - Math.random() * Math.random() * 200 - 15
    plane.position.z = i
    plane.rotation.z = Math.random() * Math.PI
    plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5

    plane.updateMatrix()

    geometry.merge(plane.geometry, plane.matrix)
  }

  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  mesh = new THREE.Mesh(geometry, material)
  mesh.position.z = - 8000
  scene.add(mesh)

  renderer = new THREE.WebGLRenderer({ 
    antialias: false, 
    alpha: true, 
    precision: 'highp'
  })
  
  renderer.setSize(ele.scrollWidth, ele.scrollHeight)
  renderer.setClearColor('#fff', 0)

  container.appendChild(renderer.domElement)

  ele.addEventListener('mousemove', onDocumentMouseMove, false)
  window.addEventListener('resize', onWindowResize, false)

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function onDocumentMouseMove (event) {
  mouseX = ( event.clientX - windowHalfX ) * 0.25
  mouseY = ( event.clientY - windowHalfY ) * 0.15
}

function onWindowResize (event) {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate () {
  requestAnimationFrame(animate)

  position = (( Date.now() - start_time ) * 0.03) % 8000
  camera.position.x += (mouseX - camera.position.x) * 0.01
  camera.position.y += (- mouseY - camera.position.y) * 0.01
  camera.position.z = - position + 8000

  renderer.render(scene, camera)
}

clouds('body')
